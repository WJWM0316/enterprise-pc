import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'

import { getCommentSecondListsApi, putLessonPunchApi, cancelLessonPunchApi, deleteLessonPunchCommentApi, postLessonPunchCommentApi } from 'API/lesson'

@Component({
  name: 'lighthouse-list',
  methods: {
  },
  computed: {
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
    ModalDialog,
    TableList,
    SearchBar
  }
})
export default class CourseList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '评论内容',
      align: 'left',
      showTips: 'no',
      width: '30%'
    },
    {
      prop: 'userName',
      label: '发布者',
      align: 'left',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'left',
      showTips: 'yes',
      width: '15%',
      filteredValue:
      [ 
        {
          label: '全部',
          value: 'status-2'
        },
        {
          label: '正常',
          value: 'status-1'
        },
        {
          label: '已删除',
          value: 'status-0'
        }
      ],
      filterPlacement: '正常：在前台正常露出的内容会显示该状态<br/>已删除：被删除的内容会显示该状态，在前台将被隐藏'
    },
    {
      prop: 'updatedAt',
      label: '建立时间',
      align: 'left',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      align: 'left',
      label: '操作',
      showTips: 'yes',
      width: '15%',
      filterPlacement: '删除/恢复：删除该内容，会导致内容不在员工端显示；删除后可以使用恢复来让内容重新在员工端显示'
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

  // 确认信息弹窗
  model = {
    show: false,
    title: '提示',
    txt: '删除后该导师将无法进入，但其所有内容均会保留',
    showClose: true,
    confirmText: '确定',
    type: 'confirm',
    width: '432px',
    height: '192px',
    confirm: ''
  }
  commentData = {
    list: [],
    total: 0,
    page: 1,
  }
  course_id = ''

  pageData={
  }

  postId = null
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form,this.$route.query || {})

    this.pageData = Object.assign(this.$route.query || {})

    if(this.$route.query.postId){
      this.postId = this.$route.query.postId
    }
    //测试结束删除
    this.getLists()
  }

  confirm(){
    this[this.model.confirm]()
  }
  /**
   * 获取列表
   */
  getLists({ page, pageSize } = {}) {
    let param = {
      id: this.pageData.commentId,
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize,
      sort: 'desc'
    }

    //评论状态
    if(this.form.status === '0' || this.form.status === '1'){
      param.status = this.form.status
    }
    getCommentSecondListsApi(param).then(res=>{
      this.commentData = {
        list : res.data.data,
        total: res.data.meta.total,
        page: param.page
      }
    })
  }

  // 点击搜索时触发
  handleSearch() {
    this.getLists()
  }

  //【课节打卡】删除评论
  deleteComment(){
    let data = {
      id: this.model.itemSel.id,
      is_pusnch_card: 0
    }
    deleteLessonPunchCommentApi(data).then(res=>{
      this.getLists()
      this.model.show = false
    }).catch(err => {
      //this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】恢复已删除的评论
  recover(){
    let data = {
      id: this.model.itemSel.id,
    }
    postLessonPunchCommentApi(data).then(res=>{
      this.getLists()
      this.model.show = false
    }).catch(err => {
      //this.$message.error(err.data.msg);
    })
  }

  todoAction(type, item) {
    this.model.show = true
    this.model.itemSel = item 
    switch(type) {
      case 'delete':
        this.model.txt = '删除后的内容前台不可见'
        this.model.confirm = 'deleteComment'
        break
      case 'recover':
        this.model.txt = '恢复后内容前台可见'
        this.model.confirm = 'recover'
        break
        break
      default:
        break
    }
  }
}
