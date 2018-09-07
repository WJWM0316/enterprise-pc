import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import Cropper from 'cropperjs'
import {  editorRules } from 'CONFIGS/rules'

@Component({
  components: {
    ModalDialog,
    Editor
  },
  /* eslint-disable */
  methods: {
    ...mapActions(['getJobCircleMemberLists', 'postJobCircle', 'showMsg'])
  },
  computed: {
    ...mapGetters(['userInfos'])
  },
  /* eslint-enable */
})
export default class WorkZonePost extends Vue {

  // form = {
  //   // 工作圈名
  //   name: '',
  //   // 工作圈主用户ID
  //   owner_uid: '',
  //   // 课程所属组织
  //   organizations: '',
  //   // 工作圈封面的id
  //   cover_img_id: '',
  //   // 工作圈成员
  //   members: '',
  //   // 请填写工作圈介绍
  //   content: '',
  //   // 不可见工作圈成员
  //   hits: '',
  //   // 课程是否上线 1->上线 0->下线
  //   status: 1,
  //   // 权重
  //   sort: ''
  // }

  cropper = null

  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '裁剪完成，立即上传'
    }
  }

  companyLogoUrl = ''

  form = {
    // 工作圈名
    name: '测试' + parseInt(Math.random() * 10 + 1),
    // 工作圈主用户ID
    owner_uid: '1',
    // 课程所属组织
    organizations: '2',
    // 工作圈封面的id
    cover_img_id: '3',
    // 工作圈成员
    members: '4',
    // 请填写工作圈介绍
    content: '你好啊',
    // 不可见工作圈成员
    hits: '5',
    // 课程是否上线 1->上线 0->下线
    status: 1,
    // 权重
    sort: '10'
  }

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
    contentTitle: '',
    content: '',
    showClose: true,
    confirmText: '提交',
    currentModalName: ''
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

  // 课程列表
  courseTypeList = []
  // 导师列表
  tutorList = []
  // 组织列表
  organizationsList = []
  // 必修成员列表
  menberCompulsoryList = []
  // 不可见成员列表
  menberInvisibleList = []

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
    this.postJobCircle(params)
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
      { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
      { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
      { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
      { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
      { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
      { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
      { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
      { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
      { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
      { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
      { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
      { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
      { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
      { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
      { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
      { "value": "枪会山", "address": "上海市普陀区棕榈路" },
      { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
      { "value": "钱记", "address": "上海市长宁区天山西路" },
      { "value": "壹杯加", "address": "上海市长宁区通协路" },
      { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
      { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
      { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
      { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
      { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
      { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
      { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
      { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
      { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
      { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
      { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
      { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
      { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
      { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
      { "value": "浏阳蒸菜", "address": "天山西路430号" },
      { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
      { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
      { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
      { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
      { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
      { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
      { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
      { "value": "阳阳麻辣烫", "address": "天山西路389号" },
      { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
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
    for(let i = 0; i < 30; i++) {
      this.courseTypeList.push({
        label: `课程`,
        value: i
      })
      this.tutorList.push({
        label: `导师`,
        value: i
      })
      this.organizationsList.push({
        label: `组织`,
        value: i
      })
      this.menberCompulsoryList.push({
        label: `成员`,
        value: i
      })
      this.menberInvisibleList.push({
        label: `成员`,
        value: i
      })
    }
  }

  //  打开弹窗model
  openModal(type) {
    switch(type) {
      case 'owner_uid':
        this.models.title = '选择圈主'
        this.models.currentModalName = 'owner_uid'
        break
      case 'members':
        this.models.title = '选择成员'
        this.models.currentModalName = 'members'
        break
      case 'organizations':
        this.models.title = '选择组织'
        this.models.currentModalName = 'organizations'
        break
      case 'menberCompulsory':
         this.models.title = '选择必修学员'
         this.models.currentModalName = 'menberCompulsory'
        break
      case 'menberInvisible':
        this.models.title = '选择不可见成员'
        this.models.currentModalName = 'menberInvisible'
        break
      default:
        break
    }
    this.models.show = true
  }

  // 出发弹窗按钮
  confirm() {
    switch(this.models.currentModalName) {
      case 'courseType':
        this.form.courseType = this.selectedModal.courseType
        break
      case 'tutor':
        this.form.tutor = this.selectedModal.tutor
        break
      case 'organizations':
        this.form.organizations = this.selectedModal.organizations
        break
      case 'menberCompulsory':
        this.form.menberCompulsory = this.selectedModal.menberCompulsory
        break
      case 'menberInvisible':
        this.form.menberInvisible = this.selectedModal.menberInvisible
        break
      default:
        break
    }
    this.models.show = false
  }

  todoAction(type) {}

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