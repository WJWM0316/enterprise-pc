import Vue from 'vue'
import Component from 'vue-class-component'
import { getTutorListApi, deletetTutorApi, searchTutorApi, createTutorApi} from 'STORE/api/tutor'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'

@Component({
  name: 'course-list',
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
  }
})
export default class CourseList extends Vue {

  teaType = 'primary'
  teaType2 = ''
  // 导师类型
  tutorType = 'inner'
  // 表单数据
  courseList = []
  input5 = ''
  total = 50

  // 表格字段
  fields = [
    {
      prop: 'teacherMsg',
      label: '导师资料',
      align: 'center'
    },
    {
      prop: 'mobile',
      label: '手机号',
      align: 'center'
    },
    {
      prop: 'inviteNum',
      label: 'TA的课程',
      align: 'center',
    },
    {
      prop: 'liveNum',
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
    for (let i = 0; i < 20; i++) {
      this.courseList.push({
        mobile: '2016-05-03',
        teacherMsg: '王小虎',
        inviteNum: '（1）',
        liveNum: '（1）',
        sort: 'desc'
      })
    }
  }
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { searchWord: 'string' })
    this.form = Object.assign(this.initForm, form || {})
    this.pagination = Object.assign(this.pagination, pagination || {})
    // this.getCourseList()
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

  getTutorLists() {
    setTimeout(() => {
      for (var i = 5 - 1; i >= 0; i--) {
        this.items.push({
          id: i,
          text: 'ddd'
        })
      }
    },3000)
    console.log(11)
  }
}
