import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import {  editorRules } from 'FILTERS/rules'
import Cropper from 'cropperjs'

@Component({
  components: {
    ModalDialog,
    Editor
  },
  methods: {
    ...mapActions(['showMsg'])
  }
})
export default class coursePost extends Vue {

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

  form = {
    // 课程名
    courseName: '',
    // 课程分类
    classification: '',
    // 课程类型
    courseType: '',
    introduction: '',
    // 课程导师
    tutor: '',
    // 课程是否上线 1->上线 0->下线
    online: 1,
    // 课程所属组织
    organization: '',
    // 必修学员
    menberCompulsory: '',
    // 不可见成员
    menberInvisible: '',
    // 排序
    sort: ''
  }

  rules = {
    courseName: [
      { required: true, message: '请输入活动名称', trigger: 'blur' }
    ],
    classification: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    introduction: [
      { required: true, message: '请填写社区介绍', trigger: 'click', validator: editorRules.validator }
    ],
    courseType: [
      { required: true, message: '请选择课程分类', trigger: 'blur' }
    ],
    tutor: [
      { required: true, message: '请选择导师', trigger: 'blur' }
    ],
    organization: [
      { required: true, message: '请选择组织', trigger: 'blur' }
    ]
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    width: '670px',
    minHeight: '284px',
    type: 'confirm'
  }

  // 社区介绍富文本编辑器
  ContentEditor = {
    content: '',
    // path: `${config.host}/admin/common/editor/uploadImg`,
    height: 350
  }

  selectedModal = {
    courseType: '',
    tutor: '',
    organizations: [],
    menberCompulsory: [],
    menberInvisible: []
  }

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '立即创建'
  restaurants = []
  timeout =  null
  checkList = []
  visible2 = false
  // 是否显示创建课程类型的弹窗
  showCreateCourseTypeBox = false
  courseType = ''

  // 课程列表
  courseTypeList = [
  	{
  		value: '1',
  		label: '产品'
  	},
  	{
  		value: '2',
  		label: '运营'
  	},
  	{
  		value: '3',
  		label: '开发'
  	},
  	{
  		value: '4',
  		label: '设计'
  	},
  	{
  		value: '5',
  		label: '人力资源'
  	},
  	{
  		value: '6',
  		label: '技术'
  	},
  	{
  		value: '7',
  		label: '商务BD'
  	}
  ]
  // 导师列表
  tutorList = []
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
  // 必修成员列表
  menberCompulsoryList = []
  // 不可见成员列表
  menberInvisibleList = []

  // 检测是否可以提交
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'
        // 需要提交的参数的key值
        const required = []
        // 过滤不需要提交的参数
        const params = Object.keys(this.form).map(field => {
          if (required.includes(field)) {
            params[field] = this.form[field]
          }
        })
        this.submit(params)
      }
    })
  }

  // 提交表单数据
  submit() {}

  handleContentEditorBlur() {
    this.$refs.form.validateField('introduction')
  }

  loadAll() {
    return [
      { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' }
    ]
  }

  // 防抖函数
  debounce(queryString, cb) {
    const restaurants = this.restaurants
    const results = queryString ? restaurants.filter(this.handleSearch(queryString)) : restaurants

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      cb(results)
    }, 3000 * Math.random())
  }

  // 获取搜索数据
  handleSearch(queryString) {
    return (state) => {
      return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    }
  }

  // 选择搜索到的数据
  handleSelect(type) {}

  mounted() {
    this.restaurants = this.loadAll()
  }

  //  打开弹窗model
  openModal(type) {
  	switch(type) {
  		case 'courseType':
  			this.models.title = '选择分类'
  			this.models.currentModalName = 'courseType'
  			this.models.width = '670px'
  			this.models.minHeight = '284px'
  			break
  		case 'tutor':
  			this.models.title = '选择导师'
  			this.models.currentModalName = 'tutor'
  			this.models.width = '860px'
  			this.models.minHeight = '635px'
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
  			this.models.width = '860px'
  			this.models.minHeight = '635px'
  			break
  		case 'menberInvisible':
  			this.models.title = '选择不可见成员'
  			this.models.currentModalName = 'menberInvisible'
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

  // 移除选中
  removeCheck() {}

  // 添加课程分类
  addCourseType() {
    console.log(111111)
  	const courseTypeList = this.courseTypeList
    console.log(courseTypeList)
  	const bool = courseTypeList.some(field => {
  		return field.label  === this.courseType
  	})
  	if(bool) {
  		this.showMsg({ content: '请不要重复添加~', type: 'error', duration: 3000 })
  	}
  	// this.showCreateCourseTypeBox = !this.showCreateCourseTypeBox
  }

  setType() {}

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