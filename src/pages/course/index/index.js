import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import Cookies from 'js-cookie'

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
      'getCategoryListsApi',
      'getDesktopInfosApi',
      'loginApi'
    ])
  },
  computed: {
    ...mapGetters([
      'courseList',
      'categoryList',
      'desktopVerInfo'
    ])
  }
})
export default class CourseList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'title',
      label: '课 程',
      align: 'left',
      width: '50%'
    },
    {
      prop: 'status',
      label: '是否上线',
      align: 'left',
      showTips: 'yes',
      width: '15%',
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
      align: 'left',
      showTips: 'no',
      width: '10%',
      filteredValue: [],
      filterPlacement: '类型的提示文案'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'left',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '权重数越大，排序越靠前。权重数一样的情况下，按创建时间晚的排前面'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      align: 'left',
      width: '15%',
      filterPlacement: '编辑：编辑相关详细内容<br/>课节：进入课节管理页面'
    }
  ]

  // 搜索表单
  form = {
    name: ''
  }
  init() {
    this.form = Object.assign(this.form, this.$route.query)
    const code  = Cookies.get('code') ? Cookies.get('code') : process.env.VUE_APP__TEST_COMPANY
    this.loginApi({code, 'Authorization-Sso': Cookies.get('Authorization-Sso')})
        .then(() => {
          this.getCourseList()
        })
  }

  created() {
    const code  = Cookies.get('code') ? Cookies.get('code') : process.env.VUE_APP__TEST_COMPANY
    this.loginApi({code, 'Authorization-Sso': Cookies.get('Authorization-Sso')})
        .then(() => {
          this.getDesktopInfosApi()
          this.getCategoryListsApi({default: 1})
              .then(() => {
                this.categoryList.map(field => {
                  this.fields[2].filteredValue.push({
                    label: field.categoryName,
                    value: `category_id-${field.categoryId}`
                  })
                })
                this.fields[2].filteredValue.unshift({label: '全部', value: 'category_id-abc'})
              })
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
      // globalLoading: true
    }
    if(this.form.name) {
      params.name = this.form.name
      params.page = this.form.page ? this.form.page : 1
    }
    if(this.form.status) {
      params.status = Number(this.form.status) === 3 ? '' : this.form.status
    }
    if(this.form.category_id) {
      params.category_id = this.form.category_id === 'abc' ? '' : this.form.category_id
    }
    this.getCourseListsApi(params).then(() => this.form = {})
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
    const desktopVerInfo = this.desktopVerInfo
    if(desktopVerInfo.created.courseCount >= desktopVerInfo.enable.courseCount) {
      this.$alert('课程创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '创建课程上限已满提醒', {
        confirmButtonText: '我知道了',
        callback: action => {}
      })
      return
    }
    this.$router.push({ name: 'coursePost'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   页面跳转
   * @return   {[type]}          [description]
   */
  routeJump(id, routeName) {
    this.$router.push({name: routeName, query: { course_id: id }})
  }
}
