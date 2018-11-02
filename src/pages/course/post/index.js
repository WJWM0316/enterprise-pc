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
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi',
      'uploadApi',
      'getCategoryListsApi',
      'getTutorListApi',
      'updateGroupListsApi',
      'updateCategoryListsApi',
      'noCheckedCategoryListsApi',
      'getCategoryApi',
      'postCourseApi',
      'putCourseApi',
      'getCourseListsApi',
      'getCourseDetailApi',
      'getCoursePeopleApi',
      'getCourseOrganizationsApi',
      'getCourseCategoryApi',
      'getCoursePeopleHitsApi',
      'noCheckGroupListsApi',
      'updateMenberListsApi',
      'updateMultipleMenberListsApi',
      'updateMenberListsAllApi',
      'updateMenberListsByIdApi',
      'noCheckGroupListsApi',
      'switchCheckGroupListsApi',
      'classifyMemberListsByGroupIdApi',
      'setSelfDefinedGroup',
      'removeSelfDefinedGroup',
      'updateAllGroupListStatus',
      'updateSingleGrouptatus',
      'updateSingleMemberStatus',
      'updateAllMemberStatus'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'menberLists',
      'categoryList',
      'tutorLists',
      'courseDetail',
      'courseOrganizations',
      'courseCategory',
      'coursePeaple',
      'coursePeapleHits',
      'hasMemberGroupList'
    ])
  }
})
export default class CoursePost extends Vue {

