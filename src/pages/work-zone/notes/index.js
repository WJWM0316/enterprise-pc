import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'note-list',
  methods: {
    ...mapActions([
      'showMsg',
      'getJobCircleNoteListsApi',
      'deleteJobCircleNoteApi',
      'setJobCircleNotetoTopApi',
      'updateJobCircleNoteVisibleApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleNoteLists'
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
export default class NoteList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '帖子内容',
      align: 'center',
      showTips: 'no',
      width: '30%'
    },
    {
      prop: 'realname',
      label: '发布者',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'type',
      label: '文件类型',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'visible',
      label: '是否公开',
      align: 'center',
      showTips: 'yes',
      width: '15%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'visible-3'
        },
        {
          label: '公开',
          value: 'visible-0'
        },
        {
          label: '隐藏',
          value: 'visible-1'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'deletedAt',
      label: '状态',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'delete-3'
        },
        {
          label: '正常',
          value: 'delete-0'
        },
        {
          label: '已删除',
          value: 'delete-1'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'createdAt',
      label: '建立时间',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '30%',
      filterPlacement: '吊炸天的操作~'
    }
  ]

  // 搜索表单
  form = {
    keyword: ''
  }

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form, this.$route.query, this.$route.params)
    this.getJobCircleNoteLists()
  }

  /**
   * 获取课程列表
   */
  getJobCircleNoteLists({ page, pageSize } = {}) {
    console.log(1)
    const params = {
      id: this.form.id,
      page: page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.visible) {
      params.visible = this.form.visible === '3' ? '' : this.form.visible
    }
    if(this.form.delete) {
      params.delete = this.form.delete === '3' ? '' : this.form.delete
    }
    if(this.form.keyword) {
      params.keyword = this.form.keyword
    }
    this.getJobCircleNoteListsApi(params)
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
        this.showMsg({ content: '评论操作~', type: 'error', duration: 3000 })
        break
      case 'delete':
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteJobCircleNoteApi({id: item.id})
              .then(() => {
                this.getJobCircleNoteLists()
              })
        })
        break
      case 'hide':
        this.updateJobCircleNoteVisibleApi({id: item.id, visible: item.visible === '公开' ? 1 : 0})
            .then(() => {
              this.getJobCircleNoteLists()
            })
        break
      case 'top':
        this.setJobCircleNotetoTopApi({id: item.id})
            .then(() => {
              this.getJobCircleNoteLists()
            })
        break
      default:
        break
    }
  }
}
