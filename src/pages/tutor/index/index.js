import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import { getTutorListApi, addSearchTutorApi, deletetTutorApi, searchTutorApi} from 'STORE/api/tutor.js'
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
export default class tutorList extends Vue {
  // 表单数据
  // 表格字段
  innerFields = [
    {
      prop: 'realname',
      label: '导师资料',
      width: '40%',
      align: 'left'
    },
    {
      prop: 'mobile',
      label: '手机号',
      width: '20%',
      align: 'left'
    },
    {
      prop: 'communityCount',
      label: 'TA的课程',
      width: '15%',
      align: 'left',
    },
    {
      prop: 'liveCount',
      width: '15%',
      label: 'TA的直播',
      align: 'left',
    }
  ]
  outerFields = [
    {
      prop: 'realname',
      label: '导师资料',
      width: '40%',
      align: 'left'
    },
    {
      prop: 'mobile',
      width: '20%',
      label: '手机号',
      align: 'left'
    },
    {
      prop: 'communityCount',
      width: '10%',
      label: 'TA的课程',
      align: 'left',
    },
    {
      prop: 'liveCount',
      width: '10%',
      label: 'TA的直播',
      align: 'left',
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
    confirmText: '添加新外部导师',
    type: 'alert',
    width: '670px',
    height: '400px',
    isHideBtn: '1',
  }

  // 确认信息弹窗
  delateModels = {
    show: false,
    title: '移除导师确认提醒',
    txt: '删除后该导师将无法进入，但其所有内容均会保留',
    showClose: true,
    confirmText: '删除',
    type: 'confirm',
    width: '432px',
    isHideBtn: '2',
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
    let query = this.$route.query
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
    if(query.tutorType){
      this.tutorType = query.tutorType
      this.pagination.type = query.tutorType === 'inner'?1:2
    }else {
      this.tutorType = 'inner'
    }

    this.form = Object.assign(this.form, query)
    this.getTutorList()
  }

  //跳转个人空间
  viewMenberInfo(id,type) {
    let query = {}
    if(id){
      query.id = id
      if(type){
        query.joinType = type
      }
      
      this.$router.push({ 
        name: 'userInfos', 
        query: query
      })
    }
    
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
        total: res.data.meta.total,
        page: params.page
      }
    })
  }

  // 点击搜索时触发
  handleSearch () {
    this.form.page = 1
    this.getTutorList()
  }

  // 添加导师-跳转
  toTea() {
    console.log(this.searchData.value)
    this.$router.push({ 
      name: 'tutorPost' ,
      params: {
        phone: this.searchData.value
      }
    })
  }

  //移除老师
  deleteTea() {

    this.delateModels.show = false
    let item = this.nowSelectDeleteItem
    if(!item.id){
      return
    }

    deletetTutorApi({id: item.id}).then(res=>{
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
    this.models.isHideBtn = '1'

    this.searchData.type = true
    searchTutorApi({mobile: this.searchData.value}).then(res=>{
      console.log('=====>',res.data.data)
      this.models.isHideBtn = '2'
      this.searchData.hintTXt = ''
      this.searchData.list = {}
      if(Object.keys(res.data.data).length>0){
        this.models.confirmText = '添加该导师'
        this.searchData.list = res.data.data
      }else {
        this.models.confirmText = '添加新外部导师'
      }
    },res=>{
      this.searchData.list = {}
      this.searchData.hintTXt = res.data.msg ||''
      //this.searchData.type = true

      console.log(this.searchData.hintTXt)
      //that.$message(res.data.msg);
    })
  }

  //添加搜索的外部导师
  select(type){
    if(type !== this.tutorType){
      this.$router.push({query: {page:1,tutorType: type}})
      this.init()
    }
  }

  //添加搜索的外部导师
  addTea(){
    addSearchTutorApi({mobile: this.searchData.value}).then(res=>{
      this.searchData.type = false
      this.$message(res.data.msg)
      this.searchData = {
        type : false,
        value : '',
        hintTxt: '',
        list : {}
      }

      this.models.show = false
      this.handleSearch()
    },res=>{
      this.$message(res.data.msg)
    })
  }

  cancel(){
    this.searchData.type = false
  }

  confirm(){
    console.log('confirm',this.searchData.list)
    console.log(Object.keys(this.searchData.list))
    if( Object.keys(this.searchData.list).length>0){
      this.addTea()
    }else {
      this.searchData.type = false
      this.toTea()
    }
  }

  openMadal() {
    this.models.show = !this.models.show
    this.models.title = '添加外部导师'
  }

}
