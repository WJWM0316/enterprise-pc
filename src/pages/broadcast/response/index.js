import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import MyAudio from 'COMPONENTS/myAudio/index.vue'

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
    SearchBar,
    MyAudio
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
      width: '25%'
    },
    {
      prop: 'askMan',
      label: '提问人',
      align: 'left',
      showTips: 'no',
      width: '16%'
    },
    {
      prop: 'replyContent',
      label: '回答内容',
      align: 'left',
      showTips: 'no',
      width: '25%'
    },
    {
      prop: 'replyMan',
      label: '回答者',
      align: 'left',
      showTips: 'no',
      width: '16%'
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
      label: '操作',
      align: 'left',
      showTips: 'yes',
      width: '8%',
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
      page: page || this.form.page,
      count: this.zikeDefaultPageSize
    }
    if(Number(this.form.del) || Number(this.form.del) === 0) {
      params.del = Number(this.form.del) === 3 ? '' : this.form.del
    } else {
      delete params.del
    }
    if(this.form.name) {
      params.name = this.form.name
    } else {
      delete params.name
    }
    this.getLiveProblemListApi(params)
        .then(() => {
          console.log(this.liveProblemList)
        })
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery({name: this.form.name, page: 1})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   列表待办项
   */
  todoAction(type, item) {
    switch(type) {
      case 'delete':
        this.$confirm('当前改内容被隐藏后，员工端将不显示这条内容，可通过回复内容显示，是否确定隐藏？', '确定要隐藏这条内容么？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.deleteLiveProblemCommentApi({problem_id: item.id, globalLoading: true})
              .then(() => {
                this.getLiveProblemList()
              })
        })
        .catch(action => {})
        break
      case 'recover':
        this.$confirm('该内容恢复将重新在原问答区内显示，是否确定恢复？', '恢复内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.recoverLiveProblemCommentApi({problem_id: item.id, globalLoading: true})
              .then(() => {
                this.getLiveProblemList()
              })
        })
        .catch(action => {})
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
