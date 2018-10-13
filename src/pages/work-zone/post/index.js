import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import { editorRules } from 'FILTERS/rules'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import MyCropper from 'COMPONENTS/cropper/index.vue'

@Component({
  components: {
    ModalDialog,
    Editor,
    SearchBar,
    MyCropper
  },
  methods: {
    ...mapActions([
      'getJobCircleMemberListsApi',
      'postJobCircleApi',
      'putJobCircleApi',
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi',
      'uploadApi',
      'getJobCircleDetailsApi',
      'getJobCircleHitListsApi',
      'getJobCircleOrganizationListsApi',
      'updateGroupListsApi',
      'noCheckGroupListsApi',
      'updateMenberListsByIdApi',
      'updateMenberListsApi',
      'updateMenberListsByIdApi',
      'updateMenberListsAllApi',
      'updateMultipleMenberListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'jobCircleMemberLists',
      'menberLists',
      'jobCircleDetails',
      'jobCircleOrganizationLists',
      'jobCircleHitLists'
    ])
  }
})
export default class WorkZonePost extends Vue {

  form = {
    // 工作圈名
    name: '',
    // 工作圈主用户ID
    check_owner_uid: '',
    owner_uid: {
      value: '',
      tem: {},
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false,
      }
    },
    // 课程所属组织
    check_organizations: '',
    organizations: {
      tem: [],
      value: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false,
      }
    },
    // 工作圈封面的id
    check_cover_img_id: '',
    cover_img_id: {
      value: '',
      tem: '',
      showError: false,
      noEdit: {
        value: [],
        tem: [],
        show: false,
      }
    },
    // 工作圈成员
    check_members: '',
    members: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false,
      }
    },
    // 请填写工作圈介绍
    content: '',
    // 不可见工作圈成员
    check_hits: '',
    hits: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false,
      }
    },
    // 课程是否上线 1->上线 0->下线
    status: 1,
    // 权重
    sort: ''
  }

  imageUpload = {
    hasUploaded: false,
    btnTxt: '上传封面',
    tips: '建议尺寸160X160px ，JPG、PNG格式，图片小于5M',
    showError: false,
    accept: '.jpeg, .png, .jpg'
  }

  rules = {
    name: [
      { required: true, message: '请输入工作圈名称', trigger: 'blur' },
      { validator: this.validateBlankCharacter, trigger: 'change' },
      { min: 1, max: 25, message: '工作圈名称最多25个字', trigger: 'blur' }
    ],
    check_owner_uid: [
      { required: true, message: '请选择工作圈主用户ID', trigger: 'blur' }
    ],
    check_organizations: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ],
    check_cover_img_id: [
      { required: true, message: '请上传工作圈封面图片', trigger: 'blur' }
    ],
    check_members: [
      { required: true, message: '请选择工作圈成员ID', trigger: 'blur' }
    ],
    content: [
      { required: true, message: '请填写社区介绍', trigger: 'click', validator: editorRules.validator }
    ]
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    type: 'confirm'
  }

  // 社区介绍富文本编辑器
  ContentEditor = {
    content: '',
    // path: `${config.host}/admin/common/editor/uploadImg`,
    height: 350
  }

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'
  // 导师名称
  ownerUidName = ''

  // 不能输入空白符
  validateBlankCharacter(rule, value, callback) {
    if(!value){
      callback(new Error('工作圈名称不能输入空白符'))
    } else {
      callback()
    }
    this.form.name = value.trim()
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   检测提交的参数
   */
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加个loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'
        const need = ['name', 'owner_uid', 'organizations', 'cover_img_id', 'members', 'content', 'hits', 'status', 'sort', 'id']
        const action = this.$route.name === 'workZonePost' ? 'postJobCircleApi' : 'putJobCircleApi'
        const params = this.transformData(this.form, need)
        this.submit(params, action)
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   获取提交参数
   * @return   {[type]}   [description]
   */
  transformData(data, params) {
    const formData = {}
    params.map(field => {
      if(typeof data[field] != 'object') {
        formData[field] = data[field]
      } else {
        formData[field] = data[field].value
      }
    })
    return formData
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   提交表单数据
   */
  submit(params, action) {
    this[action](params)
      .then(res => {
        this.$message({message: res.data.msg, type: 'success'})
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
          this.$router.push({name: 'workZoneList'})
        }, 3000)
      })
      .catch(err => {
        this.$message.error(`${err.msg}~`);
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   编辑器
   */
  handleContentEditorBlur() {
    this.$refs.form.validateField('content')
  }

  loadAll() {
    return [
      { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
    ]
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   搜索成员
   * @return   {[type]}   [description]
   */
  handleSearch() {
    this.getMenberListsApi({name: this.ownerUidName})
  }

  created() {
    this.restaurants = this.loadAll()
    this.initPageByPost()
    this.initPageByUpdate()
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   打开弹窗model
   */
  openModal(type) {
  	switch(type) {
  		case 'owner_uid':
  			this.models.title = '选择圈主'
        this.updateMenberListsAllApi({bool: false})
        this.updateMultipleMenberListsApi({
          list: [this.form.owner_uid.value]
        })
  			break
  		case 'members':
  			this.models.title = '选择成员'
        this.updateMenberListsAllApi({bool: false})
        this.updateMultipleMenberListsApi({
          list: Object.prototype.toString.call(this.form.members.value) === '[object Array]' ? this.form.members.value : this.form.members.value.split(',')
        })
  			break
  		case 'organizations':
  			this.models.title = '选择组织'
        this.getGroupListsApi()
        if(this.form.organizations.value.length) {
          this.updateGroupListsApi({list: this.form.organizations.value.split(',')})
        }
  			break
  		case 'hits':
  			this.models.title = '选择不可见成员'
        this.updateMenberListsAllApi({bool: false})
        this.updateMultipleMenberListsApi({
          list: Object.prototype.toString.call(this.form.hits.value) === '[object Array]' ? this.form.hits.value : this.form.hits.value.split(',')
        })
  			break
  		default:
  			break
  	}
    this.models.currentModalName = type
    this.models.width = '860px'
    this.models.minHeight = '284px'
     // 获取成员列表
    this.getMenberListsApi()
      .then(() => {
        this.models.show = true
      })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {
    if(this.$route.name !== 'workZonePost') return
    // 获取组列表
    this.getGroupListsApi({isHaveMember: 1})
    this.getMenberListsApi()
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   编辑时初始化页面
   * @return   {[type]}   [description]
   */
  initPageByUpdate() {
    const params = {id: this.$route.params.id}
    if(this.$route.name !== 'workZoneUpdate') return
    Promise.all(
      [
        this.getJobCircleDetailsApi(params),
        this.getJobCircleHitListsApi(params),
        this.getJobCircleOrganizationListsApi(params),
        this.getGroupListsApi({isHaveMember: 1}),
        this.getMenberListsApi(),
        this.getJobCircleMemberListsApi(params)
      ]
    )
    .then((res) => {
      const jobCircleDetails = {...this.jobCircleDetails}

      // 成员列表的遍历
      this.menberLists.map(field => {

        // 导师的筛选
        if(field.uid === jobCircleDetails.ownerUid) {
          this.form.owner_uid.tem = field
          this.form.owner_uid.show = true
          this.form.check_owner_uid = String(field.uid)
          this.form.owner_uid.noEdit.value = String(field.uid)
          this.form.owner_uid.noEdit.tem = field
          this.form.owner_uid.noEdit.show = true
        }

        // 工作圈成员
        if(this.jobCircleMemberLists.includes(field.uid)) {
          this.form.members.value.push(field.uid)
          this.form.members.tem.push(field)
          this.form.members.show = true
          this.form.members.noEdit.value.push(field.uid)
          this.form.members.noEdit.tem.push(field)
          this.form.members.noEdit.show = true
        }

        // 不可见学员
        if(this.jobCircleHitLists.includes(field.uid)) {
          this.form.hits.value.push(field.uid)
          this.form.hits.tem.push(field)
          this.form.hits.show = true
          this.form.hits.noEdit.value.push(field.uid)
          this.form.hits.noEdit.tem.push(field)
          this.form.hits.noEdit.show = true
        }
      })

      // 组织的遍历
      this.groupLists.map(field => {
        // 工作圈组织
        if(this.jobCircleOrganizationLists.includes(field.groupId)) {
          this.form.organizations.value.push(field.groupId)
          this.form.organizations.tem.push(field.groupName)
          this.form.organizations.show = true
          this.form.organizations.noEdit.value.push(field.groupId)
          this.form.organizations.noEdit.tem.push(field.groupName)
          this.form.organizations.noEdit.show = true
        }
      })

      this.form.name = jobCircleDetails.name
      this.form.content = jobCircleDetails.content
      this.form.sort = jobCircleDetails.sort
      this.form.status = jobCircleDetails.status === '上线' ? 1 : 0
      this.form.owner_uid.value = jobCircleDetails.ownerUid
      this.form.cover_img_id.value = jobCircleDetails.coverImgId
      this.form.cover_img_id.tem = jobCircleDetails.coverImg.smallUrl
      this.form.id = jobCircleDetails.id
      this.form.check_cover_img_id = jobCircleDetails.coverImgId
      this.form.members.value = this.form.members.value.join(',')
      this.form.members.noEdit.value = this.form.members.noEdit.value.join(',')
      this.form.check_members = this.form.members.value
      this.form.hits.value = this.form.hits.value.join(',')
      this.form.hits.noEdit.value = this.form.hits.noEdit.value.join(',')
      this.form.organizations.value = this.form.organizations.value.join(',')
      this.form.organizations.noEdit.value = this.form.organizations.noEdit.value.join(',')
      this.form.check_organizations = this.form.organizations.value
      this.imageUpload.hasUploaded = true
      this.imageUpload.btnTxt = '重新上传'
      this.ContentEditor.content = jobCircleDetails.content
    })
    .catch((err) => {
      this.$message.error('初始化页面失败~')
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗确定按钮
   * @return   {[type]}   [description]
   */
  confirm() {
    const type = this.models.currentModalName
    this.form[type].show = this.form[type].value ? true : false
    this.models.show = false
    this.ownerUidName = ''
    this.form[`check_${type}`] = this.form[type].value
    this.form[type].noEdit.value = this.form[type].value
    this.form[type].noEdit.tem = this.form[type].tem
    this.form[type].noEdit.show = this.form[type].show
    if(this.rules[`check_${type}`]) this.$refs.form.validateField(`check_${type}`)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗关闭按钮
   */
  cancel() {
    const type = this.models.currentModalName
    this.models.show = false
    this.form[type].value = this.form[type].noEdit.value
    this.form[type].tem = this.form[type].noEdit.tem
    this.form[type].show = this.form[type].noEdit.show
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   移除选中的radio对象
   * @return   {[type]}   [description]
   */
  removeSingleChecked(type) {
    switch(type) {
      case 'owner_uid':
        this.form.check_owner_uid = ''
        this.form.owner_uid.noEdit.value = ''
        this.form.owner_uid.noEdit.tem = []
        this.form.owner_uid.noEdit.show = false
        break
      default:
        break
    }
    this.form[type].value = ''
    this.form[type].tem = []
    this.form[type].show = false
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   移除多选
   */
  removeMultipleCheck(type, index, item) {
    const temArray = this.form[type].value.split(',')
    temArray.splice(index, 1)
    this.form[type].tem.splice(index, 1)
    this.form[type].value = temArray.join(',')
    this.form[type].show = this.form[type].tem <= 0 ? false : true
    switch(type) {
      case 'members':
        if(this.form.members.tem <= 0) {
          this.form.check_members = ''
          this.form.members.noEdit.value = ''
          this.form.members.noEdit.tem = []
          this.form.members.noEdit.show = false
        }
        break
      case 'hits':
        if(this.form.hits.tem <= 0) {
          this.form.check_hits = ''
          this.form.hits.noEdit.value = ''
          this.form.hits.noEdit.tem = []
          this.form.hits.noEdit.show = false
        }
        break
      case 'organizations':
        if(this.form.organizations.tem <= 0) {
          this.noCheckGroupListsApi()
          this.form.check_organizations = ''
          this.form.organizations.noEdit.value = ''
          this.form.organizations.noEdit.tem = []
          this.form.organizations.noEdit.show = false
        }
        break
      default:
        break
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  分类获取成员数据
   * @return   {[type]}      [description]
   */
  filterMenber(type, item) {
    if(Object.prototype.toString.call(item) === '[object String]') {
      this.getMenberListsApi({selectAll: 1})
          .then(() => {
            if(Object.prototype.toString.call(this.form[type].value) !== '[object Array]') {
              this.updateMenberListsAllApi({bool: false})
              this.updateMultipleMenberListsApi({ list: this.form[type].value.split(',') })
            }
          })
    } else {
      this.getMenberListsApi({groupId: item.groupId})
          .then(() => {
            if(Object.prototype.toString.call(this.form[type].value) !== '[object Array]') {
              this.updateMenberListsAllApi({bool: false})
              this.updateMultipleMenberListsApi({ list: this.form[type].value.split(',') })
            }
          })
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   选择圈主
   */
  seleteOwnerUid(item) {
    const data = { show: true, tem: [], value: [] }
    this.updateMenberListsByIdApi({uid: item.uid})
    this.form.owner_uid.tem = item
    this.menberLists.map(field => {
      if(field.active) {
        data.value = String(field.uid)
        data.tem = item
      }
    })
    this.form.owner_uid = Object.assign(this.form.owner_uid, data)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   多选
   */
  multipleSelection(type, item, index) {
    const data = { show: true, tem: [], value: [] }
    this.updateMenberListsApi({ index })
    this.menberLists.map(field => {
      if(field.active) {
        data.value.push(field.uid)
        data.tem.push(field)
      }
    })
    data.value = data.value.join(',')
    this.form[type] = Object.assign(this.form[type], data)
    switch(type) {
      case 'members':
        if(Object.prototype.toString.call(this.form.hits.value) !== '[object Array]' && this.form.hits.value.split(',').includes(String(item.uid))) {
          this.$alert('必修学员和不可见学员重复选择', '错误提醒', {
            confirmButtonText: '我知道了',
            callback: action => {
              this.updateMenberListsByIdApi({uid: item.uid})
            }
          })
        }
        break
      case 'hits':
        if(Object.prototype.toString.call(this.form.members.value) !== '[object Array]' && this.form.members.value.split(',').includes(String(item.uid))) {
          this.$alert('必修学员和不可见学员重复选择', '错误提醒', {
            confirmButtonText: '我知道了',
            callback: action => {
              this.updateMenberListsByIdApi({uid: item.uid})
            }
          })
        }
        break
      default:
        break
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择课程组织
   * @return   {[type]}   [description]
   */
  seleteGroup(item, key) {
    this.updateGroupListsApi({groupId: item.groupId})
    const data = { show: true, tem: [], value: [] }
    this.groupLists.map(field => {
      if(field.active) {
        data.tem.push(field.groupName)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    this.form.organizations = Object.assign(this.form.organizations, data)
  }

  // 添加课程分类
  addCourseType() {
    const courseTypeList = this.courseTypeList
    const bool = courseTypeList.some(field => {
      return field.label  === this.courseType
    })
    if(bool) {
      this.showMsg({ content: '请不要重复添加~', type: 'error', duration: 3000 })
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-29
   * @detail   图片上传成功
   * @return   {[type]}       [description]
   */
  imageUploadSuccess(res) {
    this.form.cover_img_id.value = res.id
    this.form.cover_img_id.tem = res.url
    this.form.check_cover_img_id = res.id
    this.imageUpload.hasUploaded = true
    this.imageUpload.btnTxt = '重新上传'
    this.imageUpload.showError = false
    this.$refs.form.validateField('check_cover_img_id')
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-29
   * @detail   图片上传是被
   * @return   {[type]}       [description]
   */
  imageUploadFail(res) {
    this.imageUpload.hasUploaded = false
    this.imageUpload.btnTxt = '重新上传'
    this.imageUpload.showError = true
    if(Object.prototype.toString.call(res) === '[object String]') {
      this.$message.error(`${res}~`)
    } else {
      this.$message.error(`${res.msg}~`)
    }
  }
}