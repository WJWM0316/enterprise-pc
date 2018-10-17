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
  // 表单数据
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

  //当前选择删除
  nowSelectDeleteItem = {}

  // 导师类型
  tutorType = 'inner' 

  //列表数据
  form = {
    list: [],
    page: 1,
    total: 0,
  }

  pagination = {
    count: this.zikeDefaultPageSize,
    type: 1,
    name: ''
  }
  //搜索
  searchData = {
    type : false,
    value : '',
    hintTxt: '',
    list : {}
  }

  created() {
  }
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.pagination = {
      count: this.zikeDefaultPageSize,
      type: 1,
      name: ''
    }
    this.searchData = {
      type : false,
      value : '',
      hintTxt: '',
      list : {}
    }
    if(this.$route.query.tutorType){
      this.tutorType = this.$route.query.tutorType
    }

    this.form = Object.assign(this.form, this.$route.query)
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
  async getTutorList({ page } = {}) {
    let params = this.pagination

    params.page = page || this.form.page || 1
    getTutorListApi(params).then(res=>{
      this.form = {
        list : res.data.data,
        total: res.data.meta.total
      }
    })
  }

  // 点击搜索时触发
  handleSearch () {

    this.$router.push({query: {page:1}})
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
    if(this.searchData.value.length===0){
      return
    }
    this.searchData.type = true
    searchTutorApi({mobile: this.searchData.value}).then(res=>{
      console.log(res)
      this.searchData.hintTXt = ''
      if(res.data.data){
        this.searchData.list = res.data.data
      }
    },res=>{
      this.searchData.list = {}
      this.searchData.hintTXt = res.data.msg ||''
      console.log(res)
      that.$message(res.data.msg);
    })
  }

  select(type){

    if(type !== this.tutorType){
      this.$router.push({query: {page:1,tutorType: type}})
      this.init()
    }
  }

  cancel(){
    this.searchData.type = false
  }

  confirm(){
    this.searchData.type = false
    this.toTea()
  }

  openMadal() {
    this.models.show = !this.models.show
    this.models.title = '添加外部导师'
  }

}
