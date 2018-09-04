import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'

@Component({
  name: 'lighthouse-list',
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
   components: {
    TableList
  }
})
export default class CourseList extends Vue {

  // 表单数据
  courseList = []

  input3 = ''
  input4 = ''
  input5 = ''
  select = ''

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
      filteredValue:
      [
        {
          label: '全部',
          value: 'online-全部'
        },
        {
          label: '上线',
          value: 'online-上线'
        },
        {
          label: '下线',
          value: 'online-下线'
        }
      ],
      filterPlacement: '是否上线的提示文案'
    },
    {
      prop: 'type',
      label: '类 型',
      align: 'center',
      filteredValue:
      [
        {
          label: '全部',
          value: 'type-全部'
        },
        {
          label: '上线',
          value: 'type-上线'
        },
        {
          label: '下线',
          value: 'type-下线'
        }
      ],
      filterPlacement: '类型的提示文案'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      filteredValue:
      [
        {
          label: '全部',
          value: 'sort-全部'
        },
        {
          label: '上线',
          value: 'sort-上线'
        },
        {
          label: '下线',
          value: 'sort-下线'
        }
      ],
      filterPlacement: '权重的提示文案'
    },
    {
      prop: 'actions',
      label: '操 作'
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

  created () {
    for (let i = 0; i < 20; i++) {
      this.courseList.push({
        date: '2016-05-03',
        courseName: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: 0,
        course: '公开卡',
        online: 0,
        type: 4,
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
  init () {
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { searchWord: 'string' })
    /* eslint-disable */
    this.form = $.extend(true, {}, this.initForm, form || {})
    this.pagination = $.extend(true, {}, this.pagination, pagination || {})
    /* eslint-enable */
    // this.getCourseList()
  }

  /**
   * 获取课程列表
   */
  async getCourseList () {}

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    this.getCourseList()
  }

  // 添加课程-跳转
  addCourse () {
    this.$router.push({ name: 'coursePost'})
  }
}
