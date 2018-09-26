import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'lighthouse-list',
  methods: {
    ...mapActions([
      'getLiveReviewListApi',
      'updateLiveApi'
    ])
  },
  computed: {
    ...mapGetters([
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
      prop: 'statusName',
      label: '状态',
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
          label: '正常',
          value: 'status-0'
        },
        {
          label: '已删除',
          value: 'status-0'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'createdAt',
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
    status: ''
  }

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form, this.$route.query, this.$route.params)
    this.getLiveReviewList()
  }

  /**
   * 获取课程列表
   */
  getLiveReviewList({ page, pageSize } = {}) {
    const params = {
      page: page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.status) {
      params.status = this.form.status
    }
    if(this.form.id) {
      params.id = this.form.id
    }
    this.getLiveReviewListApi(params)
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery(this.form)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   列表待办项
   */
  todoAction(item) {
    this.updateLiveApi({id: item.liveId, status: item.status === 1 ? 0 : 1})
  }
}
