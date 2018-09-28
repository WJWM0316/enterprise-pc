import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import { getAccessToken } from '@/store/cacheService'
import { upload_api } from '@/store/api/index.js'
import { editorRules } from 'FILTERS/rules'
import { getGroupListApi, addMemberApi, editMemberApi, deleteMemberApi ,getMemberInfoApi } from 'STORE/api/organization.js'

@Component({
  components: {
    ModalDialog,
  },
  methods: {
    ...mapActions([
      'showMsg',
    ])
  },
  computed: {
  },
  watch: {
    '$route': {
      handler() {
        this.init()
      },
      immediate: true
    }
  }
})
export default class WorkZonePost extends Vue {
  // 图片上传
  imageUpload = {
    action: upload_api,
    list: [],
    limit: 9,
    accept: '.png,.jpg',
    //tips: 'JPG、PNG格式',
    btnTxt: '上传头像',
    params: {
      token: getAccessToken(),
      attach_type: 'img',
    }
  }

  form = {
    // 姓名
    name: '',
    // 用户头像
    avatarId: '',
    // 所属部门 分组ID
    groupId: '',
    // 职位
    occupation: '',
    //邮箱
    email: '',
    // 微信号
    wechat: '',
    //手机号
    mobile: '',
    // 密码
    password: '',
    // 角色ID
    roleId: '',

    group_id: {
      value: '',
      tem: [],
      show: false
    },
    contentAdminGroup: ''
  }

  rules = {
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' }
    ],
    groupId: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    occupation: [
      { required: true, message: '请输入密码', trigger: 'blur'}
    ],
    email: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur'}
    ],
    roleId: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ]
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '选择组织',
    showClose: true,
    confirmText: '提交',
    type: 'confirm'
  }

  roleList = [
    {
        value: 6,
        label: '普通学员'
    },
    {
        value: 3,
        label: '课程、直播和工作圈管理'
    },
    {
        value: 2,
        label: '后台管理员'
    },
    {
        value: 1,
        label: '超级管理员'
    }
  ]

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'
  restaurants = []
  timeout =  null
  temMenberLists = []
  groupList = []
  init() {
    this.getGroupList()
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   打开弹窗model
   */
  openModal(type) {
    this.models.show = true
    this.models.width = '860px'
    this.models.minHeight = '284px'
    this.groupList = [...this.temMenberLists]
  }

  /**
   * 获取课程列表
   */
  getGroupList() {
    getGroupListApi().then(res => {
      console.log(res.data.data)

      res.data.data.map((item)=>{
        item.active = false
      })

      console.log(res.data.data)
      this.temMenberLists = res.data.data
      this.groupList = res.data.data
    })
  }

  imgOp(index,type){
    if(type === 'over'){
      this.imageUpload.list[index].show = true
    }else if(type === 'out'){
      this.imageUpload.list[index].show = false
    }else if(type === 'delete'){
      delete this.from.avatarId 
      this.imageUpload.list.splice(index,1)
    }
  }

  // 检测是否可以提交
  checkSubmit() {

    console.log(this.form)
    this.$refs['form'].validate((valid) => {
      console.log(valid)
      if (valid) {
        // 给提交按钮加个loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'


        if(this.form.roleId === 3){
          this.form.contentAdminGroup = this.form.group_id.value
        }
        const need = ['name', 'avatarId', 'groupId', 'occupation','email','wechat','mobile','password','roleId','contentAdminGroup']
        const params = this.transformData(this.form, need)

        console.log(params)
        this.submit(params)
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
    let type = ''
    params.map(field => {
      type = typeof data[field]
      if(type != 'object' && type != 'undefined') {
        if(type == 'string' && data[field].length<1){
        }else {
          formData[field] = data[field]
        }
      }
    })
    return formData
  }
  // 提交表单数据
  submit(params) {
    let that = this
    addMemberApi(params)
      .then(res => {
        this.$message({message: res.data.msg, type: 'success'})
        this.$router.push({name: 'organization'})
      })
      .catch(err => {
        this.$message.error(`${err.data.msg}~`);
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
  }

  // 选择搜索到的数据
  search(type) {}

  

  /**
   * @detail   弹窗确定按钮
   */
  confirm() {
    this.form['group_id'].show = this.form['group_id'].value ? true : false
    this.models.show = false
    this.ownerUidName = ''
  }

  /**
   * @detail   弹窗关闭按钮
   */
  cancel() {
    this.models.show = false
  }

  todoAction(type) {}

  /**
   * @detail   编辑时初始化页面
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
        av_id: msg.avId, // 音视频id
        details:  msg.details, // 内容详情
        punch_card_title:  msg.punchCardTitle, // 打卡题目
        punch_card_img:  msg.punch_card_img, // 打卡图片
        status:  msg.status // 状态：0下线，1上线
      }
    })
  }

  /**
   * @detail   图片上传成功
   */
  handleImageSuccess(res) {
    console.log(res)
    res.data[0].show = false
    this.form.avatarId = res.data[0].id
    this.imageUpload.list = []
    this.imageUpload.list.push(res.data[0])
  }

  /**
   * @detail   图片上传之前的处理
   */
  beforeImageUpload(file) {
  }

  removeGroupCheck(index) {
    const value = this.form.group_id.value.split(',').splice(index, 1)
    this.form.group_id.tem.splice(index, 1)
    this.form.group_id.value = value.join(',')
    this.form.group_id.show = this.form.group_id.tem <= 0 ? false : true
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择课程组织
   * @return   {[type]}   [description]
   */
  seleteGroup(index, key) {
    this.groupList[index].active = !this.groupList[index].active
    const data = { show: false, tem: [], value: [] }
    this.groupList.map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    this.form.group_id = data

    console.log(data.value)
  }

}