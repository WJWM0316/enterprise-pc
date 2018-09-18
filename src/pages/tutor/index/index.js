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
  total = 50

  // 表格字段
  innerFields = [
    {
      prop: 'realname',
      label: '导师资料',
      align: 'center'
    },
    {
      prop: 'mobile',
      label: '手机号',
      align: 'center'
    },
    {
      prop: 'communityCount',
      label: 'TA的邀请',
      align: 'center',
    },
    {
      prop: 'liveCount',
      label: 'TA的直播',
      align: 'center',
    }
  ]

  outerFields = [
    {
      prop: 'realname',
      label: '导师资料',
      align: 'center'
    },
    {
      prop: 'mobile',
      label: '手机号',
      align: 'center'
    },
    {
      prop: 'communityCount',
      label: 'TA的邀请',
      align: 'center',
    },
    {
      prop: 'liveCount',
      label: 'TA的直播',
      align: 'center',
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
    }
  ]

  // 搜索表单
  form = {
    searchWord: ''
  }

  // 初始化的搜索表单
  initForm = {
    searchWord: ''
  }

  // 分页信息
  pagination = {
    page: 1,
    pageSize: this.zikeDefaultPageSize,
    pageCount: 0,
    total: 0
  }

  searchType = false
  searchValue = ''
  searchList = []

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

  visible = true
  created() {
    this.init()
  }
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.getTutorList()
  }

  /**
   * 获取列表
   */
  async getTutorList() {
    let params = {
      type: this.tutorType === 'inner' ? 1 : 2,
      page: 1,
      pageCount: 20
    }

    getTutorListApi(params).then(res=>{
      this.tutorList = res.data.data
    })
  }



  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
  }

  // 添加导师-跳转
  toTea() {
    this.$router.push({ name: 'tutorPost'})
  }

  //移除老师
  deleteTea(item) {
    deletetTutorApi({id: item.uid}).then(res=>{
      this.$message(res.data.msg);
      this.getTutorList()
    },res=>{
      this.$message(res.data.msg);
    })
  }

  //搜索老师
  searchTea(mobile) {
    let that = this;
    if(this.searchValue.length===0){
      return
    }
    this.searchType = true
    searchTutorApi({mobile: this.searchValue}).then(res=>{
      that.$message(res.data.msg);
      if(res.data.data.length===0){
        this.searchList = res.data.data
      }
    },res=>{
      that.$message(res.data.msg);
    })
  }

  select(type){
    if(type !== this.tutorType){
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
