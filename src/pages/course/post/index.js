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
      value: '',
      tem: [],
      show: false
    },
    startTime: '',
    // 课程所属组织
    check_group_id: '',
    group_id: {
      tem: [],
      value: '',
      show: false
    },
    // 课程封面的id
    check_icon: '',
    icon: {
      value: '',
      tem: '',
      showError: false
    },
    // 课程导师
    check_master_uid: '',
    master_uid: {
      value: '',
      tem: [],
      show: false
    },
    // 课程介绍
    intro: '',
    // 必修学员
    check_members: '',
    members: {
      value: [],
      tem: [],
      show: false
    },
    // 不可见课程成员
    check_hits: '',
    hits: {
      value: [],
      tem: [],
      show: false
    },
    // 课程是否上线 1->上线 0->下线
    status: 1,
    // 权重
    sort: ''
  }

  // 初始化裁剪对象
  cropper = null
  // 裁剪设置
  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '裁剪完成，立即上传'
    }
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
  temMenberLists = []
  temcategoryList = []
  temTutorLists = []
  tem_groupLists = []
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
    // console.log(Date.parse(new Date(this.form.startTime))/ 1000)
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
    // 获取成员列表
    this.getMenberListsApi({name: this.ownerUidName})
      .then(() => {
        this.temMenberLists = [...this.menberLists]
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
    this.temMenberLists = [...this.menberLists]
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
      this.getGroupListsApi(),
      this.getMenberListsApi(),
      this.getCategoryListsApi(),
      this.getTutorListApi({type: 1})
    ])
    .then(() => {
      this.temMenberLists = [...this.menberLists]
      this.temcategoryList = [...this.categoryList]
      this.temTutorLists = [...this.tutorLists]
      this.tem_groupLists = [...this.groupLists]
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
        this.getGroupListsApi(),
        this.getCategoryListsApi(),
        this.getTutorListApi()
      ]
    )
    .then((res) => {
      const courseDetail = this.courseDetail
      this.form.id = courseDetail.id
      this.form.title = courseDetail.title
      this.form.intro = courseDetail.intro
      this.form.sort = courseDetail.sort
      this.form.status = courseDetail.status === '上线' ? 1 : 0
      this.form.icon.value = courseDetail.icon
      this.form.icon.tem = courseDetail.coverImg
      this.form.check_icon = courseDetail.icon
      this.ContentEditor.content = courseDetail.intro
      this.temcategoryList = [...this.categoryList]
      this.temMenberLists = [...this.menberLists]
      this.temcategoryList = [...this.categoryList]
      this.temTutorLists = [...this.tutorLists]
      this.tem_groupLists = [...this.groupLists]

      // 组织的遍历
      this.groupLists.map(field => {
        if(this.courseOrganizations.includes(field.groupId)) {
          this.form.group_id.value += '' + field.groupId
          this.form.group_id.tem.push(field)
          this.form.group_id.show = true
          this.form.check_group_id += '' + field.groupId
        }
      })

      // 导师的遍历
      this.tutorLists.map(field => {
        if(field.uid === courseDetail.masterUid) {
          this.form.master_uid.value = field.uid
          this.form.master_uid.tem = field
          this.form.master_uid.show = true
          this.form.check_master_uid = field.uid
        }
      })

      // 分类的遍历
      this.categoryList.map(field => {
        if(field.categoryId === this.courseCategory.id) {/*   */
          this.form.category_id.value = field.categoryId
          this.form.category_id.tem.push(field)
          this.form.category_id.show = true
          this.form.check_category_id = field.categoryId
        }
      })

      // 学员的遍历
      this.menberLists.map(field => {
        if(this.coursePeaple.includes(field.uid)) {
          this.form.members.value.push(field.uid)
          this.form.members.tem.push(field.realname)
          this.form.members.show = true
          this.form.check_members +=  field.uid
        }
        if(this.coursePeapleHits.includes(field.uid)) {
          this.form.hits.value.push(field.uid)
          this.form.hits.tem.push(field.realname)
          this.form.hits.show = true
          this.form.check_hits += '' + field.uid
        }
      })
      this.form.members.value = this.form.members.value.join(',')
      this.form.hits.value = this.form.hits.value.join(',')
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
    this.form[type].show = this.form[type].value ? true : false
    this.models.show = false
    this.ownerUidName = ''
    this.form[`check_${type}`] = this.form[type].value
    if(this.rules[`check_${type}`]) {
      this.$refs.form.validateField(`check_${type}`)
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗关闭按钮
   */
  cancel() {
    const type = this.models.currentModalName
    // this.form[type].value = ''
    // this.form[type].tem = []
    this.models.show = false
    this.ownerUidName = ''
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
  removeMultipleCheck(type, index) {
    const value = this.form[type].value.split(',').splice(index, 1)
    this.form[type].tem.splice(index, 1)
    this.form[type].value = value.join(',')
    this.form[type].show = this.form[type].tem <= 0 ? false : true
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   * @return   {[type]}      [description]
   */
  filterWorkZoneMenber(type, id) {
    let menberLists = [...this.menberLists]
    menberLists = menberLists.filter(field => {
      return field.selfGroup.includes(id)
    })
    this.temMenberLists = menberLists
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   导师分类
   * @return   {[type]}   [description]
   */
  tutorClassification(type, item) {
    let list = [...this.tutorLists]
    list = Object.prototype.toString.call(item) === '[object String]' 
        ? list.filter(field => { return !field.group })
        : list.filter(field => { return field.group && field.selfGroup.includes(item.groupId) })
    this.temTutorLists = list
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   选择分类
   * @return   {[type]}   [description]
   */
  selectCategory(item, key) {
    this.updateCategoryListsApi({categoryId: item.categoryId})
    const data = { show: false, tem: [], value: [] }
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.categoryId)
      }
    })
    data.value = data.value.join(',')
    this.form.category_id = data
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择课程组织
   * @return   {[type]}   [description]
   */
  seleteGroup(item, key) {
    this.updateGroupListsApi({groupId: item.groupId})
    const data = { show: false, tem: [], value: [] }
    this[key].map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    this.form.group_id = data
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
   * @DateTime 2018-09-11
   * @detail   成员分类
   * @return   {[type]}   [description]
   */
  memberClassification(type, groupId) {
    const tem = []
    const value = []
    const data = {
      tem: [],
      value: []
    }
    let menberLists = [...this.menberLists]
    menberLists.map(field => {
      if(field.selfGroup.includes(groupId)) {
        data.tem.push(field.realname)
        data.value.push(field.uid)
      }
    })
    if(groupId === 'all') {
      menberLists.map(field => {
        data.tem.push(field.realname)
        data.value.push(field.uid)
      })
    }
    data.value = data.value.join(',')
    this.form[type] = data
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
                this.temcategoryList = [...this.categoryList]
              })
        })
        .catch(err => {
          this.categoryModal.loading = false
          this.categoryModal.show = false
          this.$message.error(`${err.msg}~`)
        })
  }
  /**
   * 用户点击头像
   */
  onSelectFile() {
    const el = this.$refs.hiddenFile
    if (!el) return
    el.click()
    el.value = ''
  }

  /**
   * 用户选择好文件了
   * @param  {Event} e  文件改变事件
   */
  onFileChange(e) {
    const files = e.target.files
    const len = files.length
    const fileName = files[0].name
    const ext = this.getFileExt(fileName)
    this.flag.file = files[0]

    // 允许上传文件尺寸上限 1M
    const ALLOW_MAX_SIZE = 1024 * 1024

    // 允许文件格式 jpg\png
    const ALLOW_FILE_TYPE = [
      'png',
      'jpeg',
      'jpg'
    ]

    // 文件数量一定要判断
    if (len > 0) {
      const file = files.item(0)
      if (ALLOW_FILE_TYPE.indexOf(ext) === -1) {
        this.$message.error('选择的文件格式不对~')
      } else if (file.size > ALLOW_MAX_SIZE) {
        this.$message.error('选择的文件太大啦~')
      } else {
        let inputImage = document.querySelector('#uplaod-file')
        let URL = window.URL || window.webkitURL
        let blobURL
        blobURL = URL.createObjectURL(file)
        this.flag.imgHasLoad = true

        if (!this.flag.cropperHasInit) {
          this.loadCropper()
          this.cropper.replace(blobURL)
          return
        }
        this.cropper.reset().replace(blobURL)
        inputImage.value = null
      }
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   加载裁剪工具
   * @return   {[type]}   [description]
   */
  loadCropper() {
    const image = document.querySelector('#cropperBox > img')
    // const preview = document.querySelector('#cropperRes')
    // const previewImage = preview.getElementsByTagName('img').item(0)
    const options = {
      aspectRatio: 1 / 1,
      preview: '#cropperRes'
    }
    this.cropper = new Cropper(image, options)
    this.flag.cropperHasInit = true
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   完成裁剪，并输出裁剪结果，然后上传
   * @return   {[type]}   [description]
   */
  finishCropImage() {
    this.flag.btnTips.value = '正在上传，请稍等'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL()
    const blob = this.dataURLtoFile(croppedDataUrl)
    const formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img1', blob)
    this.uploadApi(formData)
      .then((res) => {
        const infos = res.data.data[0]
        this.cropper.destroy()
        this.flag.imgHasLoad = false
        this.flag.imgHasLoad = false
        this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        this.form.icon.value = infos.id
        this.form.icon.tem = infos.url
        this.form.check_icon = infos.id
        this.$refs.form.validateField('check_icon')
      })
      .catch(err => {
        this.$message.error(`${err.msg}~`)
      })
  }

  // dataUrl 转 blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-13
   * @detail   将base64转换成file对象
   * @return   {[type]}            [description]
   */
  dataURLtoFile (dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {type: mime})
  }

  // 获取文件后缀名
  getFileExt(filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
}