import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'broadcast-list',
  methods: {
    ...mapActions([
      'getLiveListApi',
      'getCategoryListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'liveLists',
      'categoryList'
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
      label: '直 播',
      align: 'center',
      showTips: 'no',
      width: '35%'
    },
    {
      prop: 'statusName',
      label: '状态',
      align: 'center',
      showTips: 'no',
      width: '10%',
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
      align: 'center',
      showTips: 'yes',
      width: '10%',
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
      align: 'center',
      showTips: 'no',
      width: '10%',
      filteredValue: [],
      filterPlacement: '测试啦'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '排序的序号数字越小，在员工端排在越前面；反之，在员工端排在越后面'
    },
    {
      prop: 'expectedStartTime',
      label: '开始时间',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '20%',
      filterPlacement: '编辑：编辑相关详细内容 <br/> 问答区：管理直播中的相关问答 <br/> 直播回顾：管理直播内容'
    }
  ]

  // 搜索表单
  form = {
    liveName: ''
  }

  init() {
    this.form = Object.assign(this.form, this.$route.query)
    this.getLiveLists()
  }

  created() {
    this.getCategoryListsApi()
        .then(() => {
          this.categoryList.map(field => {
            this.fields[3].filteredValue.push({
              label: field.categoryName,
              value: `categoryId-${field.categoryId}`
            })
          })
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
      globalLoading: true
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
    this.setPathQuery(this.form)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   添加课程
   */
  addBroadcast() {
    this.$router.push({ name: 'broadcastPost'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   路由跳转
   */
  routeJump(id, routeName) {
    this.$router.push({name: routeName, params: {id}})
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
