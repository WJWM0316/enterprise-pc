import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import Cropper from 'cropperjs'
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
      'getCategoryApi',
      'postCourseApi',
      'putCourseApi',
      'getCourseListsApi',
      'getCourseDetailApi',
      'getCoursePeopleApi',
      'getCourseOrganizationsApi',
      'getCourseCategoryApi',
      'getCoursePeopleHitsApi'
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
      'coursePeapleHits'
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
      { validator: this.checkBlankCharacter,  trigger: 'blur' }
      // { pattern: /^[\s]*$/, message: '不能输入空白符', trigger: 'change' },
      // { pattern:/^[a-zA-Z]w{1,4}$/, message: '以字母开头，长度在2-5之间， 只能包含字符、数字和下划线', trigger: 'change'}
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
      {
        required: true,
        message: '请填写课程介绍',
        trigger: 'blur',
        validator: editorRules.validator
      }
    ],
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
  temTutorLists = []
  // 导师名称
  ownerUidName = ''
  // 分类弹窗显示
  categoryModal = {
    show: false,
    name: '',
    loading: false
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
          // 清空搜索栏
          this.ownerUidName = ''
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
  	switch(type) {
  		case 'category_id':
  			this.models.title = '选择分类'
  			break
  		case 'master_uid':
  			this.models.title = '选择导师'
  			break
  		case 'group_id':
  			this.models.title = '选择组织'
  			break
  		case 'members':
  			this.models.title = '参与课程学员'
  			break
      case 'hits':
        this.models.title = '对这些人不可见'
        break
  		default:
  			break
  	}
    this.models.currentModalName = type
    this.models.width = '860px'
    this.models.minHeight = '284px'
    this.models.show = true
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
      this.getGroupListsApi({isHaveMember: 1}),
      this.getMenberListsApi(),
      this.getCategoryListsApi(),
      this.getTutorListApi({type: 1})
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
    const params = {id: this.$route.params.id}
    if(this.$route.name !== 'courseUpdate') return
    Promise.all(
      [
        this.getCourseDetailApi(params),
        this.getCoursePeopleApi(params),
        this.getCourseOrganizationsApi(params),
        this.getCourseCategoryApi(params),
        this.getCoursePeopleHitsApi(params),
        this.getMenberListsApi(),
        this.getGroupListsApi({isHaveMember: 1}),
        this.getCategoryListsApi(),
        this.getTutorListApi()
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

      // 导师的遍历
      this.tutorLists.map(field => {
        if(field.uid === courseDetail.masterUid) {
          this.form.master_uid.value = field.uid
          this.form.master_uid.tem = field
          this.form.master_uid.show = true
          this.form.master_uid.noEdit.value = field.uid
          this.form.master_uid.noEdit.tem = field
          this.form.master_uid.noEdit.show = true
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
          this.form.members.tem.push(field.realname)
          this.form.members.show = true
          this.form.members.noEdit.value.push(field.uid)
          this.form.members.noEdit.tem.push(field.realname)
          this.form.members.noEdit.show = true
        }
        // 不可见学员
        if(this.coursePeapleHits.includes(field.uid)) {
          this.form.hits.value.push(field.uid)
          this.form.hits.tem.push(field.realname)
          this.form.hits.show = true
          this.form.hits.noEdit.value.push(field.uid)
          this.form.hits.noEdit.tem.push(field.realname)
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
      this.imageUpload.hasUploaded = true
      this.imageUpload.btnTxt = '重新上传'
      this.ContentEditor.content = courseDetail.intro
      this.temTutorLists = [...this.tutorLists]
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
    this.form[type].show = this.form[type].value.length || this.form[type].value ? true : false
    this.models.show = false
    this.form[`check_${type}`] = this.form[type].value
    if(this.rules[`check_${type}`]) {
      this.$refs.form.validateField(`check_${type}`)
    }
    // 已经确定编辑
    this.form[type].noEdit.value = this.form[type].value
    this.form[type].noEdit.tem = this.form[type].tem
    this.form[type].noEdit.show = this.form[type].show
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗关闭按钮
   */
  cancel() {
    const type = this.models.currentModalName
    this.models.show = false
    // 没有点击确定按钮
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
    const value = this.form[type].value.split(',').splice(index, 1)
    this.form[type].tem.splice(index, 1)
    this.form[type].value = value.join(',')
    this.form[type].show = this.form[type].tem <= 0 ? false : true
    if(type === 'group_id') {
      this.updateGroupListsApi({groupId: item.groupId})
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   * @return   {[type]}      [description]
   */
  filterMenber(type, item) {
    Object.prototype.toString.call(item) === '[object String]'
    ? this.getMenberListsApi({selectAll: 1})
    : this.getMenberListsApi({groupId: item.groupId})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   导师分类
   * @return   {[type]}   [description]
   */
  tutorClassification(item) {
    if(Object.prototype.toString.call(item) === '[object String]') {
      this.getTutorListApi({type: 2})
          .then(() => {
            this.temTutorLists = this.tutorLists
          })
    } else {
      this.getMenberListsApi({groupId: item.groupId})
          .then(() => {
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
    this['categoryList'].map((field) => {
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
  singleSelection(type, item) {
    this.form[type].tem = item
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   多选
   */
  multipleSelection(type, item) {
    const value = []
    this.menberLists.map(field => {
      if(this.form[type].tem.includes(field.realname)) {
        value.push(field.uid)
      }
    })
    this.form[type].value = value.join(',')
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
    this.$message.error(`${res}~`)
  }
}