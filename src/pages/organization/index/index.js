import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import { getMemberListApi, getGroupListApi, importMemberByExcelApi, downloadMsgApi } from '@/store/api/organization.js'
import { upload_api } from '@/store/api/index.js'
import { getAccessToken } from '@/store/cacheService'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import addMemberBox from 'COMPONENTS/addMemberBox/index.vue'

@Component({
name: 'member-list',
components: {
  TableList,
  ModalDialog,
  SearchBar,
  addMemberBox
},
watch: {
  groupList (val) {},
  '$route': {
    handler() {
      this.init()
    },
    immediate: true
  }
},
methods: {
  ...mapActions([
    'showMsg',
  ])
},
})
export default class pageOrganization extends Vue {
  confirmModels = {
    show: false
  }
  form = {
    searchContent: '',
    groupId: null,
    roleId: null,
    page: 1,
    lastPage: null
  }
  groupList = [
  ]
  options = [
    {
      value: '1',
      label: '超级管理员'
    },
    {
      value: '2',
      label: '后台管理员'
    },
    {
      value: '3',
      label: '内容管理员'
    },
    {
      value: '4',
      label: '全部成员'
    }
  ]
  rolevalue = ''
  // 表单数据
  courseList = {
    list: [],
    total: 0
  }
  // 表格字段
  fields = [
    {
      prop: 'groupName',
      width: '17%',
      label: '成员',
      align: 'left'
    },
    {
      prop: 'occupation',
      width: '10%',
      label: '职位',
      align: 'left',
      showTips: 'no'
    },
    {
      prop: 'roleName',
      width: '10%',
      label: '权限',
      align: 'left'
    },
    {
      prop: 'mobile',
      width: '10%',
      label: '手机号码',
      align: 'left',
      showTips: 'no'
    },
    {
      prop: 'email',
      width: '10%',
      label: '邮箱',
      align: 'left',
      showTips: 'no'
    },
    {
      prop: 'wechat',
      width: '10%',
      align: 'left',
      label: '操作',
      showTips: 'no'
    }
  ]

  memberData = {
    selectAll: 1,
    count: 20,
    page: 1
  }

  // 文件上传
  fileUpload = {
    action: upload_api,
    list: [],
    limit: 2,
    accept: '.xlsx,.xls',
    progress: 0,
    tips: '格式支持xlsx',
    btnTxt: '上传成员表格',
    progressText: '上传中',
    params: {
      token: getAccessToken(),
      attach_type: 'doc',
    },
    status: 'processing',
    infos: {},
    show: false
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '第一步：下载标准表格模版，按要求填写',
    showClose: true,
    confirmText: '开始导入',
    type: 'alert',
    width: '670px',
    height: '400px',
    isHideBtn: '1',
  }
  av_id = null
  downUrl = ''
  selectGroupName = '全部成员'