  form = {
    // 课程名称
    title: '',
    // 课程分类
    check_category_id: '',
    category_id: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false
      }
    },
    startTime: '',
    // 课程所属组织
    check_group_id: '',
    group_id: {
      tem: [],
      value: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false
      }
    },
    // 课程封面的id
    check_icon: '',
    icon: {
      value: [],
      tem: '',
      showError: false,
      noEdit: {
        value: [],
        tem: [],
        show: false
      }
    },
    // 课程导师
    check_master_uid: '',
    master_uid: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false
      }
    },
    // 课程介绍
    intro: '',
    // 必修学员
    check_members: '',
    members: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false
      }
    },
    // 不可见课程成员
    check_hits: '',
    hits: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        value: [],
        tem: [],
        show: false
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
    title: [
      { required: true, message: '请输入课程名称', trigger: 'blur' },
      { validator: this.validateBlankCharacter, trigger: 'blur' },
      { min: 1, max: 25, message: '课程名称最多25个字', trigger: 'blur' }
    ],
    check_category_id: [
      { required: true, message: '请选择课程分类', trigger: 'blur' }
    ],
    check_group_id: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ],
    check_icon: [
      { required: true, message: '请上传课程封面图片', trigger: 'blur' }
    ],
    check_master_uid: [
      { required: true, message: '请选择导师', trigger: 'blur' }
    ],
    startTime: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
    ],
    intro: [
      {required: true, message: '请填写课程介绍', trigger: 'blur', validator: editorRules.validator }
    ],
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    type: 'confirm',
    editType: 'tutor'
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
  temTutorLists = []
  // 导师名称
  ownerUidName = ''
  // 分类弹窗显示
  categoryModal = {
    show: false,
    name: '',
    loading: false
  }

  // 不能输入空白符
  validateBlankCharacter(rule, value, callback) {
    if(!value){
      callback(new Error('课程名称不能输入空白符'))
    } else {
      callback()
    }
    this.form.title = value.trim()
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
        const need = [
          'id',
          'title',
          'uid',
          'category_id',
          'group_id',
          'intro',
          'status',
          'icon',
          'members',
          'hits',
          'sort',
          'master_uid'
        ]
        const action = this.$route.name === 'coursePost' ? 'postCourseApi' : 'putCourseApi'
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
        if(res.status === 500) {
          this.$message.error(`${res.data.msg}~`);
          setTimeout(() => {
            this.submitBtnClick = !this.submitBtnClick
            this.submitBtnTxt = '提交'
          }, 3000)
          return
        }
        this.$message({message: res.data.msg, type: 'success'})
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
          this.$router.push({name: 'courseList'})
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
    // this.$refs.form.validateField('content')
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   搜索成员
   * @return   {[type]}   [description]
   */
  handleSearch() {
    this.getMenberListsApi({name: this.ownerUidName})
        .then(() => {
          this.ownerUidName = ''
        })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-10-08
   * @detail   搜索导师
   * @return   {[type]}   [description]
   */
  handleSearchTutor() {
    this.getMenberListsApi({name: this.ownerUidName, selectAll: 2})
        .then(() => {
          this.ownerUidName = ''
          this.temTutorLists = this.menberLists
        })
  }
  created() {
    this.initPageByPost()
    this.initPageByUpdate()
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   打开弹窗model
   */
  openModal(type) {
    this.noCheckGroupListsApi()
  	switch(type) {
  		case 'category_id':
  			this.models.title = '选择分类'
        this.models.show = true
        this.form[type].tem.length
          ? this.updateCategoryListsApi({categoryId: this.form[type].tem[0].categoryId})
          : this.noCheckedCategoryListsApi()
  			break
  		case 'master_uid':
  			this.models.title = '选择导师'
        this.models.show = true
        if(this.models.editType === 'tutor') {
          this.temTutorLists.map(field => field.active = this.form.master_uid.value === field.id || this.form.master_uid.value === field.uid || Number(this.form.master_uid.value) === field.uid || Number(this.form.master_uid.value) === field.id ? true : false)
        } else {
          this.updateMenberListsAllApi({bool: false})
          this.updateMenberListsByIdApi({uid: this.form.master_uid.tem.uid})
          this.temTutorLists = this.menberLists
        }
  			break
  		case 'group_id':
  			this.models.title = '选择组织'
        this.models.show = true
        if(this.form.group_id.value.length) this.updateGroupListsApi({list: this.form.group_id.value})
  			break
  		case 'members':
  			this.models.title = '参与课程学员'
        this.getMenberListsApi()
            .then(() => {
              this.models.show = true
              this.updateMenberListsAllApi({bool: false})
              this.setSelfDefinedGroup()
              this.updateMultipleMenberListsApi({
                list: Object.prototype.toString.call(this.form.members.value) === '[object Array]' ? this.form.members.value : this.form.members.value.split(',')
              })
            })
  			break
      case 'hits':
        this.models.title = '对这些人不可见'
        this.getMenberListsApi()
            .then(() => {
              this.models.show = true
              this.updateMenberListsAllApi({bool: false})
              this.setSelfDefinedGroup()
              this.updateMultipleMenberListsApi({
                list: Object.prototype.toString.call(this.form.hits.value) === '[object Array]' ? this.form.hits.value : this.form.hits.value.split(',')
              })
            })
        break
  		default:
  			break
  	}
    this.models.currentModalName = type
    this.models.width = '860px'
    this.models.minHeight = '284px'
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {
    if(this.$route.name !== 'coursePost') return
    Promise.all([
      this.getGroupListsApi(),
      this.getMenberListsApi(),
      this.getCategoryListsApi(),
      this.getTutorListApi({type: 2})
    ])
    .then(() => {
      this.temTutorLists = [...this.tutorLists]
    })
    .catch((err) => {
      this.$message.error('初始化页面失败~')
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   编辑时初始化页面
   * @return   {[type]}   [description]
   */
  initPageByUpdate() {
    const params = {id: this.$route.query.course_id}
    if(this.$route.name !== 'courseUpdate') return
    Promise.all(
      [
        this.getCourseDetailApi(params),
        this.getCoursePeopleApi(params),
        this.getCourseOrganizationsApi(params),
        this.getCourseCategoryApi(params),
        this.getCoursePeopleHitsApi(params),
        this.getMenberListsApi(),
        this.getGroupListsApi(),
        this.getCategoryListsApi(),
        this.getTutorListApi({type: 2})
      ]
    )
    .then((res) => {
      const courseDetail = this.courseDetail

      // 组织的遍历
      this.groupLists.map(field => {
        if(this.courseOrganizations.includes(field.groupId)) {
          this.form.group_id.value.push(field.groupId)
          this.form.group_id.tem.push(field)
          this.form.group_id.show = true
          this.form.group_id.noEdit.value.push(field.groupId)
          this.form.group_id.noEdit.tem.push(field)
          this.form.group_id.noEdit.show = true
        }
      })

      // 分类的遍历
      this.categoryList.map(field => {
        if(field.categoryId === this.courseCategory.id) {
          this.form.category_id.value = field.categoryId
          this.form.category_id.tem.push(field)
          this.form.category_id.show = true
          this.form.check_category_id = field.categoryId
          this.form.category_id.noEdit.value = field.categoryId
          this.form.category_id.noEdit.tem.push(field)
          this.form.category_id.noEdit.show = true
        }
      })

      // 学员的遍历
      this.menberLists.map(field => {
        // 必修学员
        if(this.coursePeaple.includes(field.uid)) {
          this.form.members.value.push(field.uid)
          this.form.members.tem.push(field)
          this.form.members.show = true
          this.form.members.noEdit.value.push(field.uid)
          this.form.members.noEdit.tem.push(field)
          this.form.members.noEdit.show = true
        }
        // 不可见学员
        if(this.coursePeapleHits.includes(field.uid)) {
          this.form.hits.value.push(field.uid)
          this.form.hits.tem.push(field)
          this.form.hits.show = true
          this.form.hits.noEdit.value.push(field.uid)
          this.form.hits.noEdit.tem.push(field)
          this.form.hits.noEdit.show = true
        }
      })
      this.form.id = courseDetail.id
      this.form.title = courseDetail.title
      this.form.intro = courseDetail.intro
      this.form.sort = courseDetail.sort
      this.form.status = courseDetail.status === '上线' ? 1 : 0
      this.form.icon.value = courseDetail.icon
      this.form.icon.tem = courseDetail.coverImg
      this.form.check_icon = courseDetail.icon
      this.form.members.value = this.form.members.value.join(',')
      this.form.members.noEdit.value = this.form.members.noEdit.value.join(',')
      this.form.hits.value = this.form.hits.value.join(',')
      this.form.hits.noEdit.value = this.form.hits.noEdit.value.join(',')
      this.form.check_members = this.form.members.value
      this.form.check_hits = this.form.hits.value
      this.form.check_master_uid = this.form.master_uid.value
      this.form.check_group_id = this.form.group_id.value
      this.form.group_id.value = this.form.group_id.value.join(',')
      this.form.group_id.noEdit.value = this.form.group_id.noEdit.value.join(',')
      this.form.master_uid.value = String(courseDetail.masterUid)
      this.form.master_uid.tem = { realname: courseDetail.realname, uid: courseDetail.masterUid}
      this.form.master_uid.show = true
      this.form.master_uid.noEdit.value = String(courseDetail.masterUid)
      this.form.master_uid.noEdit.tem = { realname: courseDetail.realname, uid: courseDetail.masterUid}
      this.form.master_uid.noEdit.show = true
      this.form.check_master_uid = courseDetail.masterUid
      this.imageUpload.hasUploaded = true
      this.imageUpload.btnTxt = '重新上传'
      this.ContentEditor.content = courseDetail.intro
      this.temTutorLists = [...this.tutorLists]
    })
    .catch((err) => {
      this.$message.error('初始化页面失败~');
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
    const data = { show: true, tem: [], value: [] }
    this.models.show = false
    this.form[`check_${type}`] = this.form[type].value
    this.form[type].noEdit.value = this.form[type].value
    this.form[type].noEdit.tem = this.form[type].tem
    this.form[type].noEdit.show = this.form[type].show
    this.form[type].show = Object.prototype.toString.call(this.form[type].value) !== '[object Array]' && this.form[type].value ? true : false
    // this.removeSelfDefinedGroup()
    switch(type) {
      case 'members':
        this.menberLists.map(field => {
          if(field.active) {
            data.value.push(field.uid)
            data.tem.push(field)
          }
        })
        data.value = data.value.join(',')
        this.form.members = Object.assign(this.form.members, data)
        break
      case 'hits':
        this.menberLists.map(field => {
          if(field.active) {
            data.value.push(field.uid)
            data.tem.push(field)
          }
        })
        data.value = data.value.join(',')
        this.form.hits = Object.assign(this.form.hits, data)
        break
      default:
        break   
    }
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
    // this.removeSelfDefinedGroup()
    switch(type) {
      case 'master_uid':
        this.updateAllMemberStatus({bool: false})
        this.updateSingleMemberStatus({uid: this.form.master_uid.value})
        break
      default:
        break
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   移除选中的radio对象
   * @return   {[type]}   [description]
   */
  removeSingleChecked(type, item) {
    switch(type) {
      case 'category_id':
        this.updateCategoryListsApi({categoryId: this.form[type].tem[0].categoryId})
        this.form.check_category_id = ''
        this.form.category_id.noEdit.value = ''
        this.form.category_id.noEdit.tem = []
        this.form.category_id.noEdit.show = false
        break
      case 'master_uid':
        if(this.models.editType === 'tutor') {
          this.temTutorLists.map(field => field.active = (field.uid && item.uid === field.uid) || (field.id && item.uid === field.id) ? !field.active : false)
        } else {
          this.updateMenberListsByIdApi({uid: item.uid})
          this.temTutorLists = this.menberLists
        }
        this.form.check_master_uid = ''
        this.form.master_uid.noEdit.value = ''
        this.form.master_uid.noEdit.tem = []
        this.form.master_uid.noEdit.show = false
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
    let tem = this.form[type].value.split(',')
    tem.splice(index, 1)
    this.form[type].tem.splice(index, 1)
    this.form[type].value = tem.join(',')
    this.form[type].show = this.form[type].tem <= 0 ? false : true
    this.form[type].noEdit.show = this.form[type].show
    this.form[type].noEdit.tem = this.form[type].tem
    this.form[type].noEdit.value = this.form[type].value
    switch(type) {
      case 'group_id':
        if(this.form.group_id.tem <= 0) {
          this.noCheckGroupListsApi()
          this.form.check_group_id = ''
          this.form.group_id.noEdit.value = ''
          this.form.group_id.noEdit.tem = []
          this.form.group_id.noEdit.show = false
        } else {
          this.updateGroupListsApi({list: this.form.group_id.value.split(',')})
        }
        break
      case 'members':
        if(this.form.members.tem.length <= 0) {
          this.form.members.noEdit.value = ''
          this.form.members.noEdit.tem = []
          this.form.members.noEdit.show = false
          this.updateMenberListsAllApi({bool: false})
        }
        break
      case 'hits':
        if(this.form.hits.tem.length <= 0) {
          this.form.hits.noEdit.value = ''
          this.form.hits.noEdit.tem = []
          this.form.hits.noEdit.show = false
          this.updateMenberListsAllApi({bool: false})
        }
        break
      default:
        break
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   * @return   {[type]}      [description]
   */
  filterMenber(type, item) {
    this.classifyMemberListsByGroupIdApi({groupId: item.groupId, bool: item.active})
    this.switchCheckGroupListsApi({groupId: item.groupId})
    this.menberLists.map(field => {
      if(field.selfGroup.includes(item.groupId)) {
        item.active ? this.updateSingleMemberStatus({uid: field.uid, bool: true}) : this.updateSingleMemberStatus({uid: field.uid, bool: false})
      }
    })
    const checkedMenberLists = this.menberLists.filter(field => field.active)
    checkedMenberLists.length === this.menberLists.length ? this.updateSingleGrouptatus({groupId: 'all', bool: true}) : this.updateSingleGrouptatus({groupId: 'all', bool: false})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择导师
   * @return   {[type]}   [description]
   */
  tutorClassification(type, item) {
    if(Object.prototype.toString.call(item) === '[object String]' && item === 'outer') {
      this.models.editType = 'tutor'
      this.getTutorListApi({type: 2}).then(() => {
        this.tutorLists.map(field => {
          field.active = String(field.uid) === this.form.master_uid.value ? true : false
        })
        this.temTutorLists = this.tutorLists
      })
    } else if(Object.prototype.toString.call(item) === '[object String]' && item === 'all'){
      this.models.editType = 'member'
      this.getMenberListsApi({selectAll: 1}).then(() => {
        this.updateMenberListsAllApi({bool: false})
        this.updateMultipleMenberListsApi({
          list: [this.form.master_uid.value]
        })
        this.temTutorLists = this.menberLists
      })
    } else {
      this.models.editType = 'member'
      this.getMenberListsApi({groupId: item.groupId}).then(() => {
        this.updateMenberListsAllApi({bool: false})
        this.updateMultipleMenberListsApi({
          list: [this.form.master_uid.value]
        })
        this.temTutorLists = this.menberLists
      })
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   选择分类
   * @return   {[type]}   [description]
   */
  selectCategory(item, key) {
    this.updateCategoryListsApi({categoryId: item.categoryId})
    const data = { show: true, tem: [], value: [] }
    this.categoryList.map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.categoryId)
      }
    })
    data.value = data.value.join(',')
    this.form.category_id = Object.assign(this.form.category_id, data)
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
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    this.form.group_id = Object.assign(this.form.group_id, data)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   单选
   */
  fetchTutor(item) {
    let temTutorLists = [...this.temTutorLists]
    const data = { show: true, tem: [], value: [] }
    if(this.models.editType === 'tutor') {
      temTutorLists.map(field => field.active = item.id === field.id ? true : false)
    } else {
      this.updateMenberListsByIdApi({uid: item.uid})
      temTutorLists = this.menberLists
    }
    this.temTutorLists = temTutorLists

    if(!Object.prototype.toString.call(this.form.hits.value) === '[object Array]' && this.form.hits.value.split(',').includes(String(item.uid))) {
      this.$alert('导师和不可见学员重复选择', '错误提醒', {
        confirmButtonText: '我知道了',
        callback: action => {
          if(this.models.editType === 'tutor') {
            temTutorLists.map(field => field.active = item.uid === field.uid ? !field.active : false)
          } else {
            this.updateMenberListsByIdApi({uid: item.uid})
            this.temTutorLists = this.menberLists
          }
        }
      })
      return
    }

    if(!Object.prototype.toString.call(this.form.members.value) === '[object Array]' && this.form.members.value.split(',').includes(String(item.uid))) {
      this.$alert('导师和必修学员重复选择', '错误提醒', {
        confirmButtonText: '我知道了',
        callback: action => {
          if(this.models.editType === 'tutor') {
            temTutorLists.map(field => field.active = item.uid === field.uid ? !field.active : false)
          } else {
            this.updateMenberListsByIdApi({uid: item.uid})
            this.temTutorLists = this.menberLists
          }
        }
      })
      return
    }
    this.temTutorLists.map(field => {
      if(field.active) {
        data.tem = field
        data.value = field.uid ? String(field.uid) : String(field.id)
      }
    })
    data.show = Object.prototype.toString.call(data.value) === '[object Array]' ? false : true
    this.form.master_uid = Object.assign(this.form.master_uid, data)
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
    this.memberAssociationGroup(item)
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
        if(Object.prototype.toString.call(this.form.members.value) !== '[object Array]' && this.form.members.value.split(',').includes(this.form.master_uid.value)) {
          this.$alert('必修学员和导师重复选择', '错误提醒', {
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
        if(Object.prototype.toString.call(this.form.hits.value) !== '[object Array]' && this.form.hits.value.split(',').includes(this.form.master_uid.value)) {
          this.$alert('不可见学员和导师重复选择', '错误提醒', {
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
   * @DateTime 2018-10-16
   * @detail   通过成员关联组
   * @return   {[type]}   [description]
   */
  memberAssociationGroup(item) {
    // 是否选中全部的组织
    const isCheckedAll = this.menberLists.every(field => field.active)
    // 判断是否已经全选
    isCheckedAll ? this.updateSingleGrouptatus({groupId: 'all', bool: true}) : this.updateSingleGrouptatus({groupId: 'all', bool: false})

    this.menberLists.map(field => {
      // 当前的成员id 和选中的成员id 是否相等
      if(field.uid === item.uid) {
        // 判断有没有分组
        if(field.selfGroup.length) {
          // 遍历所有的分组
          this.groupLists.map(group => {
            // 当前选中的项所在的分组
            if(field.selfGroup.includes(group.groupId)) {
              // 当前分组有多少人
              const currentTypeGroupNums = this.menberLists.filter(member => member.selfGroup.includes(group.groupId))
              // 当前分组有多少人是被选中的
              const currentTypeGroupNumsActive = currentTypeGroupNums.filter(member => member.active )
              if(currentTypeGroupNums.length === currentTypeGroupNumsActive.length) {
                item.active ? this.updateSingleGrouptatus({groupId: group.groupId, bool: true}) : this.updateSingleGrouptatus({groupId: group.groupId, bool: false})
              } else {
                this.updateSingleGrouptatus({groupId: group.groupId, bool: false})
              }
            }
          })
        }
      }
    })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   添加分类
   * @return   {[type]}   [description]
   */
  getCategory() {
    this.categoryModal.loading = true
    this.getCategoryApi({name: this.categoryModal.name})
        .then(() => {
          this.categoryModal.name = ''
          this.getCategoryListsApi()
              .then(() => {
                this.categoryModal.loading = false
                this.categoryModal.show = false
                this.categoryModal.name = ''
              })
        })
        .catch(err => {
          this.categoryModal.loading = false
          this.categoryModal.show = false
          this.$message.error(`${err.msg}~`)
          this.categoryModal.name = ''
        })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-29
   * @detail   图片上传成功
   * @return   {[type]}       [description]
   */
  imageUploadSuccess(res) {
    this.form.icon.value = res.id
    this.form.icon.tem = res.url
    this.form.check_icon = res.id
    this.imageUpload.hasUploaded = true
    this.imageUpload.btnTxt = '重新上传'
    this.imageUpload.showError = false
    this.$refs.form.validateField('check_icon')
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