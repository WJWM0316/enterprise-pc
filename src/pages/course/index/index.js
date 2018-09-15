import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

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
    SearchBar
  }
})
export default class CourseList extends Vue {

  // 表单数据
  courseList = []
  input5 = ''
  total = 50

  // 表格字段
  fields = [
    {
      prop: 'courseName',
      label: '课 程',
      align: 'center'
    },
    {
      prop: 'online',
      label: '是否上线',
      align: 'center',
      showTips: 'yes',
      filteredValue:
      [
        {
          label: '上线',
          value: 'status-1'
        },
        {
          label: '下线',
          value: 'status-0'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'type',
      label: '类 型',
      align: 'center',
      showTips: 'yes',
      filteredValue:
      [
        {
          label: '全部',
          value: 'type-全部'
        },
        {
          label: '产品',
          value: 'type-产品'
        },
        {
          label: '运营',
          value: 'type-运营'
        }
      ],
      filterPlacement: '类型的提示文案'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes'
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

  created() {
    for (let i = 0; i < 20; i++) {
      this.courseList.push({
        date: '2016-05-03',
        courseName: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: 0,
        course: '公开卡',
        online: 0,
        type: '产品',
        range: 'desc',
        img: 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg',
        isDeleted: 0,
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

  /**
   * 获取课程列表
   */
  async getCourseList() {
    
  }

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    this.getCourseList()
  }

  // 添加课程-跳转
  addCourse() {
    this.$router.push({ name: 'coursePost'})
  }

  todoAction(type, item) {
    switch(type) {
      case 'edit':
        this.$router.push({
          name: 'courseUpdate',
          params: {
            id: item.id ? item.id : 0
          }
        })
        break
      case 'communicate':
        this.$router.push({
          name: 'lessonList',
          params: {
            id: item.id ? item.id : 0
          }
        })
        break
      case 'lesson':
        this.$router.push({
          name: 'lessonList',
          params: {
            id: item.id ? item.id : 0
          }
        })
        break
      default:
        break
    }
  }
}
