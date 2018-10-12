import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import { getTutorListApi, deletetTutorApi, searchTutorApi, createTutorApi} from 'STORE/api/tutor.js'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'

@Component({
  name: 'tutor-list',
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
   components: {
    TableList,
    SearchBar,
    ModalDialog
  },
  methods: {
    ...mapActions([
      'getTutorListApi'
    ])
  }
})
export default class CourseList extends Vue {
  // 导师类型
  tutorType = 'inner'
  // 表单数据
  tutorList = []
  input5 = ''

  // 表格字段
  innerFields = [
    {
      prop: 'realname',
      label: '导师资料',
      width: '40%',
      align: 'center'
    },
    {
      prop: 'mobile',
      label: '手机号',
      width: '20%',
      align: 'center'
    },
    {
      prop: 'communityCount',
      label: 'TA的课程',
      width: '15%',
      align: 'center',
    },
    {
      prop: 'liveCount',
      width: '15%',
      label: 'TA的直播',
      align: 'center',
    }
  ]

  outerFields = [
    {
      prop: 'realname',
      label: '导师资料',
      width: '40%',
      align: 'center'
    },
    {
      prop: 'mobile',
      width: '20%',
      label: '手机号',
      align: 'center'
    },
    {
      prop: 'communityCount',
      width: '10%',
      label: 'TA的课程',
      align: 'center',
    },
    {
      prop: 'liveCount',
      width: '10%',
      label: 'TA的直播',
      align: 'center',
    },
    {
      prop: 'actions',
      width: '10%',
      label: '操 作',
      showTips: 'yes',
      filterPlacement: '移除导师：把对应外部导师移除出企业'
    }
  ]
  
  pagination = {
    page: 1,
    count: 20,
    type: 1,
    name: ''
  }

  searchType = false
  searchValue = ''
  searchList = {}

  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '添加新外部老师',
    type: 'confirm',
    width: '670px',
    height: '400px'
  }

  // 确认信息弹窗
  delateModels = {
    show: false,
    title: '移除导师确认提醒',
    txt: '删除后该导师将无法进入，但其所有内容均会保留',
    showClose: true,
    confirmText: '删除',
    type: 'confirm',
    confirmType: 'danger',
    width: '432px',
    height: '192px'
  }

  nowSelectDeleteItem = {}

  visible = true
  created() {
  }
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.getTutorList()
  }

  //跳转个人空间
  viewMenberInfo(id,type) {
    this.$router.push({ 
      name: 'userInfos', 
      params: { id }, 
      query:{joinType: type}
    })
  }

  /**
   * 获取列表
   */
  async getTutorList() {
    let params = this.pagination

    getTutorListApi(params).then(res=>{
      this.tutorList = res.data.data
    })
  }

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.getTutorList()
  }

  // 添加导师-跳转
  toTea() {
    this.$router.push({ name: 'tutorPost'})
  }

  //移除老师
  deleteTea() {
    this.delateModels.show = false
    let item = this.nowSelectDeleteItem
    if(!item.uid){
      return
    }

    deletetTutorApi({id: item.uid}).then(res=>{
      this.nowSelectDeleteItem = {}
      this.$message(res.data.msg)
      this.getTutorList()
    },res=>{
      this.$message(res.data.msg)
    })
  }

  showDeleteHint(item){
    this.delateModels.show = true
    this.nowSelectDeleteItem = item
  }

  //搜索老师
  searchTea(mobile) {
    let that = this
    if(this.searchValue.length===0){
      return
    }
    this.searchType = true
    searchTutorApi({mobile: this.searchValue}).then(res=>{
      //that.$message(res.data.msg);
      console.log(res)
      if(res.data.data){
        this.searchList = res.data.data
      }
    },res=>{
      this.searchList = {}
      console.log(res)
      that.$message(res.data.msg);
    })
  }

  select(type){
    if(type !== this.tutorType){
      this.pagination.type = type === 'inner' ? 1 : 2,
      this.pagination.name = ''
      this.tutorType = type
      this.getTutorList()
    }
  }

  cancel(){
    this.searchType = false
  }

  confirm(){
    this.searchType = false
    this.toTea()
  }

  openMadal() {
    this.models.show = !this.models.show
    this.models.title = '添加外部导师'
  }

}
