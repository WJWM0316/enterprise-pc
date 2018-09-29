import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'response-list',
  methods: {
    ...mapActions([
      'getLiveProblemListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'liveProblemList'
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
export default class BroadcastReponse extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'askContent',
      label: '提问内容',
      align: 'center',
      showTips: 'no',
      width: '40%'
    },
    {
      prop: 'askMan',
      label: '提问人',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'replyContent',
      label: '回答内容',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'replyMan',
      label: '回答者',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'del-3'
        },
        {
          label: '正常',
          value: 'del-1'
        },
        {
          label: '已删除',
          value: 'del-0'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'no',
      width: '50%'
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
    this.form = Object.assign(this.form, this.$route.query, this.$route.params)
    this.getLiveReviewList()
  }

  /**
   * 获取课程列表
   */
  getLiveReviewList({ page, pageSize } = {}) {
    const params = {
      live_id: this.form.id,
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize
    }
    if(this.form.del) {
      params.del = Number(this.form.del) === 3 ? '' : this.form.del
    }
    this.getLiveProblemListApi(params)
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
    console.log(item)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-28
   * @detail   重置单元行样式
   * @return   {[type]}   [description]
   */
  tableRowClassName({row}) {
    if(row.status === 0) {
      return 'row-delete'
    } else {
      return 'row-exist'
    }
  }
}
