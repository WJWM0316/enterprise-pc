import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor2/index.vue'
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
      'getJobCircleDetailsApi',
      'getJobCircleHitListsApi',
      'getJobCircleOrganizationListsApi',
      'getCategoryListsApi',
      'getTutorListApi',
      'updateGroupListsApi',
      'noCheckedCategoryListsApi',
      'updateCategoryListsApi',
      'postLiveApi',
      'putLiveApi',
      'getCategoryListsApi',
      'getLiveDetailApi',
      'getLiveMenberListApi',
      'getLiveInvisibleMenberListApi',
      'getTutorListApi',
      'getCategoryApi',
      'noCheckGroupListsApi',
      'updateMenberListsApi',
      'updateMultipleMenberListsApi',
      'updateMenberListsAllApi',
      'updateMenberListsByIdApi',
      'setSelfDefinedGroup',
      'removeSelfDefinedGroup',
      'updateAllGroupListStatus',
      'updateSingleGrouptatus',
      'updateSingleMemberStatus',
      'classifyMemberListsByGroupIdApi',
      'switchCheckGroupListsApi',
      'updateAllMemberStatus',
      'removeRepeatMember',
      'addSelfTutorAndGroupList',
      'activeSelfTutorAndGroupSomeItem',
      'searchSomeMember',
      'changeMemberLists'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'menberLists',
      'categoryList',
      'tutorLists',
      'liveDetails',
      'tutorLists',
      'hasMemberGroupList',
      'userInfos',
      'selfTutorLists'
    ])
  }
})
export default class BroadcastPost extends Vue {

