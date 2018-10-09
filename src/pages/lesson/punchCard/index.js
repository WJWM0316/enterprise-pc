import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import { getLessonPunchListsApi, putLessonPunchApi, deleteLessonPunchApi ,deleteLessonPunchCommentApi ,postLessonPunchCommentApi } from 'API/lesson'

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
      prop: 'cardContent',
      label: '打卡内容',
      align: 'center',
      showTips: 'no',
      width: '30%'
    },
    {
      prop: 'punchCardStatus',
      label: '状态',
      align: 'center',
      showTips: 'yes',
      width: '15%',
      filteredValue:
      [
        {
          label: '正常',
          value: 'status-1'
        },
        {
          label: '已删除',
          value: 'status-0'
        },
        {
          label: '全部',
          value: 'status-all'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'releaseUser',
      label: '发布者',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'punchCardTime',
      label: '建立时间',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '15%',
      filterPlacement: '这里输入一段长文字作为视觉预览。'
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
    confirmType: 'danger',
    width: '432px',
    height: '192px',
    confirm: ''
  }
  cardList = []
  course_id = ''
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form,this.$route.query || {})
    console.log(this.form)
    this.course_section_id = this.$route.query.course_section_id
    this.course_id = this.$route.query.course_id
    this.getLists()
  }

  confirm(){
    console.log(this[this.model.confirm])
    this[this.model.confirm]()
  }
  /**
   * 获取列表
   */
  getLists({ page, pageSize } = {}) {
    //this.course_section_id = 13
    let data = {
        search:{
          like: {title: this.form.name},
          order:{created_at: 'DESC'},
          course_section_id:this.course_section_id
        },
        otherSearch:{ realname: this.form.name}
      }
    let jsonDataString = JSON.stringify(data)
    console.log(jsonDataString)
    let UrlString = encodeURIComponent(jsonDataString)
    let param = {
      jsonData: UrlString,
      page: page || this.form.page || 1,
      pageCount: this.zikeDefaultPageSize
    }

    console.log(param)
    getLessonPunchListsApi(param).then(res=>{
      console.log(res)
      this.cardList = {
        list : res.data.data,
        total: res.data.meta.total
      }
    })
  }

  // 点击搜索时触发
  handleSearch() {
    this.getLists()
  }

  //【课节打卡】删除评论
  deleteComment(){

    deleteLessonPunchCommentApi({commentId: this.model.itemSel.commentId}).then(res=>{
      console.log(res)
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】取消设置热评
  cancelExcellent(){

    deleteLessonPunchApi({commentId: this.model.itemSel.commentId}).then(res=>{
      console.log(res)
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】设置热评
  putLessonPunch(){

    putLessonPunchApi({commentId: this.model.itemSel.commentId}).then(res=>{
      console.log(res)
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】恢复已删除的评论
  recover(){
    postLessonPunchCommentApi({commentId: this.model.itemSel.commentId}).then(res=>{
      console.log(res)
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  todoAction(type, item) {
    console.log(item)

    this.model.show = true
    this.model.itemSel = item 
    switch(type) {
      case 'delete':
        this.model.txt = '删除后的内容前台不可见'
        this.model.confirm = 'deleteComment'
        //this.deleteComment(item)
        break
      case 'cancelExcellent':
        this.model.txt = '把该打卡取消优秀打卡'
        this.model.confirm = 'cancelExcellent'

        //this.cancelExcellent(item)
        break
      case 'excellent':
        this.model.txt = '把该打卡设为优秀打卡'
        this.model.confirm = 'putLessonPunch'

        //this.putLessonPunch(item)
        break
      case 'recover':
        this.model.txt = '恢复后内容前台可见'
        this.model.confirm = 'recover'

        //this.recover(item)
        break
      case 'punch':
        //this.showMsg({ content: '开发中~', type: 'error', duration: 3000 })
        break
      default:
        break
    }
  }
}
