import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'

@Component({
  name: 'lighthouse-list',
  methods: {
    ...mapActions(['getJobCircleListsApi'])
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
    TableList
  }
})
export default class BroadcastList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'name',
      label: '课 程',
      align: 'center',
      showTips: 'no',
      width: '45%'
    },
    {
      prop: 'zhuangtai',
      label: '状态',
      align: 'center',
      showTips: 'no',
      width: '10%',
      filteredValue:
      [
        {
          label: '上线',
          value: 'zhuangtai-1'
        },
        {
          label: '下线',
          value: 'zhuangtai-0'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
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
      prop: 'fenlei',
      label: '分类',
      align: 'center',
      showTips: 'no',
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
      prop: 'time',
      label: '开始时间',
      showTips: 'no',
      width: '15%'
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
      width: '25%'
    }
  ]

  // 搜索表单
  form = {
    name: ''
  }

  // 初始化的搜索表单
  initForm = {
    name: ''
  }

  // 分页信息
  pagination = {
    page: 1,
    pageSize: this.zikeDefaultPageSize,
    pageCount: 0,
    total: 0
  }

  searchType = '1'

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { name: 'string' })
    this.form = Object.assign(this.initForm, form || {})
    this.pagination = Object.assign(this.pagination, pagination || {})
    this.getWorkZoneLists()
  }

  /**
   * 获取课程列表
   */
  getWorkZoneLists() {
    const params = {page: 1, count: 20, ...this.$route.query}
    if (this.form.name) {
      params.name = this.form.name
    }
    this.getJobCircleListsApi(params)
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery(this.form)
    this.getWorkZoneLists()
  }

  /**
   * @Author   小书包
   * @DateTime 新增直播跳转
   * @detail   detail
   */
  addBroadcast() {
    this.$router.push({ name: 'broadcastPost'})
  }

  todoAction(type, item) {
    switch(type) {
      case 'edit':
        this.$router.push({
          name: 'broadcastUpdate',
          params: {
            id: item.id
          }
        })
        break
      case 'note':
        break
      case 'menber':
        break
      default:
        break
    }
  }
}
