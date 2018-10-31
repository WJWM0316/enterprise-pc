import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import MyPrompt from 'COMPONENTS/prompt/index.vue'
@Component({
  name: 'comment-list',
  methods: {
    ...mapActions([
      'showMsg',
      'deleteJobCircleNoteApi',
      'setJobCircleNotetoTopApi',
      'updateJobCircleNoteVisibleApi',
      'recoverJobCircleNoteApi',
      'getJobCircleCommentFirstListsApi',
      'deleteJobCircleCommentApi',
      'recoverJobCircleCommentApi',
      'setJobCircleHotCommentApi',
      'cancleJobCircleHotCommentApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleCommentFirstLists'
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
    MyPrompt
  }
})
export default class CommentList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '评论内容',
      align: 'left',
      showTips: 'no',
      width: '34%'
    },
    {
      prop: 'userName',
      label: '发布者',
      align: 'left',
      showTips: 'no',
      width: '13%'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'left',
      showTips: 'yes',
      width: '13%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'status-3'
        },
        {
          label: '正常',
          value: 'status-0'
        },
        {
          label: '已删除',
          value: 'status-1'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'createdAt',
      label: '建立时间',
      align: 'left',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      align: 'left',
      width: '20%',
      filterPlacement: '吊炸天的操作~'
    }
  ]

  // 搜索表单
  form = {
    keyword: ''
  }

  // 确认信息弹窗
  models = {
    show: true,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    type: 'confirm'
  }

  /**
   * 初始化表单、分页页面数据
   */
  init() {


    console.log(this.$route.query)
    this.form = Object.assign(this.form, this.$route.query, this.$route.params)
    this.getJobCircleCommentFirstLists()
  }

  /**
   * 获取课程列表
   */
  getJobCircleCommentFirstLists({ page, pageSize } = {}) {
    const params = {
      postId: this.form.id,
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.visible) {
      params.visible = this.form.visible === '3' ? '' : this.form.visible
    }
    if(this.form.status) {
      params.status = this.form.status === '3' ? '' : this.form.status
    }
    if(this.form.keyword) {
      params.keyword = this.form.keyword
    }
    this.getJobCircleCommentFirstListsApi(params)
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery(this.form)
  }

  // 添加课程-跳转
  addWorkZone() {
    this.$router.push({ name: 'workZonePost'})
  }

  todoAction(type, item) {
    switch(type) {
      case 'comment':
        this.$router.push({
          name: 'commentSecondList',
          query: {
            noteId: this.$route.query.noteId,
            firstId: this.$route.query.id,
            id: item.id
          }
        })
        break
      case 'delete':
        this.$confirm('是否删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteJobCircleCommentApi({id: item.id, globalLoading: true})
              .then(() => {
                this.getJobCircleCommentFirstListsApi()
              })
        })
        .catch(action => {
          this.$message({type: 'info', message: '取消操作~'})
        })
        break
      case 'hot':
        this.setJobCircleHotCommentApi({id: item.id, globalLoading: true})
            .then(() => {
              this.getJobCircleCommentFirstListsApi()
            })
        break
      case 'cancelHot':
        this.cancleJobCircleHotCommentApi({id: item.id, globalLoading: true})
            .then(() => {
              this.getJobCircleCommentFirstListsApi()
            })
        break
      case 'recover':
        this.recoverJobCircleCommentApi({id: item.id, globalLoading: true})
            .then(() => {
              this.getJobCircleCommentFirstListsApi()
            })
        break
      default:
        break
    }
  }
  confirm() {}
  cancel() {}
}
