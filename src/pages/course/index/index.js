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

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   手动搜索
   * @return   {[type]}          [description]
   */
  handleSearch() {
    this.setPathQuery(this.form)
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
