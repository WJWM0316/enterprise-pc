import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'note-list',
  methods: {
    ...mapActions([
      'getJobCircleListsApi',
      'showMsg',
      'getJobCircleNoteListsApi'
    ])
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
    TableList,
    SearchBar
  }
})
export default class NoteList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'name',
      label: '课 程',
      align: 'center',
      showTips: 'no',
      width: '55%'
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
      width: '15%',
      filterPlacement: '吊炸天的操作~'
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

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form, this.$route.query)
    this.getWorkZoneLists()
  }

  /**
   * 获取课程列表
   */
  getWorkZoneLists() {
    const params = {page: 1, count: 20, ...this.$route.query}
    if(this.form.name) {
      params.name = this.form.name
    }
    this.getJobCircleListsApi(params)
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
        this.showMsg({ content: '删除操作~', type: 'error', duration: 3000 })
        break
      case 'hide':
        this.showMsg({ content: '隐藏操作~', type: 'error', duration: 3000 })
        break
      case 'top':
        this.showMsg({ content: '置顶操作~', type: 'error', duration: 3000 })
        break
      default:
        break
    }
  }
  created() {
    this.getJobCircleNoteListsApi()
  }
}
