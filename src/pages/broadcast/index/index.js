import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'broadcast-list',
  methods: {
    ...mapActions([
      'getLiveListApi',
      'getCategoryListsApi',
      'getVersionInfoApi'
    ])
  },
  computed: {
    ...mapGetters([
      'liveLists',
      'categoryList',
      'versionInfo'
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
export default class BroadcastIndex extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'liveName',
      label: '直播',
      align: 'left',
      showTips: 'no',
      width: '28%'
    },
    {
      prop: 'statusName',
      label: '状态',
      align: 'left',
      showTips: 'no',
      width: '8%',
      filteredValue:
      [
        {
          label: '未开始',
          value: 'status-1'
        },
        {
          label: '进行中',
          value: 'status-2'
        },
        {
          label: '已结束',
          value: 'status-3'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'onlineStatusName',
      label: '是否上线',
      align: 'left',
      showTips: 'yes',
      width: '12%',
      filteredValue:
      [
        {
          label: '上线',
          value: 'isOnline-1'
        },
        {
          label: '下线',
          value: 'isOnline-0'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'categoryName',
      label: '分类',
      align: 'left',
      showTips: 'no',
      width: '8%',
      filteredValue: [],
      filterPlacement: '测试啦'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'left',
      showTips: 'yes',
      width: '8%',
      filterPlacement: '排序的序号数字越小，在员工端排在越前面；反之，在员工端排在越后面'
    },
    {
      prop: 'expectedStartTime',
      label: '开始时间',
      align: 'left',
      showTips: 'no',
      width: '16%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      align: 'left',
      width: '20%',
      filterPlacement: '编辑：编辑相关详细内容 <br/> 问答区：管理直播中的相关问答 <br/> 直播回顾：管理直播内容'
    }
  ]

  // 搜索表单
  form = {
    liveName: ''
  }

  init() {
    this.form = {}
    this.form = Object.assign(this.form, this.$route.query)
    this.getLiveLists()
  }

  created() {
    this.getVersionInfoApi()
    this.getCategoryListsApi({default: 1})
        .then(() => {
          this.categoryList.map(field => {
            this.fields[3].filteredValue.push({
              label: field.categoryName,
              value: `categoryId-${field.categoryId}`
            })
          })
          this.fields[3].filteredValue.unshift({label: '全部', value: 'categoryId-all'})
        })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取直播列表
   * @return   {[type]}   [description]
   */
  getLiveLists({ page, pageSize } = {}) {
    const params = {
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize,
      // globalLoading: true
    }
    if(this.form.liveName) {
      params.liveName = this.form.liveName
    }
    if(this.form.status) {
      params.status = this.form.status
    }
    if(this.form.isOnline) {
      params.isOnline = this.form.isOnline
    }
    if(this.form.categoryId) {
      params.categoryId = this.form.categoryId
      if(this.form.categoryId === 'all') {
        delete params.categoryId
      }
    }
    this.getLiveListApi(params)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   点击搜索时触发
   * @return   {[type]}   [description]
   */
  handleSearch() {
    this.form.page = 1
    this.setPathQuery(this.form)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   添加课程
   */
  addBroadcast() {
    const versionInfo = this.versionInfo
    if(versionInfo.created.courseCount >= versionInfo.enable.courseCount) {
      this.$alert('直播创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '创建直播上限已满提醒', {
        confirmButtonText: '我知道了',
        callback: action => {}
      })
      return
    }
    this.$router.push({ name: 'broadcastPost'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   路由跳转
   */
  routeJump(id, routeName) {
    this.$router.push({name: routeName, query: {id}})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-28
   * @detail   重置单元行样式
   * @return   {[type]}   [description]
   */
  tableRowClassName({row}) {
    if(row.status === 1) {
      return 'row-undo'
    } else if(row.status === 2) {
      return 'row-doing'
    } else {
      return 'row-end'
    }
  }
}
