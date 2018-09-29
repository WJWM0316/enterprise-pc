import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import VueAudio from '@/components/vueAudio/index.vue'

@Component({
  name: 'review-list',
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
    SearchBar,
    VueAudio
  }
})
export default class BroadcastReview extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '查看内容',
      align: 'center',
      showTips: 'no',
      width: '40%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'type-all'
        },
        {
          label: '文本',
          value: 'type-text'
        },
        {
          label: '图片',
          value: 'type-img'
        },
        {
          label: '语音',
          value: 'type-audio'
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
      width: '15%',
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
      filterPlacement: '正常：在前台正常露出的内容会显示该状态,已删除：被删除的内容会显示该状态，在前台将被隐藏 '
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
      showTips: 'yes',
      width: '15%',
      filterPlacement: '管理直播内容'
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
      id: this.form.id,
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.status) {
      params.status = this.form.status
    }
    if(this.form.type) {
      params.type = this.form.type === 'all' ? '' : this.form.type
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
  todoAction(type, item) {
    switch(type) {
      case 'delete':
        this.$confirm('是否删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.updateLiveApi({id: item.messageId, status: 0, globalLoading: true})
              .then(() => {
                this.getLiveReviewList()
              })
        })
        .catch(action => {
          this.$message({type: 'info', message: '取消操作~'})
        })
        break
      case 'recover':
        this.$confirm('是否恢复该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.updateLiveApi({id: item.messageId, status : 1, globalLoading: true})
              .then(() => {
                this.getLiveReviewList()
              })
        })
        .catch(action => {
          this.$message({type: 'info', message: '取消操作~'})
        })
        break
      default:
        break
    }
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
