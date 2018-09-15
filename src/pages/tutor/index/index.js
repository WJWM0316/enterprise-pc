import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import { getTutorListApi, deletetTutorApi, searchTutorApi, createTutorApi} from 'STORE/api/tutor.js'
import TableList from 'COMPONENTS/list/index.vue'
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

  teaType = 'primary'
  teaType2 = ''
  // 导师类型
  tutorType = 'inner'
  // 表单数据
  tutorList = []
  input5 = ''
  total = 50

  // 表格字段
  fields = [
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
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
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

  searchType = '1'
  value = ''
  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    type: 'confirm',
    width: '670px',
    height: '400px'
  }

  items = []
  visible = true
  created() {
    this.init()
  }
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.getList()
  }

  /**
   * 获取列表
   */
  async getList() {
    let params = {
      type: this.teaType === 'primary' ? 1 : 2,
      page: 1,
      pageCount: 20
    }
    getTutorListApi(params).then(res=>{
      console.log(typeof res.data,res.data.data)
      this.tutorList = res.data.data

      console.log( this.tutorList)
    })
  }
  
  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
  }

  // 添加课程-跳转
  addTea() {
    this.$router.push({ name: 'tutorPost'})
  }

  select(type){
    this.tutorType = type
  }

  confirm() {}

  cancel() {}

  openMadal() {
    this.models.show = !this.models.show
    this.models.title = '添加外部导师'
  }

}
