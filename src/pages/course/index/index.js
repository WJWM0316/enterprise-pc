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
      'getCourseListsApi',
      'getCategoryListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'courseList',
      'categoryList'
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
          label: '全部',
          value: 'status-3'
        },
        {
          label: '上线',
          value: 'status-1'
        },
        {
          label: '下线',
          value: 'status-0'
        }
      ],
      filterPlacement: '上线：在员工端显示；下线：在员工端不显示'
    },
    {
      prop: 'category',
      label: '类 型',
      align: 'center',
      showTips: 'no',
      width: '10%',
      filteredValue: [],
      filterPlacement: '类型的提示文案'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '权重数越大，排序越靠前。权重数一样的情况下，按创建时间晚的排前面'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '编辑：编辑相关详细内容<br/>课节：进入课节管理页面'
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

  created() {
    this.getCategoryListsApi()
        .then(() => {
          this.categoryList.map(field => {
            this.fields[2].filteredValue.push({
              label: field.categoryName,
              value: `category_id-${field.categoryId}`
            })
          })
          this.fields[2].filteredValue.unshift({label: '全部', value: 'category_id-abc'}, {label: '未分类', value: 'category_id-0'})
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程列表
   * @return   {[type]}          [description]
   */
  getCourseList({ page, pageSize } = {}) {
    const params = {
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.name) {
      params.name = this.form.name
    }
    if(this.form.status) {
      params.status = Number(this.form.status) === 3 ? '' : this.form.status
    }
    if(this.form.category_id) {
      params.category_id = this.form.category_id === 'abc' ? '' : this.form.category_id
    }
    this.getCourseListsApi(params)
  }


  // 点击搜索时触发
  handleSearch () {
    this.setPathQuery({name: this.form.name})
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
    if(routeName === 'lessonList'){
      this.$router.push({name: routeName, query: { course_id: id }})
    }else {
      this.$router.push({name: routeName, params: { id }})
    }
  }
}
