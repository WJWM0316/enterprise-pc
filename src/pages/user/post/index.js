import Vue from 'vue'
import Component from 'vue-class-component'
import defaultAvatar from 'IMAGES/img_normal_head.png';
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Cropper from 'cropperjs'

@Component({
  methods: {
    ...mapActions([
      'getGroupListsApi',
      'uploadApi',
      'updateGroupListsApi',
      'getMemberInfosApi'
    ])
  },
  components: {
    ModalDialog
  },
	computed: {
    ...mapGetters([
      'groupLists',
      'memberInfos'
    ]),
    avatarUrl() {
      return this.form.avatarId.tem.smallUrl || defaultAvatar
    }
  },
  props: {
    // 裁剪标题
    tips: {
      type: String,
      default: '头像预览'
    },

    // 按钮文字
    btnTxt: {
      type: String,
      default: '上传封面'
    }
  }
})
export default class userUpdate extends Vue {
  options5 = [
    {
      value: 'HTML',
      label: 'HTML'
    },
    {
      value: 'CSS',
      label: 'CSS'
    },
    {
      value: 'JAVASCRIPT',
      label: 'JAVASCRIPT'
    }
  ]
  value10 = ''
	form = {
    id: '',
    avatarId: {
      tem: {},
      value: '',
      showError: false
    },
    occupation: '',
    email: '',
    wechat: '',
    mobile: '',
    password: '',
    roleId: '',
    contentAdminGroup: {
      tem: [],
      value: '',
      show: false
    },
		name: '',
    groupId: ''
	}
	rules = {
		name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    occupation: [
      { required: true, message: '请选择所属部门', trigger: 'change' }
    ]
	}

	// 初始化裁剪对象
  cropper = null
  // 裁剪设置
  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '确定'
    }
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
  tem_groupLists = []

  created() {
    const params = {id: this.$route.query.id}
    Promise.all(
      [
        this.getGroupListsApi(),
        this.getMemberInfosApi(params)
      ]
    )
    .then((res) => {
      const list = [...this.groupLists]
      list.map(field => {
        field.value = field.groupId
        field.label = field.groupName
      })
      this.tem_groupLists = list
      this.form.id = this.memberInfos.uid
      this.form.avatarId.value = this.memberInfos.avatarId
      this.form.avatarId.tem = this.memberInfos.avatar
      this.form.email = this.memberInfos.email
      this.form.wechat = this.memberInfos.wechat
      this.form.password = this.memberInfos.password
      this.form.occupation = this.memberInfos.occupation
      this.form.name = this.memberInfos.realname
      this.form.mobile = this.memberInfos.mobile
    })
    .catch((err) => {
      this.$message.error('初始化页面失败~')
    })
  }
  change(val) {
    console.log(val)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   打开弹窗model
   */
  openModal(type) {
    switch(type) {
      case 'contentAdminGroup':
        this.models.title = '选择组织'
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
    this.form.contentAdminGroup = data
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
    // const type = this.models.currentModalName
    // this.form[type].value = ''
    // this.form[type].tem = []
    this.models.show = false
    this.ownerUidName = ''
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
      aspectRatio: 1,
      preview: '#cropperRes',
      viewMode: 1
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
    // this.flag.btnTips.value = '正在上传，请稍等'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const roundedCanvas = this.getRoundedCanvas(croppedCanvas)
    const croppedDataUrl = roundedCanvas.toDataURL()
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
        // this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        this.form.avatarId.value = infos.id
        this.form.avatarId.tem = infos.url
        this.form.check_avatarId = infos.id
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

  // 圆型裁剪
  getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    var width = sourceCanvas.width
    var height = sourceCanvas.height
    canvas.width = width
    canvas.height = height
    context.imageSmoothingEnabled = true
    context.drawImage(sourceCanvas, 0, 0, width, height)
    context.globalCompositeOperation = 'destination-in'
    context.beginPath()
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
    context.fill()
    return canvas
  }
}