import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import Cropper from 'cropperjs'
import {  editorRules } from 'FILTERS/rules'

@Component({
  components: {
    ModalDialog,
    Editor
  },
  methods: {
    ...mapActions([
      'getJobCircleMemberListsApi',
      'postJobCircleApi',
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'jobCircleMemberLists',
      'menberLists'
    ])
  }
})
export default class WorkZonePost extends Vue {

  form = {
    // 工作圈名
    name: '',
    // 工作圈主用户ID
    owner_uid: {
      value: '',
      tem: {}
    },
    // 课程所属组织
    organizations: [],
    // 工作圈封面的id
    cover_img_id: '',
    // 工作圈成员
    members: {
      value: '',
      tem: {}
    },
    // 请填写工作圈介绍
    content: '',
    // 不可见工作圈成员
    hits: '',
    // 课程是否上线 1->上线 0->下线
    status: 1,
    // 权重
    sort: ''
  }
  cropper = null

  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '裁剪完成，立即上传'
    }
  }

  companyLogoUrl = 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg'

  rules = {
    name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' }
    ],
    owner_uid: [
      { required: true, message: '请选择工作圈主用户ID', trigger: 'blur' }
    ],
    organizations: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ],
    cover_img_id: [
      { required: true, message: '请上传工作圈封面图片', trigger: 'blur' }
    ],
    members: [
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
    content: '你好啊',
    // path: `${config.host}/admin/common/editor/uploadImg`,
    height: 350
  }

  selectedModal = {
    name: '',
    tutor: '',
    organizations: [],
    menberCompulsory: [],
    hits: []
  }

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'
  restaurants = []
  timeout =  null
  checkList = []
  temMenberLists = []

  // 课程列表
  courseTypeList = []
  // 导师列表
  tutorList = []
  // 组织列表
  organizationsList = []
  // 必修成员列表
  menberCompulsoryList = []
  // 不可见成员列表
  hitsList = []
  selectItem = {
    value: '',
    label: ''
  }
  // 组织列表
  organizationsList = [
  	{
  		value: '1',
  		label: '产品组'
  	},
  	{
  		value: '2',
  		label: '运营组'
  	},
  	{
  		value: '3',
  		label: '开发组'
  	},
  	{
  		value: '4',
  		label: '设计组'
  	},
  	{
  		value: '5',
  		label: '人力资源组'
  	},
  	{
  		value: '6',
  		label: '技术组'
  	},
  	{
  		value: '7',
  		label: '商务BD组'
  	}
  ]

  // 检测是否可以提交
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'
        this.submit(this.form)
      }
    })
  }

  // 提交表单数据
  submit(params) {
    this.postJobCircleApi(params)
      .then(res => {
        this.showMsg({ content: '创建直播成功~', type: 'success', duration: 3000 })
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
      .catch(err => {
        this.showMsg({ content: `${err.msg}~`, type: 'error', duration: 3000 })
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
  }

  handleContentEditorBlur() {
    this.$refs.form.validateField('content')
  }

  loadAll() {
    return [
      { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
    ]
  }

  debounce1(func, wait) {
    var timeout
    return () => {
      var context = this
      var args = arguments
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }

  // 选择搜索到的数据
  search(type) {}

  created() {
    this.restaurants = this.loadAll()
    this.getGroupListsApi()
    // 获取所有成员列表
    this.getMenberListsApi({selectAll: 1})
      .then(() => {
        this.temMenberLists = [...this.menberLists]
      })
  }

  // 打开弹窗model
  openModal(type) {
  	switch(type) {
  		case 'owner_uid':
  			this.models.title = '选择圈主'
  			this.models.currentModalName = 'owner_uid'
  			this.models.width = '670px'
  			this.models.minHeight = '284px'
  			break
  		case 'members':
  			this.models.title = '选择成员'
  			this.models.currentModalName = 'members'
  			this.models.width = '670px'
  			this.models.minHeight = '284px'
  			break
  		case 'organizations':
  			this.models.title = '选择组织'
  			this.models.currentModalName = 'organizations'
  			this.models.width = '670px'
  			this.models.minHeight = '284px'
  			break
  		case 'menberCompulsory':
  			this.models.title = '选择必修学员'
  			this.models.currentModalName = 'menberCompulsory'
  			this.models.width = '670px'
  			this.models.minHeight = '284px'
  			break
  		case 'hits':
  			this.models.title = '选择不可见成员'
  			this.models.currentModalName = 'hits'
  			this.models.width = '860px'
  			this.models.minHeight = '635px'
  			break
  		default:
  			break
  	}
  	this.models.show = true
  }

  // 出发弹窗按钮
  confirm() {
    this.models.show = false
  }

  todoAction(type) {}

  // 移除选中
  removeCheck() {}

  setType() {}

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   * @return   {[type]}      [description]
   */
  filterWorkZoneMenber(item) {
    let menberLists = [...this.menberLists]
    menberLists = menberLists.filter(field => {
      return field.selfGroup.includes(item.id)
    })
    this.temMenberLists = menberLists
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   选择工作圈成员
   * @return   {[type]}        [description]
   */
  selectWorkZoneMenber(item) {
    console.log(item)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   单选
   * @return   {[type]}        [description]
   */
  singleSelection(type, item) {
    this.form[type].tem = item
    console.log(this.form[type])
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   多选
   */
  multipleSelection(type, item) {
    // this.form[type].tem = item
    console.log(this.form[type])
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   获取工作圈成员
   * @return   {[type]}   [description]
   */
  getJobCircleMemberLists(id) {
    this.getJobCircleMemberListsApi({id})
      .then(res => {
        console.log(this.jobCircleMemberLists, 'jobCircleMemberLists')
      })
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
    // this.showCreateCourseTypeBox = !this.showCreateCourseTypeBox
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
  /* eslint-disable */
  onFileChange(e) {
    const files = e.target.files
    const len = files.length
    const fileName = files[0].name
    const ext = this.getFileExt(fileName)

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
        this.showMsg({ content: '选择的文件格式不对~', type: 'error', duration: 10000 })
      } else if (file.size > ALLOW_MAX_SIZE) {
        this.showMsg({ content: '选择的文件太大啦~', type: 'error', duration: 10000 })
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

  loadCropper() { //加载裁剪工具
    const image = document.querySelector('#cropperBox > img')
    const preview = document.querySelector('#cropperRes')
    const previewImage = preview.getElementsByTagName('img').item(0)
    const options = {
      aspectRatio: 1 / 1,
      preview: '#cropperRes'
    }
    this.cropper = new Cropper(image, options)
    this.flag.cropperHasInit = true
  }

  finishCropImage() {//完成裁剪，并输出裁剪结果，然后传到七牛
    this.flag.btnTips.value = '正在上传，请稍等'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL()

    const blob = this.dataURLtoBlob(croppedDataUrl)

    // 每次更新头像都要获取一次 token
    this.getUploadToken()
      .then(() => {
        const formData = new FormData()
        formData.append('token', this.qiniu.token)
        formData.append('key', this.qiniu.key)
        formData.append('file', blob)
        return this.uploadAvatar(formData)
      })
      .then(uploadResponse => {
        return this.updateAvatar({
          avatar: uploadResponse.data.url,
        })
      })
      .then(updateResponse => {
        this.cropper.destroy()
        this.flag.imgHasLoad = false
        this.flag.imgHasLoad = false
        this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        return updateResponse
      })
      .catch(err => {
        this.showMsg({ content: '更换头像失败~', type: 'error', duration: 10000 })
      })
  }

  // dataUrl 转 blob
  dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  // 获取文件后缀名
  getFileExt(filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
}