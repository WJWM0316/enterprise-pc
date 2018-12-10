import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import MyAudio from 'COMPONENTS/myAudio/index.vue'
import LinkViewer from 'COMPONENTS/linkViewer/index.vue'
import ImagesViewer from 'COMPONENTS/imagesViewer/index.vue'
import FileViewer from 'COMPONENTS/fileViewer/index.vue'
import VideoViewer from 'COMPONENTS/videoViewer/index.vue'

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
    MyAudio,
    LinkViewer,
    ImagesViewer,
    FileViewer,
    VideoViewer
  }
})
export default class BroadcastReview extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '查看内容',
      align: 'left',
      showTips: 'no',
      width: '35%',
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
      prop: 'realname',
      label: '发布人',
      align: 'left',
      showTips: 'no',
      width: '20%'
    },
    {
      prop: 'statusName',
      label: '状态',
      align: 'left',
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
      label: '发布时间',
      align: 'left',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操作',
      showTips: 'yes',
      width: '15%',
      filterPlacement: '删除/恢复：删除该内容，会导致内容不在员工端显示；删除后可以使用恢复来让内容重新在员工端显示'
    }
  ]

  // 搜索表单
  form = {
    status: '',
    searchContent: ''
  }

  // 查看视屏
  videoViewer = {
    show: false,
    data: {}
  }

  // 查看图片
  imagesViewer = {
    show: false,
    list: []
  }

  // 查看连接
  linkViewer = {
    show: false,
    data: {}
  }

  // 查看文件
  fileViewer = {
    show: false,
    data: {}
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
    } else {
      delete params.type
    }
    if(this.form.searchContent) {
      params.searchContent = this.form.searchContent
    } else {
      delete params.searchContent
    }
    this.getLiveReviewListApi(params)
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery({searchContent: this.form.searchContent, page: 1})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-21
   * @detail   列表待办项
   */
  todoAction(type, item) {
    switch(type) {
      case 'delete':
        this.$confirm('当前该内容会被隐藏后，员工端将不可显示这条内容，可通过恢复内容重新显示，是否确定隐藏？', '确定要隐藏这条内容么？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.updateLiveApi({id: item.messageId, status: 0, globalLoading: true})
              .then(() => {
                this.getLiveReviewList()
              })
        })
        .catch(action => {})
        break
      case 'recover':
        this.$confirm('该内容恢复将重新在原直播回顾内显示，是否确定恢复？', '恢复内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.updateLiveApi({id: item.messageId, status : 1, globalLoading: true})
              .then(() => {
                this.getLiveReviewList()
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
    if(row.status === 0) {
      return 'row-delete'
    } else {
      return 'row-exist'
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-10-10
   * @detail   查看图片
   * @return   {[type]}   [description]
   */
  cancel(type) {
    this.imagesViewer.show = true
  }

  /**
   * @Author   小书包
   * @DateTime 2018-10-12
   * @detail   查看大图
   * @return   {[type]}   [description]
   */
  handleViewImage(item) {
    if(item.status === 0) return
    this.imagesViewer.show = true
    this.imagesViewer.list.push(item.file)
  }
}
