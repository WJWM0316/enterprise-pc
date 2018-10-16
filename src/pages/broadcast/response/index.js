import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'response-list',
  methods: {
    ...mapActions([
      'getLiveProblemListApi',
      'recoverLiveProblemCommentApi',
      'deleteLiveProblemCommentApi'
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
      align: 'left',
      showTips: 'no',
      width: '30%'
    },
    {
      prop: 'askMan',
      label: '提问人',
      align: 'left',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'replyContent',
      label: '回答内容',
      align: 'left',
      showTips: 'no',
      width: '30%'
    },
    {
      prop: 'replyMan',
      label: '回答者',
      align: 'left',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'left',
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
      filterPlacement: '在前台正常露出的内容会显示该状态 <br/> 已删除：被删除的内容会显示该状态，在前台将被隐藏'
    },
    {
      prop: 'actions',
      label: '操 作',
      align: 'left',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '删除/恢复：删除该内容，会导致内容不在员工端显示；删除后可以使用恢复来让内容重新在员工端显示'
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
    this.getLiveProblemList()
  }

  /**
   * 获取课程列表
   */
  getLiveProblemList({ page, pageSize } = {}) {
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
  todoAction(type, item) {
    switch(type) {
      case 'delete':
        this.$confirm('删除后该内容前台不可见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteLiveProblemCommentApi({problem_id: item.id, globalLoading: true})
              .then(() => {
                this.getLiveProblemList()
              })
        })
        .catch(action => {
          this.$message({type: 'info', message: '取消操作~'})
        })
        break
      case 'recover':
        this.$confirm('恢复后该内容前台可见', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.recoverLiveProblemCommentApi({problem_id: item.id, globalLoading: true})
              .then(() => {
                this.getLiveProblemList()
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
    if(row.status !== '正常') {
      return 'row-delete'
    } else {
      return 'row-exist'
    }
  }
}