  form = {
    // 直播名称
    liveName: '',
    // 直播主用户ID
    check_categoryList: '',
    categoryList: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        tem: [],
        value: [],
        show: false
      }
    },
    startTime: '',
    check_groupList: '',
    groupList: {
      tem: [],
      value: [],
      show: false,
      noEdit: {
        tem: [],
        value: [],
        show: false
      }
    },
    // 直播封面的id
    check_coverImgId: '',
    coverImgId: {
      value: '',
      tem: '',
      showError: false,
      noEdit: {
        tem: [],
        value: [],
        show: false
      }
    },
    // 直播成员
    check_uid: '',
    uid: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        tem: [],
        value: [],
        show: false
      }
    },
    // 请填写直播介绍
    intro: '',
    // 不可见直播成员
    check_memberList: '',
    memberList: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        tem: [],
        value: [],
        show: false
      }
    },
    // 不可见直播成员
    check_invisibleList: '',
    invisibleList: {
      value: [],
      tem: [],
      show: false,
      noEdit: {
        tem: [],
        value: [],
        show: false
      }
    },
    isOnline: 1,
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
    liveName: [
      { required: true, message: '请输入直播名称', trigger: 'blur' },
      { validator: this.validateBlankCharacter, trigger: 'blur' },
      { min: 1, max: 25, message: '直播名称最多25个字', trigger: 'blur' }
    ],
    check_categoryList: [
      { required: true, message: '请选择直播分类', trigger: 'blur' }
    ],
    check_groupList: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ],
    check_coverImgId: [
      { required: true, message: '请上传直播封面图片', trigger: 'blur' }
    ],
    check_uid: [
      { required: true, message: '请选择导师', trigger: 'blur' }
    ],
    startTime: [
      { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
    ],
    intro: [
      {required: true, message: '请填写工作圈介绍', trigger: 'change', validator: editorRules.validator}
    ]
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

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'
  temTutorLists = []
  // 导师名称
  searchField = ''
  // 分类弹窗显示
  categoryModal = {
    show: false,
    name: '',
    loading: false
  }

  // 不能输入空白符
  validateBlankCharacter(rule, value, callback) {
    if(!value){
      callback(new Error('直播名称不能输入空白符'))
    } else {
      callback()
    }
    this.form.liveName = value.trim()
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
          'liveName',
          'uid',
          'categoryList',
          'groupList',
          'startTime',
          'intro',
          'isOnline',
          'coverImgId',
          'memberList',
          'invisibleList',
          'sort',
          'id'
        ]
        const action = this.$route.name === 'broadcastPost' ? 'postLiveApi' : 'putLiveApi'
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
    formData.startTime = Date.parse(new Date(this.form.startTime)) / 1000
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
          this.$router.push({name: 'broadcastList'})
        }, 3000)
      })
      .catch(err => {
        this.$message.error(`${err.msg}~`)
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-10-25
   * @detail   编辑器文字改变
   * @return   {[type]}   [description]
   */
  handleContentEditorInput(dom) {
    this.form.intro = dom
    this.$refs.form.validateField('intro')
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   搜索成员
   * @return   {[type]}   [description]
   */
  handleSearch() {
    const params = {}
    if(this.searchField) {
      params.name = this.searchField
    } else {
      params.selectAll = 2
    }
    this.searchSomeMember(params)
        .then(() => {
          this.changeMemberLists({list: 'searchSomeMemberLists'})
          this.searchField = ''
        })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-10-08
   * @detail   搜索导师
   * @return   {[type]}   [description]
   */
  fetchTutor() {
    this.getMenberListsApi({name: this.searchField, selectAll: 2})
        .then(() => {
          this.searchField = ''
          this.temTutorLists = [...this.menberLists]
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
    const temTutorLists = [...this.temTutorLists]
    let list = []
  	switch(type) {
  		case 'categoryList':
  			this.models.title = '选择分类'
        this.models.show = true
        this.form.categoryList.tem.length
          ? this.updateCategoryListsApi({categoryId: this.form.categoryList.tem[0].categoryId})
          : this.noCheckedCategoryListsApi()
  			break
  		case 'uid':
  			this.models.title = '选择导师'
        this.models.show = true
        this.setSelfDefinedGroup()
        this.addSelfTutorAndGroupList()
        if(this.models.editType === 'tutor') {
          temTutorLists.map(field => field.active = this.form.uid.value === field.id || this.form.uid.value === field.uid || Number(this.form.uid.value) === field.uid || Number(this.form.uid.value) === field.id ? true : false)
          this.temTutorLists = temTutorLists
        } else {
          this.updateMenberListsByIdApi({uid: this.form.uid.value})
          this.temTutorLists = this.menberLists
        }
  			break
  		case 'groupList':
  			this.models.title = '选择组织'
        this.models.show = true
        this.form.groupList.value.length ? this.updateGroupListsApi({list: this.form.groupList.value.split(',')}) : this.noCheckGroupListsApi()
        break
  		case 'memberList':
  			this.models.title = '参与直播学员'
        if(Object.prototype.toString.call(this.form.uid.value) !== '[object Array]') {
          list.push(this.form.uid.value)
        }
        if(this.form.invisibleList.tem.length > 0) {
          list =[...list, ...this.form.invisibleList.value.split(',')]
        }
        // 从素有成员中去除导师和不可见学员
        this.removeRepeatMember({ list })
        this.changeMemberLists({list: 'memberLists'})
        this.models.show = true
        this.updateMenberListsAllApi({bool: false})
        this.updateAllGroupListStatus({bool: false})
        this.setSelfDefinedGroup()
        this.updateMultipleMenberListsApi({
          list: Object.prototype.toString.call(this.form.memberList.value) === '[object Array]' ? this.form.memberList.value : this.form.memberList.value.split(',')
        })
  			break
      case 'invisibleList':
        this.models.title = '对这些人不可见'
        if(Object.prototype.toString.call(this.form.uid.value) !== '[object Array]') {
          list.push(this.form.uid.value)
        }
        if(this.form.memberList.tem.length > 0) {
          list =[...list, ...this.form.memberList.value.split(',')]
        }
        // 从素有成员中去除导师和不可见学员
        this.removeRepeatMember({ list })
        this.changeMemberLists({list: 'memberLists'})
        this.models.show = true
        this.setSelfDefinedGroup()
        this.updateMenberListsAllApi({bool: false})
        this.updateAllGroupListStatus({bool: false})
        this.updateMultipleMenberListsApi({
          list: Object.prototype.toString.call(this.form.invisibleList.value) === '[object Array]' ? this.form.invisibleList.value : this.form.invisibleList.value.split(',')
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
    if(this.$route.name !== 'broadcastPost') return
    Promise.all([
      this.getGroupListsApi(),
      this.getMenberListsApi(),
      this.getCategoryListsApi(),
      this.getTutorListApi({type: 2})
    ])
    .then(() => {
      this.temTutorLists = this.tutorLists
    })
    .catch((err) => {
      this.showMsg({ content: '初始化页面失败~', type: 'error', duration: 3000 })
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   编辑时初始化页面
   * @return   {[type]}   [description]
   */
  initPageByUpdate() {
    const params = {id: this.$route.query.id}
    if(this.$route.name !== 'broadcastUpdate') return
    Promise.all(
      [
        this.getLiveDetailApi(params),
        this.getLiveMenberListApi(params),
        this.getLiveInvisibleMenberListApi(params),
        this.getGroupListsApi(),
        this.getMenberListsApi({selectAll: 2}),
        this.getCategoryListsApi(),
        this.getTutorListApi()
      ]
    )
    .then((res) => {
      const {categoryList, groupList, info, invisibleList, memberList} = this.liveDetails

      // 分类的遍历
      categoryList.map(field => {
        this.form.categoryList.tem.push(field)
        this.form.categoryList.value.push(field.categoryId)
        this.form.categoryList.show = true
        this.form.categoryList.noEdit.tem.push(field)
        this.form.categoryList.noEdit.value.push(field.categoryId)
        this.form.categoryList.noEdit.show = true
      })

      // 不可见学员
      invisibleList.map(field => {
        this.form.invisibleList.tem.push(field)
        this.form.invisibleList.value.push(field.uid)
        this.form.invisibleList.show = true
        this.form.invisibleList.noEdit.tem.push(field)
        this.form.invisibleList.noEdit.value.push(field.uid)
        this.form.invisibleList.noEdit.show = true
      })

      // 必修学员
      memberList.map(field => {
        this.form.memberList.tem.push(field)
        this.form.memberList.value.push(field.uid)
        this.form.memberList.show = true
        this.form.memberList.noEdit.tem.push(field)
        this.form.memberList.noEdit.value.push(field.uid)
        this.form.memberList.noEdit.show = true
      })

      // 组织的遍历
      groupList.map(field => {
        this.form.groupList.tem.push(field)
        this.form.groupList.value.push(field.groupId)
        this.form.groupList.show = true
        this.form.groupList.noEdit.tem.push(field)
        this.form.groupList.noEdit.value.push(field.groupId)
        this.form.groupList.noEdit.show = true
      })

      // 导师的遍历
      this.menberLists.map(field => {
        if(field.uid === info.masterId) {
          this.form.uid.value = String(field.uid)
          this.form.uid.tem = field
          this.form.uid.show = true
          this.form.uid.noEdit.value = String(field.uid)
          this.form.uid.noEdit.tem = field
          this.form.uid.noEdit.show = true
        }
      })

      this.form.id = info.id
      this.form.status = info.status
      this.form.startTime = new Date(info.expectedStartTime)
      this.form.coverImgId.value = info.coverImgId
      this.form.coverImgId.tem = info.cover.smallUrl
      this.form.check_coverImgId = info.coverImgId
      this.form.sort = info.sort
      this.form.isOnline = info.isOnline
      this.form.liveName = info.liveName
      this.form.intro = info.intro
      this.form.groupList.value = this.form.groupList.value.join(',')
      this.form.groupList.noEdit.value = this.form.groupList.noEdit.value.join(',')
      this.form.check_groupList = this.form.groupList.value
      this.form.categoryList.value = this.form.categoryList.value.join(',')
      this.form.check_categoryList = this.form.categoryList.value
      this.form.invisibleList.value = this.form.invisibleList.value.join(',')
      this.form.check_invisibleList = this.form.invisibleList.value
      this.form.memberList.value = this.form.memberList.value.join(',')
      this.form.check_memberList = this.form.memberList.value
      this.form.check_uid = this.form.uid.value
      this.form.memberList.noEdit.value = this.form.memberList.noEdit.value.join(',')
      this.form.invisibleList.noEdit.value = this.form.invisibleList.noEdit.value.join(',')
      this.temTutorLists = this.tutorLists
      this.imageUpload.hasUploaded = true
      this.imageUpload.btnTxt = '重新上传'
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
    let list = []
    list = this.menberLists.filter(field => field.active)
    this.form[`check_${type}`] = this.form[type].value
    this.form[type].noEdit.value = this.form[type].value
    this.form[type].noEdit.tem = this.form[type].tem
    this.form[type].noEdit.show = this.form[type].show
    this.form[type].show = Object.prototype.toString.call(this.form[type].value) !== '[object Array]' && this.form[type].value ? true : false
    switch(type) {
      case 'memberList':
        if(Object.prototype.toString.call(this.form.invisibleList.value) !== '[object Array]') {
          list = list.filter(field => !this.form.invisibleList.value.split(',').includes(String(field.uid)))
        }
        list = list.filter(field => field.uid !== Number(this.form.uid.value))
        list.map(field => {
          data.value.push(field.uid)
          data.tem.push(field)
        })
        data.value = data.value.join(',')
        data.show = list.length > 0 ? true : false
        this.form.memberList = Object.assign(this.form.memberList, data)
        this.form.memberList.noEdit = data
        delete this.form.memberList.noEdit.noEdit
        break
      case 'invisibleList':
        if(Object.prototype.toString.call(this.form.memberList.value) !== '[object Array]') {
          list = list.filter(field => !this.form.memberList.value.split(',').includes(String(field.uid)))
        }
        list = list.filter(field => field.uid !== Number(this.form.uid.value))
        list.map(field => {
          data.value.push(field.uid)
          data.tem.push(field)
        })
        data.value = data.value.join(',')
        data.show = list.length > 0 ? true : false
        this.form.invisibleList = Object.assign(this.form.invisibleList, data)
        this.form.invisibleList.noEdit = data
        delete this.form.invisibleList.noEdit.noEdit
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
      case 'uid':
        if(this.models.editType === 'tutor') {
          this.temTutorLists.map(field => field.active = this.form.uid.value === field.uid || Number(this.form.uid.value) === field.uid ? true : false)
        } else {
          this.updateAllMemberStatus({bool: false})
          this.updateSingleMemberStatus({uid: this.form.uid.value})
          this.temTutorLists = this.menberLists
        }
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
      case 'categoryList':
        this.updateCategoryListsApi({categoryId: this.form[type].tem[0].categoryId})
        this.form.check_categoryList = ''
        this.form.categoryList.noEdit.value = ''
        this.form.categoryList.noEdit.tem = []
        this.form.categoryList.noEdit.show = false
        break
      case 'uid':
        if(this.models.editType === 'tutor') {
          this.temTutorLists.map(field => field.active = (field.uid && item.uid === field.uid) || (field.id && item.uid === field.id) ? !field.active : false)
        } else {
          this.updateMenberListsByIdApi({uid: item.uid})
          this.temTutorLists = this.menberLists
        }
        this.form.check_uid = ''
        this.form.uid.noEdit.value = ''
        this.form.uid.noEdit.tem = []
        this.form.uid.noEdit.show = false
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
    this.form[type].value = temArray.join(',') ? temArray.join(',') : []
    this.form[type].show = this.form[type].tem <= 0 ? false : true
    this.form[type].noEdit.show = this.form[type].show
    this.form[type].noEdit.tem = this.form[type].tem
    this.form[type].noEdit.value = this.form[type].value
    switch(type) {
      case 'groupList':
        this.updateGroupListsApi({groupId: item.groupId})
        if(this.form.groupList.tem <= 0) {
          this.noCheckGroupListsApi()
          this.form.check_groupList = ''
          this.form.groupList.noEdit.value = []
          this.form.groupList.noEdit.tem = []
          this.form.groupList.noEdit.show = false
        }
        break
      case 'memberList':
        if(this.form.memberList.tem.length <= 0) {
          this.form.memberList.noEdit.value = []
          this.form.memberList.noEdit.tem = []
          this.form.memberList.noEdit.show = false
          this.updateMenberListsAllApi({bool: false})
        }
        break
      case 'invisibleList':
        if(this.form.invisibleList.tem.length <= 0) {
          this.form.invisibleList.noEdit.value = []
          this.form.invisibleList.noEdit.tem = []
          this.form.invisibleList.noEdit.show = false
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
   * @DateTime 2018-09-11
   * @detail   导师分类
   * @return   {[type]}   [description]
   */
  tutorClassification(type, item) {
    this.activeSelfTutorAndGroupSomeItem({groupId: item.groupId})
    if(item.groupId === 'outer') {
      this.models.editType = 'tutor'
      this.getTutorListApi({type: 2})
          .then(() => {
            this.tutorLists.map(field => {
              field.active = String(field.uid) === this.form.uid.value ? true : false
            })
            this.temTutorLists = this.tutorLists
          })
    } else if(item.groupId === 'all') {
      this.models.editType = 'member'
      this.getMenberListsApi({selectAll: 1})
        .then(() => {
          this.updateAllMemberStatus({bool: false})
          this.updateSingleMemberStatus({uid: this.form.uid.value, bool: true})
          this.temTutorLists = this.menberLists
        })
    } else {
      this.models.editType = 'member'
      this.getMenberListsApi({groupId: item.groupId})
          .then(() => {
            this.updateAllMemberStatus({bool: false})
            this.updateSingleMemberStatus({uid: this.form.uid.value, bool: true})
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
    this.updateCategoryListsApi({categoryId: item.categoryId, type: 'multiple'})
    const data = { show: true, tem: [], value: [] }
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.categoryId)
      }
    })
    data.value = data.value.join(',')
    this.form.categoryList = Object.assign(this.form.categoryList, data)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择直播组织
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
    this.form.groupList = Object.assign(this.form.groupList, data)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   单选
   */
  selectTutor(item) {

    const temTutorLists = [...this.temTutorLists]
    const data = { show: true, tem: [], value: [] }
    if(this.models.editType === 'tutor') {
      temTutorLists.map(field => field.active = item.id === field.id ? true : false)
    } else {
      this.updateMenberListsByIdApi({uid: item.uid})
      this.temTutorLists = this.menberLists
    }
    this.temTutorLists = temTutorLists

    if(Object.prototype.toString.call(this.form.invisibleList.value) !== '[object Array]' && this.form.invisibleList.value.split(',').includes(String(item.uid))) {
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

    if(Object.prototype.toString.call(this.form.memberList.value) !== '[object Array]' && this.form.memberList.value.split(',').includes(String(item.uid))) {
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
        data.value = item.uid ? String(item.uid) : String(item.id)
      }
    })
    data.show = Object.prototype.toString.call(data.value) === '[object Array]' ? false : true
    this.form.uid = Object.assign(this.form.uid, data)
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
      case 'memberList':
        if(Object.prototype.toString.call(this.form.invisibleList.value) !== '[object Array]' && this.form.invisibleList.value.split(',').includes(String(item.uid))) {
          this.$alert('必修学员和不可见学员重复选择', '错误提醒', {
            confirmButtonText: '我知道了',
            callback: action => {
              this.updateMenberListsByIdApi({uid: item.uid})
            }
          })
        }
        if(Object.prototype.toString.call(this.form.memberList.value) !== '[object Array]' && this.form.memberList.value.split(',').includes(this.form.uid.value)) {
          this.$alert('必修学员和导师重复选择', '错误提醒', {
            confirmButtonText: '我知道了',
            callback: action => {
              this.updateMenberListsByIdApi({uid: item.uid})
            }
          })
        }
        break
      case 'invisibleList':
        if(Object.prototype.toString.call(this.form.memberList.value) !== '[object Array]' && this.form.memberList.value.split(',').includes(String(item.uid))) {
          this.$alert('必修学员和不可见学员重复选择', '错误提醒', {
            confirmButtonText: '我知道了',
            callback: action => {
              this.updateMenberListsByIdApi({uid: item.uid})
            }
          })
        }
        if(Object.prototype.toString.call(this.form.invisibleList.value) !== '[object Array]' && this.form.invisibleList.value.split(',').includes(this.form.uid.value)) {
          this.$alert('必修学员和导师重复选择', '错误提醒', {
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
              })
        })
        .catch(err => {
          this.categoryModal.loading = false
          this.categoryModal.show = false
          this.$message.error(`${err.msg}~`)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-10
   * @detail   是否有权限进入对应页面
   * @return   {[type]}             [description]
   */
  routeJump(routeName) {
    const url = location.href.replace(RegExp(`${this.$route.path.slice(1)}`), routeName)
    // 是否是内容管理员
    const isContentManager = this.userInfos.roles.some(field => field <= 3) && !this.userInfos.roles.includes(1) && !this.userInfos.roles.includes(2)
    if(!isContentManager) {
      window.open(url.split('?')[0])
    } else{
      this.$message.error('当前帐号无权限，请联系管理员修改~')
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-29
   * @detail   图片上传成功
   * @return   {[type]}       [description]
   */
  imageUploadSuccess(res) {
    this.form.coverImgId.value = res.id
    this.form.coverImgId.tem = res.url
    this.form.check_coverImgId = res.id
    this.imageUpload.hasUploaded = true
    this.imageUpload.btnTxt = '重新上传'
    this.imageUpload.showError = false
    this.$refs.form.validateField('check_coverImgId')
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
    this.form.coverImgId.value = ''
    this.form.coverImgId.tem = {}
    this.form.check_coverImgId = ''
    if(Object.prototype.toString.call(res) === '[object String]') {
      this.$message.error(`${res}~`)
    } else {
      this.$message.error(`${res.msg}~`)
    }
  }
}