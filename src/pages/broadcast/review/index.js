import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'lighthouse-list',
  methods: {
    ...mapActions([
      'getLiveReviewListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
      'liveReviewList'
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
export default class BroadcastReview extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '查看内容',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'status-1'
        },
        {
          label: '文字',
          value: 'status-0'
        },
        {
          label: '图片',
          value: 'status-0'
        },
        {
          label: '语音',
          value: 'status-0'
        }
      ],
      filterPlacement: '测试啦'
    },
    {
      prop: 'fromUserName',
      label: '发布人',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'status1',
      label: '状态',
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
      prop: 'name1',
      label: '开始时间',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'no',
      width: '20%'
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
    this.getLiveReviewList()
  }

  /**
   * 获取课程列表
   */
  getLiveReviewList() {
    const params = this.$route.params
    this.getLiveReviewListApi(params)
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery(this.form)
    this.getLiveReviewList()
  }

  // 添加课程-跳转
  addBroadcast() {
    this.$router.push({ name: 'broadcastPost'})
  }

  todoAction(type, item) {
    switch(type) {
      case 'edit':
        this.$router.push({
          name: 'workZoneUpdate',
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
