import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getListCourse } from '@/store/api/course.js'

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
  },
  methods: {
    ...mapActions([
      'getCourseListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'courseList'
    ])
  }
})
export default class CourseList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'title',
      label: '课 程',
      align: 'center',
      width: '60%'
    },
    {
      prop: 'status',
      label: '是否上线',
      align: 'center',
      showTips: 'yes',
      width: '10%',
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
      prop: 'category',
      label: '类 型',
      align: 'center',
      showTips: 'yes',
      width: '10%',
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
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '操作的提示'
    }
  ]

  // 搜索表单
  form = {
    name: ''
  }

  // 初始化的搜索表单
  initForm = {
    searchWord: ''
  }

  // 分页信息
  pagination = {
    page: 1,
    count: this.zikeDefaultPageSize,
    status: 0,
    name: ''
  }

  searchType = '1'

  created() {
    for (let i = 0; i < 5; i++) {
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

  init() {
    this.form = Object.assign(this.form, this.$route.query)
    this.getCourseList()
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程列表
   * @return   {[type]}          [description]
   */
  getCourseList({ page, pageSize } = {}) {
    const params = {
      page: page || 1,
      count: this.zikeDefaultPageSize
    }
    if(this.form.name) {
      params.name = this.form.name
    }
    if(this.form.status) {
      params.status = this.form.status
    }
    this.getCourseListsApi(params)
  }


  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   添加课程
   * @return   {[type]}          [description]
   */
  addCourse() {
    this.$router.push({ name: 'coursePost'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   页面跳转
   * @return   {[type]}          [description]
   */
  routeJump(id, routeName) {
    this.$router.push({name: routeName, params: { id }})
  }
}