  init() {
    let query =  this.$route.query
    this.memberData = {
      selectAll: 1,
      count: 20,
      page: 1
    }
    this.memberData = Object.assign(this.memberData,query || {})
    if(query.roleId){
      if(query.roleId === '4'){
        delete this.memberData.roleId
      }
      this.rolevalue = query.roleId
    }
    if(this.form.searchContent) {
      this.memberData.searchContent = this.form.searchContent
    } else {
      delete this.memberData.searchContent
    }
    this.getMemberList()
    this.getMsgList()
    this.downloadMsg()
  }
  handleSearch() {
    this.setPathQuery({searchContent: this.form.searchContent})
    const params = {
      selectAll: 1,
      searchContent: this.form.searchContent,
      count: 20,
      page: this.form.page
    }
    if(this.form.groupId) params.groupId = this.form.groupId
    if(this.form.roleId && Number(this.form.roleId) !== 4) params.roleId = this.form.roleId
    getMemberListApi(params).then( res => {
      this.courseList = {
        list : res.data.data,
        total: res.data.meta && res.data.meta.total ? res.data.meta.total: 0
      }
      if(res.data.meta.total > Number(this.form.page) * 20) {
        this.form.page++
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-05
   * @detail   编辑成员
   * @return   {[type]}      [description]
   */
  editUser(user_id) {
    this.$router.push({
      name: 'editMember',
      query: {
        user_id
      }
    })
  }
  //下载信息
  downloadMsg(){
    downloadMsgApi().then(res=>{
      this.downUrl = res.data.data.url
    })
  }

  getMsgList() {
    getGroupListApi().then( res => {
        this.groupList = [
        {
          groupId: 0, 
          groupName: '全部成员', 
          active: true
        }]
        res.data.data.map(item=>{
          if(this.$route.query.groupId && this.$route.query.groupId == item.groupId){
            item.active = true
            this.groupList[0].active = false
            this.selectGroupName = item.groupName
            this.form.groupId = this.$route.query.groupId
          }else {
            item.active = false
          }
        })
        this.groupList = [...this.groupList,...res.data.data]
    })
  }

  //跳转个人空间
  viewMenberInfo(id) {
    if(id){
      this.$router.push({ 
        name: 'userInfos', 
        query: { id }
      })
    }
  }

  getMemberList(){
    if(!this.$route.query.searchContent) {
      delete this.memberData.searchContent
    } else {
      this.memberData.searchContent = this.$route.query.searchContent
    }
    getMemberListApi(this.memberData).then( res => {
      this.courseList = {
        list : res.data.data,
        total: res.data.meta&&res.data.meta.total?res.data.meta.total:0
      }
    })
  }

  todoAction(type) {
    let params = {}
    switch(type) {
      case 'set':
        this.$router.push({
          name: 'groupManage'
        })
        break
      // eslint-disable-next
      case 'addMember':
        if(this.$route.query.groupId){
          params = {
            groupId : this.$route.query.groupId
          }
        }
        this.$router.push({
          name: 'addMember',
          params: params
        })
        break
      case 'addGroup':
          this.$router.push({
            name: 'addGroup'
          })
        break
      case 'edit':
          this.$router.push({
            name: 'editMember',
            query: {
              user_id: 108,
            }
          })
        break
      case 'upload':
          this.models.show = true
        break
      default:
        break
    }
  }

  selectGroup(item){
    let query = {
      page: 1,
      roleId: '4'
    }
    if(item.groupId === 0){
      query = {}
      this.selectGroupName = '全部成员'
      this.form.groupId = null
    } else {
      query.groupId = item.groupId
      this.groupList.map(data => {
        if(data.groupId == item.groupId) this.selectGroupName = data.groupName
      })
    }
    this.$router.push({
      name: 'organization',
      query: query
    })
  }

  changeRule(id){
    this.form.roleId = id !== 4 ? id : null
    let query = { ...this.$route.query, page: 1 }
    if(id === 4){
      query = {}
    } else {
      query.roleId = id
    }

    if(this.$route.query.groupId) {
      query.groupId = this.$route.query.groupId
    }
    this.$router.push({
      name: 'organization',
      query: query
    })
  }

  handleRemove(e){
    this.fileUpload.show = false
    this.fileUpload.btnTxt = '选择文件'
    this.fileUpload.progress = 0
    this.fileUpload.status = 'processing'
    this.fileUpload.progressText = ''
    this.models.isHideBtn = '1'
    this.$refs.file.abort()
    this.av_id = null
  }

  handleExceed(files, fileList){
    this.$message.warning('当前限制选择 1 个文件，请先删除当前上传文件（鼠标浮动到文件')
    return false
  }

  /**
   * @detail   文件上传成功
   */
  handleFileSuccess(res) {
    this.av_id = res.data[0].id
    this.fileUpload.status = 'success'
    this.fileUpload.progress = 100
    this.fileUpload.progressText = '上传成功'
    this.fileUpload.btnTxt = '重新上传'
    this.models.isHideBtn = '2'
  }

  /**
   * @detail   文件上传之前的处理
   */
  beforeFileUpload(file) {
    const isLt200M = file.size / 1024 / 1024 < 200;
    if(!isLt200M){
      this.$message.error('上传文件大小不能超过 200MB!');
    }else {
      this.fileUpload.status = 'loading'
      this.fileUpload.progress = 0
      this.fileUpload.progressText = '上传中'

      this.nowLoadUid = file.uid
      this.fileUpload.infos = file
      this.fileUpload.show = true
      this.fileUpload.btnTxt = '正在上传..'
    }
    return isLt200M
  }

  /**
   * @detail   上传进度
   */
  uploadFileProcess(event, file, fileList){
    this.fileUpload.progress = file.percentage.toFixed(0)
  }

  /**
   * @detail   文件上传失败
   */
  handleFileError(err, file, fileList) {
    this.fileUpload.status = 'error'
    this.fileUpload.progress = 0
    this.fileUpload.progressText = '上传失败'
    this.fileUpload.btnTxt = '重新上传'
    this.showMsg({ content: '上传失败 ~', type: 'error', duration: 3000 })
  }

  cancel(){
    //this.searchData.type = false
  }

  confirm(){
    if(!this.av_id){
      this.$message.error('缺少文件')
      return
    }
    if(this.models.confirmText === '正在上传..'){
      return
    }
    this.models.confirmText = '正在上传..'
    importMemberByExcelApi({
      fileId: this.av_id
    }).then(res=>{
      this.$message({
        message: res.data.msg,
        type: 'success'
      })
      this.models.confirmText = '导入成功'
      setTimeout(()=>{
        this.searchData.type = false
      },1000)
    },res=>{
      this.models.confirmText = '导入失败'
      this.models.isHideBtn = '1'
      this.$message.error(res.data.msg);
    })
  }

  openConfirmModel() {
    this.confirmModels.show = !this.confirmModels.show
  }
}
