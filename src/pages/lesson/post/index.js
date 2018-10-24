import Vue from 'vue'
import Component from 'vue-class-component'
import Editor from 'COMPONENTS/editor'
import { getAccessToken } from '@/store/cacheService'
import { upload_api } from '@/store/api/index.js'
import { postLessonApi, getLessonEditApi, lessonEditApi } from '@/store/api/lesson.js'

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
      { required: true, validator: this.validatorBlank,  trigger: 'blur' }
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
    status: '',
    hintTxt:'设置本节打卡任务，员工将需要按任务要求完成打卡，才算正式学完本节并解锁下一节。也可以不设置本节打卡任 务，员工通过自由发布打卡内容来解锁下一节课。',
    params: {
      token: getAccessToken(),
      attach_type: 'img',
    }
  }

  // 文件上传
  fileUpload = {
    action: upload_api,
    list: [],
    limit: 2,
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

  // 编辑id
  lessonId = ''

  nowLoadUid = ''

  //验证---start
  validatorBlank(rule, value, callback){
    let val = value.replace(/(^\s*)|(\s*$)/g, "")
    if (val.length === 0) {
      callback(new Error('请填写课节标题'));
    } else if(val.length > 25) {
      callback(new Error('课节标题必须填写，最多25字'));
    }else {
      callback();
    }
  }

  //验证---end
  created() {
    this.action = this.$route.name === 'lessonAdd' ? 'add' : 'edit'
    this.form.course_id = this.$route.query.course_id
    if(this.action === 'add'){
      this.initPageByPost()
    }else {
      //编辑
      this.lessonId = this.$route.query.id
      this.initPageByUpdate()
    }
  }

  imgOp(index){
      this.imageUpload.list.splice(index,1)
  }

  toLessonList(){
    this.$router.push(
      { name: 'lessonList',
        query: {
          course_id: this.form.course_id
        }
      }
    )
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

  // 检测是否可以提交
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'

        // img id
        if(this.imageUpload.list.length>0){
          let imgListId = ''
          this.imageUpload.list.map(function(value,index){
              imgListId+=value.id+'-'
          })
          this.form.punch_card_img = imgListId.slice(0,imgListId.length-1)
        }
        // 需要提交的参数的key值
        const required = ['course_id','title','status','punch_card_title','punch_card_img']
        let av_id = this.form.av_id
        if(av_id>0){
          required.push('av_id')
        }

        if(this.form.details !== '<p><br></p>' && this.form.details.length>0){
            required.push('details')
        }

        // 过滤不需要提交的参数
        const params = this.transformData(this.form, required)
        this.submit(params)
      }
    })
  }

  // 提交表单数据
  submit(params) {
    let that = this
    let obj = {
      suc: function(res){
        that.$message({
          message: '成功',
          type: 'success'
        })

        setTimeout(() => {
          that.$router.go(-1)
          that.submitBtnClick = !that.submitBtnClick
          that.submitBtnTxt = '提交'
        }, 3000)
      },
      catch:function(err){
        setTimeout(() => {
          that.submitBtnClick = !that.submitBtnClick
          that.submitBtnTxt = '提交'
        }, 3000)
        if(err.data.msg){
          that.$message.error(err.data.msg);
        }
      },
    }
    params.title = params.title.replace(/(^\s*)|(\s*$)/g, "")

    if(this.action === 'add'){
      postLessonApi(params)
      .then(res => {
        obj.suc(res)
      },res=>{
        obj.catch(res)
      })
      .catch(err => {
        obj.catch(res)
      })
    }else {
      params.lessonId = this.lessonId
      lessonEditApi(params)
      .then(res => {
        obj.suc(res)
      },res=>{
        obj.catch(res)
      })
      .catch(err => {
        obj.catch(err)
      })
    }
  }

  handleContentEditorBlur() {
    this.$refs.form.validateField('content')
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-1ž
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   编辑时初始化页面
   * @return   {[type]}   [description]
   */
  initPageByUpdate() {
    getLessonEditApi({id: this.lessonId}).then(res=>{

      let msg = res.data.data

      msg.punchCardCImgInfo.map(function(value,index){
        value.show = false
      })
      
      this.imageUpload.list = msg.punchCardCImgInfo
      this.ContentEditor.content = msg.details
      if(msg.av){
        this.fileUpload.infos.name = msg.av.fileName
        this.fileUpload.status = 'success'
        this.fileUpload.progress = 100
        this.fileUpload.progressText = ''
        this.fileUpload.btnTxt = '重新上传'
        this.fileUpload.show = true
      }
      this.form = {
        course_id: msg.courseSectionId, // 课程id
        title: msg.title, // 课节标题
        details:  msg.details, // 内容详情
        punch_card_title:  msg.punchCardTitle, // 打卡题目
        punch_card_img:  msg.punch_card_img, // 打卡图片
        status:  msg.status // 状态：0下线，1上线
      }

      if(msg.avId>0){
        //音视频id
        this.form.av_id = msg.avId
      }
    })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   图片上传成功
   * @return   {[type]}   [description]
   */
  handleImageSuccess(res) {
    res.data[0].show = false
    this.imageUpload.list.push(res.data[0])
    this.imageUpload.status = 'success'
  }

  handleImageError(res) {
    this.imageUpload.status = 'error'
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   图片上传之前的处理
   * @return   {[type]}   [description]
   */
  beforeImageUpload(file) {
    const isLt20M = file.size / 1024 / 1024 < 20;
    if(!isLt20M){
      this.$message.error('上传图片大小不能超过 20MB!');
    }else {
      this.imageUpload.status = 'loading'
    }

    return isLt20M
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   文件上传成功
   * @return   {[type]}   [description]
   */
  handleFileSuccess(res) {
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
    const isLt100M = file.size / 1024 / 1024 < 100;
    if(!isLt100M){
      this.$message.error('上传文件大小不能超过 100MB!');
    }else {
      this.fileUpload.status = 'loading'
      this.fileUpload.progress = 0
      this.fileUpload.progressText = '上传中'

      this.nowLoadUid = file.uid
      this.fileUpload.infos = file
      this.fileUpload.show = true
      this.fileUpload.btnTxt = '重新上传'
      this.fileUpload.params.attach_type = file.type.split('/')[0]
    }

    return isLt100M
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   上传进度
   * @return   {[type]}   [description]
   */
  uploadFileProcess(event, file, fileList){
    this.fileUpload.progress = file.percentage.toFixed(0)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   文件上传失败
   * @return   {[type]}   [description]
   */
  handleFileError(err, file, fileList) {
    this.fileUpload.status = 'error'
    this.fileUpload.progress = 0
    this.fileUpload.progressText = '上传失败'
    this.fileUpload.btnTxt = '重新上传'
    this.showMsg({ content: `上传失败 ~`, type: 'error', duration: 3000 })
  }


  removeVideo(){
    this.fileUpload.show = false
    this.fileUpload.btnTxt = '选择文件'
    this.fileUpload.progress = 0
    this.fileUpload.status = 'processing'
    this.fileUpload.progressText = ''

    this.$refs.file.abort()
    this.form.av_id = ''
  }
}