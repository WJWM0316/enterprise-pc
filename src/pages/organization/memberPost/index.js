import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import MyCropper from 'COMPONENTS/cropper/index.vue'

import { getAccessToken } from '@/store/cacheService'
import { upload_api } from '@/store/api/index.js'
import { editorRules } from 'FILTERS/rules'
import { getGroupListApi, addMemberApi, editMemberApi, deleteMemberApi ,getMemberInfoApi } from 'STORE/api/organization.js'

@Component({
  components: {
    ModalDialog,
    MyCropper
  },
  methods: {
    ...mapActions([
      'showMsg',
    ])
  },
  computed: {
    ...mapGetters([
      'userInfos'
    ]),
    isDelete(){
      if(this.userInfo.roleId === 1){
        if(this.form.roleId===1){
          return false
        }else {
          return true
        }
      }
      else if(this.userInfo.roleId === 2){
        if(this.form.roleId!==1||this.form.roleId!==2){
          return true
        }else {
          return false
        }
      }
    }
  },
  watch: {
    '$route': {
      handler() {
        this.init()
      },
      imageUpload(){

      },
      immediate: true
    }
  }
})
export default class WorkZonePost extends Vue {
  // 图片上传
  imageUpload = {
    list:[],
    hasUploaded: false,
    btnTxt: '上传头像',
    tips: '建议尺寸160X160px ，JPG、PNG格式，图片小于5M',
    showError: false,
    accept: '.jpeg, .png, .jpg'
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
    //性别
    gender: '1',
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

    group_management: {
      value: '',
      tem: [],
      show: false
    },

    organization_management: {
      value: '',
      tem: [],
      show: false
    },

    contentAdminGroup: '',

    icon: {
      tem: '',
      showError: false,
    },
  }

