import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'broadcast-list',
  methods: {
    ...mapActions([
      'getLiveListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'liveLists'
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
      showTips: 'yes',
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
      prop: 'categoryName',
      label: '分类',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filteredValue:
      [
        {
          label: '上线',
          value: 'categoryId-1'
        },
        {
          label: '下线',
          value: 'categoryId-0'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      showTips: 'no',
      width: '10%'
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
      showTips: 'no',
      width: '20%'
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

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   获取直播列表
   * @return   {[type]}   [description]
   */
  getLiveLists({ page, pageSize } = {}) {
    const params = {
      page: page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.liveName) {
      params.liveName = this.form.liveName
    }
    if(this.form.status) {
      params.status = this.form.status
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
}
