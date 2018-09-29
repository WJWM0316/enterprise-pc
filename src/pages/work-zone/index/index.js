import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'lighthouse-list',
  methods: {
    ...mapActions([
      'getJobCircleListsApi',
      'showMsg'
    ])
  },
  computed: {
    ...mapGetters(['jobCircleLists'])
  },
  watch: {
    '$route': {
      handler() {
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
export default class WorkzoneList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'name',
      label: '工作圈',
      align: 'center',
      showTips: 'no',
      width: '55%'
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
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      showTips: 'no',
      width: '10%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'sort-全部'
        },
        {
          label: '升序',
          value: 'sort-升序'
        },
        {
          label: '降序',
          value: 'sort-降序'
        }
      ],
      filterPlacement: '权重的提示文案'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '15%',
      filterPlacement: '吊炸天的操作~'
    }
  ]

  // 搜索表单
  form = {
    name: ''
  }

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form, this.$route.query)
    this.getWorkZoneLists()
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取工作圈列表
   * @return   {[type]}                    [description]
   */
  getWorkZoneLists({ page, pageSize } = {}) {
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
    this.getJobCircleListsApi(params)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   点击搜索时触发
   */
  handleSearch() {
    this.setPathQuery(this.form)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   添加课程
   */
  addWorkZone() {
    this.$router.push({ name: 'workZonePost'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   路由切换
   */
  routeJump(id, routeName) {
    this.$router.push({ name: routeName, params: { id } })
  }
}