  rules = {
    name: [
      { required: true, validator: this.validatorName, message: '姓名必须填写，最多10个字符', trigger: 'blur' }
    ],
    groupId: [
      { required: true, message: '请选择部门', trigger: 'blur' }
    ],
    occupation: [
      { required: true, validator: this.validatorOccupation, message:'职位必须填写，最多40个字符', trigger: 'blur'}
    ],
    email: [
      { required: true, validator: this.validatorEmail,  trigger: 'blur' }
    ],
    mobile: [
      { validator: this.validatorMobile,  trigger: 'blur' }
    ],
    password: [
      { required: true, validator: this.validatorPassword, trigger: 'blur'}
    ],
    roleId: [
      { required: true, message: '请选择权限', trigger: 'blur' }
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

  // 修改密码确认信息弹窗
  passWordModel = {
    show: false,
    title: '设置新密码',
    showClose: true,
    confirmText: '提交',
    type: 'confirm',
    hintMsg: '密码必须填写，6-20个字符',
    isHintShow:false,
  }

  // 删除确认信息弹窗
  delateModels = {
    show: false,
    title: '删除账户确认提醒',
    txt: '删除后该账号将无法恢复，但其所有内容均会保留',
    showClose: true,
    confirmText: '删除',
    type: 'confirm',
    width: '432px',
    height: '192px'
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
  pageStatus = ''  
  user_id = ''
  userInfo = {}
  isMe = false
  selectType = '' //选中的弹框

  init() {
    this.pageStatus = this.$route.name === 'addMember'? 'add':'edit'
    if(this.pageStatus === 'add'){
      this.form.groupId = this.$route.params.groupId? parseInt(this.$route.params.groupId) :''
      this.form.password = '123456'
    }else {
      this.user_id = this.$route.query.user_id
      if(this.user_id.toString() === this.userInfos.id.toString()){
        this.isMe = true
        delete this.rules.roleId
      }
      this.editInitMsg()
    }

    this.getUserInfo()
    this.getGroupList()
  }

  opEditRoleList(){
    let rule = this.userInfo.roleId
    if(rule == 1){
      this.roleList.length = 3
    }else if(rule == 2){
      this.roleList.length = 2
    }
  }

  getUserInfo(){

    getMemberInfoApi({id: this.userInfos.id}).then(res=>{
      this.userInfo = res.data.data
      this.opEditRoleList()
    })
  }

  //编辑时初始化
  editInitMsg(){
    getMemberInfoApi({id: this.user_id}).then(res=>{
      let data = res.data.data
      this.form.name = data.realname
      this.form.avatarId = data.avatarId
      this.form.occupation = data.occupation
      this.form.email = data.email
      this.form.wechat = data.wechat
      this.form.mobile = data.mobile

      this.form.roleId = data.roleId
      this.form.gender = data.gender.toString()
      this.form.id = this.user_id
      this.form.contentAdminGroup = ''

      if(data.avatar&& data.avatar.smallUrl){

        this.form.icon.tem = data.avatar.smallUrl
        this.imageUpload.list[0] = {
          url: data.avatar.smallUrl,
          show: false
        }
      }

      this.form.groupId = ''
      if(data.group.length>0){
        let ary = []
        data.group.map(item=>{
          ary.push(item.groupId)
        })
        this.form.groupId = ary.join(',')
        this.form.group_management.tem = data.group
        this.form.group_management.value = ary.join(',')
        this.form.group_management.show = true
      }


      if(data.contentAdminGroup){
        let ary = []
        data.contentAdminGroup.map(item=>{
          ary.push(item.groupId)
        })
        this.form.organization_management.tem = data.contentAdminGroup
        this.form.organization_management.value = ary.join(',')
        this.form.organization_management.show = true
      }

      this.rules.password.required = false
    })
  }

  /**
   * @detail   打开弹窗model
   */
  openModal(type) {

    let groupList = []
    let name = `${type}_management`
    let valueList = this.form[name].value.split(',')

    this.models.show = true
    this.models.width = '860px'
    this.models.minHeight = '284px'

    this.groupList.map(item=>{
      let id = item.groupId.toString()
      if(valueList.includes(id)){
        item.active = true
      }else {
        item.active = false
      }
    })

    if(type ==='organization'){
      this.selectType = 'organization'
    }else if(type === 'group'){
      this.selectType = 'group'
    }
  }

  openModel2(){
    this.passWordModel.show = true
    this.passWordModel.width = '432px'
    this.passWordModel.minHeight = '102px'
  }

  /**
   * 获取课程列表
   */
  getGroupList() {
    getGroupListApi().then(res => {
      res.data.data.map((item)=>{
        item.active = false
      })

      this.temMenberLists = res.data.data
      this.groupList = res.data.data
    })
  }

  // 检测是否可以提交
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加个loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'

        //权限管理是内容的话
        if(this.form.roleId === 3){
          this.form.contentAdminGroup = this.form.organization_management.value
        }
        const need = ['name', 'avatarId', 'groupId', 'gender', 'occupation', 'email', 'wechat', 'mobile', 'password', 'roleId', 'contentAdminGroup', 'id']
        const params = this.transformData(this.form, need)
        // this.submit(params)
      }
    })
  }

  /**
   * @detail   获取提交参数
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
    formData['groupId'] = this.form.group_management.value
    formData['contentAdminGroup'] = this.form.contentAdminGroup.value
    console.log(this.form)
    return formData
  }

  // 提交表单数据
  submit(params) {
    let that = this
    if(this.pageStatus === 'add'){
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
      }else {
        editMemberApi(params)
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
  }

  /**
   * @detail   弹窗确定按钮
   */
  confirm() {
    let name = `${this.selectType}_management`
    this.form[name].show = this.form[name].value ? true : false
    this.models.show = false
    this.ownerUidName = ''
  }

  /**
   * @detail   修改密码弹窗确定按钮
   */
  confirm2() {
    if(this.form.password.length>20 || this.form.password.length<6){
      this.passWordModel.isHintShow = true
    }else {
      this.passWordModel.isHintShow = false
      this.passWordModel.show = false
    }
  }

  /**
   * @detail   弹窗关闭按钮
   */
  cancel() {
    this.models.show = false
  }

  deleteMember(){
    deleteMemberApi({id: this.user_id}).then(res=>{
      this.$message({message: res.data.msg, type: 'success'})
      this.$router.push({name: 'organization'})
    }).catch(err => {
      this.$message.error(`${err.data.msg}~`);
    })
  }

  /**
   * @detail   图片上传成功
   */
  imageUploadSuccess(res) {
    this.form.avatarId = res.id
    this.form.icon.tem = res.url
    this.imageUpload.hasUploaded = true
    this.imageUpload.btnTxt = '重新上传'
    this.imageUpload.showError = false
    //this.$refs.form.validateField('avatarId')
  }

  handleImageError(res) {
    this.imageUpload.status = 'error'
    this.imageUpload.hasUploaded = false
    this.imageUpload.btnTxt = '重新上传'
    this.imageUpload.showError = true
    if(Object.prototype.toString.call(res) === '[object String]') {
      this.$message.error(`${res}~`)
    } else {
      this.$message.error(`${res.msg}~`)
    }
  }

  /**
   * @detail   图片上传之前的处理
   */
  beforeImageUpload(file) {
    /*console.log('beforeImageUpload')
    this.imageUpload.status = 'loading'*/
  }

  removeGroupCheck(type,index) {
    let name = `${type}_management`
    const tem = this.form[name].value.split(',')
    tem.splice(index, 1)
    const value = tem
    this.form[name].tem.splice(index, 1)
    this.form[name].value = value.join(',')
    this.form[name].show = this.form[name].tem <= 0 ? false : true
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   选择课程组织
   * @return   {[type]}   [description]
   */
  seleteGroup(index, key) {
    let name = `${this.selectType}_management`
    this.groupList[index].active = !this.groupList[index].active
    const data = { show: false, tem: [], value: [] }
    this.groupList.map((field) => {
      if(field.active) {
        data.tem.push(field)
        data.value.push(field.groupId)
      }
    })
    data.value = data.value.join(',')
    if(this.selectType ==='group'){
      this.form.groupId = data.value
    }
    this.form[name] = data
  }


  //职位
  validatorOccupation(rule, value, callback) {
    let val = value.replace(/(^\s*)|(\s*$)/g, "")

    if (val.length === 0) {
      callback(new Error('职位必须填写，最多40个字符'));
    } else if(val.length>40) {
      callback(new Error('职位必须填写，最多40个字符'));
    }else {
      callback();
    }
  }

  //名字
  validatorName(rule, value, callback) {
    let val = value.replace(/(^\s*)|(\s*$)/g, "")

    if (val.length === 0) {
      callback(new Error('名字必须填写，最多10个字符'));
    } else if(val.length>10) {
      callback(new Error('名字必须填写，最多10个字符'));
    }else {
      callback();
    }
  }

  //密码
  validatorPassword(rule, value, callback) {
    let val = value.replace(/(^\s*)|(\s*$)/g, "")
    if (val.length === 0) {
      callback(new Error('密码必须填写，6-20个字符'));
    } else if(val.length<6 || val.length>20) {
      callback(new Error('密码必须填写，6-20个字符'));
    }else {
      callback();
    }
  }

  //邮箱
  validatorEmail(rule, value, callback) {
    let val = value.replace(/(^\s*)|(\s*$)/g, "")
    let re = new RegExp(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/);
    if (val.length === 0) {
      callback(new Error('邮箱必须填写，可作为成员登陆邮箱'));
    } else if(!re.test(val)) {
      callback(new Error('邮箱格式不正确'));
    }else {
      callback();
    }
  }

  //手机
  validatorMobile(rule, value, callback){
    let val = value.replace(/(^\s*)|(\s*$)/g, "")
    let re = new RegExp(/^[1][3,4,5,7,8,9][0-9]{9}$/);
    if (val.length === 0) {
      callback();
    } else if(val.length>0) {
      if(!re.test(val)){
        callback(new Error('手机格式不正确'));
      }else {
        callback();
      }

    }
  }

}