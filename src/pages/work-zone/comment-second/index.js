import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import MyPrompt from 'COMPONENTS/prompt/index.vue'
@Component({
  name: 'note-list',
  methods: {
    ...mapActions([
      'showMsg',
      'deleteJobCircleNoteApi',
      'setJobCircleNotetoTopApi',
      'updateJobCircleNoteVisibleApi',
      'recoverJobCircleNoteApi',
      'getJobCircleCommentSecondListsApi',
      'deleteJobCircleCommentApi',
      'recoverJobCircleCommentApi',
      'setJobCircleHotCommentApi',
      'cancleJobCircleHotCommentApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleCommentSecondLists'
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
      align: 'center',
      showTips: 'no',
      width: '40%'
    },
    {
      prop: 'userName',
      label: '发布者',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'createdAt',
      label: '建立时间',
      align: 'center',
      showTips: 'no',
      width: '20%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '10%',
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
    this.form = Object.assign(this.form, this.$route.query, this.$route.params)
    this.getJobCircleCommentFirstLists()
  }

  /**
   * 获取课程列表
   */
  getJobCircleCommentFirstLists({ page, pageSize } = {}) {
    const params = {
      id: this.form.id,
      page: page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    this.getJobCircleCommentSecondListsApi(params)
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
      case 'delete':
        this.$confirm('是否删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteJobCircleCommentApi({id: item.id, globalLoading: true})
              .then(() => {
                this.getJobCircleCommentFirstLists()
              })
        })
        .catch(action => {
          this.$message({type: 'info', message: '取消操作~'})
        })
        break
      case 'recover':
        this.recoverJobCircleCommentApi({id: item.id, globalLoading: true})
            .then(() => {
              this.getJobCircleCommentFirstLists()
            })
        break
      default:
        break
    }
  }
  confirm() {}
  cancel() {}
}
