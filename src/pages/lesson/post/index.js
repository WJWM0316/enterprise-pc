import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from 'COMPONENTS/editor'

@Component({
  components: {
    Editor
  },
  methods: {
    ...mapActions([
      'showMsg'
    ])
  },
  computed: {
    ...mapGetters([])
  }
})
export default class WorkZonePost extends Vue {

  form = {
    course_id: '', // 课程id
    title: '', // 课节标题
    av_id: '', // 音视频id
    datails: '', // 内容详情
    punjch_card_title: '', // 打卡题目
    punjch_card_img: '', // 打卡图片
    status: 1 // 状态：0下线，1上线
  }

  rules = {
    title: [
      { required: true, message: '请输入活动名称', trigger: 'blur' }
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
  restaurants = []
  timeout =  null
  temMenberLists = []
  fileList = [
    {
      name: 'food.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    },
    {
      name: 'food2.jpeg',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    }
  ]
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
  // 提交表单数据
  submit(params, action) {
    console.log(11)
  }

  handleContentEditorBlur() {
    this.$refs.form.validateField('content')
  }

  created() {
    this.initPageByPost()
    this.initPageByUpdate()
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

  submitUpload() {
    this.$refs.upload.submit();
  }

  handleRemove(file, fileList) {
    console.log(file, fileList)
  }

  handlePreview(file) {
    console.log(file)
  }
}