import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'lighthouse-list',
  methods: {
    ...mapActions([
      'getJobCircleListsApi',
      'getVersionInfoApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
      'versionInfo'
    ])
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
      align: 'left',
      showTips: 'no',
      width: '40%'
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
      prop: 'sort',
      label: '权重',
      align: 'left',
      showTips: 'yes',
      width: '15%',
      filterPlacement: '权重数越大，排序越靠前。权重数一样的情况下，按创建时间晚的排前面。'
    },
    {
      prop: 'actions',
      label: '操作',
      align: 'left',
      showTips: 'yes',
      width: '20%',
      filterPlacement: '编辑相关详细内容'
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
    this.form = {}
    this.form = Object.assign(this.form, this.$route.query)
    this.getWorkZoneLists()
  }

  created() {
    this.getVersionInfoApi()
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
      // globalLoading: true
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
    this.form.page = 1
    this.setPathQuery(this.form)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   添加课程
   */
  addWorkZone() {
    const versionInfo = this.versionInfo
    if(versionInfo.created.courseCount >= versionInfo.enable.courseCount) {
      this.$alert('工作圈创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '创建工作圈上限已满提醒', {
        confirmButtonText: '我知道了',
        callback: action => {}
      })
      return
    }
    this.$router.push({ name: 'workZonePost'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   路由切换
   */
  routeJump(id, routeName) {
    this.$router.push({ name: routeName, query: { id } })
  }
}
