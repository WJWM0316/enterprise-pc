import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from 'COMPONENTS/editor'
import { getAccessToken } from '@/store/cacheService'
import { upload_api } from '@/store/api/index.js'
import { postLessonApi } from '@/store/api/lesson.js'

@Component({
  components: {
    Editor
  },
  methods: {
    ...mapActions([
      'showMsg',
      'uploadApi'
    ])
  },
  computed: {
    ...mapGetters([])
  }
})
export default class WorkZonePost extends Vue {

  // 提交的表单字段
  form = {
    course_id: '', // 课程id
    title: '', // 课节标题
    av_id: '', // 音视频id
    details: '', // 内容详情
    punch_card_title: '', // 打卡题目
    punch_card_img: '', // 打卡图片
    status: 1 // 状态：0下线，1上线
  }

  // 验证规则
  rules = {
    title: [
      { required: true, message: '请填写课节标题', trigger: 'blur' }
    ]
  }

  // 图片上传
  imageUpload = {
    action: upload_api,
    list: [],
    limit: 9,
    accept: '.png,.jpg',
    tips: 'JPG、PNG格式，最多可上传9张',
    btnTxt: '选择图片',
    hintTxt: '设置本节打卡任务，员工将需要按任务要求完成打卡，才算正式学完本节并解锁下一节。也可以不设置本节打卡任 务，员工额通过自由发布打卡内容来解锁下一节课。', 
    params: {
      token: getAccessToken(),
      attach_type: 'img',
    }
  }

  // 文件上传
  fileUpload = {
    action: upload_api,
    list: [],
    limit: 1,
    accept: '.mp4, .mp3',
    progress: 0,
    tips: '格式支持mp3、mp4',
    btnTxt: '选择文件',
    progressText: '上传中',
    params: {
      token: getAccessToken(),
      attach_type: '',
    },
    status: 'processing',
    infos: {},
    show: false
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

  // 状态。编辑或者添加
  action = ''
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

  // 检测是否可以提交
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'
        // 需要提交的参数的key值
        const required = ['course_id','title','status','punch_card_title','details','av_id']
        // 过滤不需要提交的参数
        console.log(this.form)
        const params = this.transformData(this.form, required)
        this.submit(params)
      }
    })
  }

  // 提交表单数据
  submit(params) {
    console.log(params)
    let that = this
    postLessonApi(params)
      .then(res => {
        that.models.show = true
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

  created() {
    this.action = this.$route.name === 'lessonAdd' ? 'add' : 'edit'
    this.form.course_id = 1

    console.log(this.$route)

    if(this.action === 'add'){
      this.initPageByPost()
    }else {
      this.initPageByUpdate()
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {}
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   编辑时初始化页面
   * @return   {[type]}   [description]
   */
  initPageByUpdate() {}

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   图片上传成功
   * @return   {[type]}   [description]
   */
  handleImageSuccess(res) {
    console.log(res)
    this.imageUpload.list.push(res.data[0].id)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   图片上传之前的处理
   * @return   {[type]}   [description]
   */
  beforeImageUpload(file) {}

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   文件上传成功
   * @return   {[type]}   [description]
   */
  handleFileSuccess(res) {
    console.log(res)
    this.form.av_id = res.data[0].id

    this.fileUpload.status = 'success'
    this.fileUpload.progress = 100
    this.fileUpload.progressText = '上传成功'
    this.fileUpload.btnTxt = '重新上传'
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   文件上传之前的处理
   * @return   {[type]}   [description]
   */
  beforeFileUpload(file) {
    this.fileUpload.infos = file
    this.fileUpload.show = true
    this.fileUpload.btnTxt = '重新上传'
    this.fileUpload.params.attach_type = file.type.split('/')[0]
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   上传进度
   * @return   {[type]}   [description]
   */
  uploadFileProcess(event, file, fileList){
    this.fileUpload.progress = file.percentage.toFixed(0)
    console.log(file.percentage.toFixed(0))
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   文件上传失败
   * @return   {[type]}   [description]
   */
  handleFileError(err, file, fileList) {
    const { msg } = JSON.parse(err.message)
    this.showMsg({ content: `${msg}~`, type: 'error', duration: 3000 })
    this.fileUpload.status = 'error'
    this.fileUpload.progress = 0
    this.fileUpload.progressText = '上传失败'
    this.fileUpload.btnTxt = '重新上传'
  }
}