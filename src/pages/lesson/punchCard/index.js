import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list_copy/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import { getLessonPunchListsApi ,distoryAndRegaihnLessonPunchApi ,setExcellentCourseCardApi } from 'API/lesson'

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
      align: 'left',
      width: '30%'
    },
    {
      prop: 'punchCardStatus',
      label: '状态',
      align: 'left',
      width: '10%',
      dropdown:
      [ 
        {
          label: '全部',
          value: 'is_punch_card-2'
        },
        {
          label: '正常',
          value: 'is_punch_card-1'
        },
        {
          label: '已删除',
          value: 'is_punch_card-0'
        }
      ],
      tooltip: '正常：在前台正常露出的内容会显示该状态<br/>已删除：被删除的内容会显示该状态，在前台将被隐藏'
    },
    {
      prop: 'realname',
      label: '发布者',
      align: 'left',
      width: '15%'
    },
    {
      prop: 'punchCardTime',
      label: '建立时间',
      align: 'left',
      width: '20%'
    },
    {
      prop: 'actions',
      label: '操作',
      align: 'left',
      width: '15%',
      tooltip: '删除/恢复：删除该内容，会导致内容不在员工端显示；删除后可以使用恢复来让内容重新在员工端显示<br/>优秀打卡/取消优秀：把打卡内容设置为优秀打卡或者取消优秀打卡<br/>评论：进入评论内容管理页面'
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
  cardList = {
    list: [],
    total: 0,
    page: 1,
  }
  course_id = ''
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form,this.$route.query || {})
    this.course_section_id = this.$route.query.course_section_id
    this.course_id = this.$route.query.course_id
    this.getLists()
  }

  confirm(){
    this[this.model.confirm]()
  }
  /**
   * 获取列表
   */
  getLists({ page, pageSize } = {}) {
    //this.course_section_id = 13
    let data = {
        search:{
          like: {card_content: this.form.name},
          order:{created_at: 'DESC'},
          course_section_id:this.course_section_id,
          is_punch_card: this.form.is_punch_card|| 2,
        },
        otherSearch:{ realname: this.form.name}
      }
    let jsonDataString = JSON.stringify(data)
    let UrlString = encodeURIComponent(jsonDataString)
    let param = {
      jsonData: UrlString,
      page: page || this.form.page || 1,
      pageCount: this.zikeDefaultPageSize
    }
    getLessonPunchListsApi(param).then(res=>{
      this.cardList = {
        list : res.data.data,
        total: res.data.meta.total,
        page: this.form.page || 1
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
      course_section_card_id: this.model.itemSel.courseSectionCardId,
      is_pusnch_card: 0
    }
    distoryAndRegaihnLessonPunchApi(data).then(res=>{
      this.model.show = false
      this.getLists()
    }).catch(err => {
      //this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】恢复已删除的评论
  recover(){
    let data = {
      course_section_card_id: this.model.itemSel.courseSectionCardId,
      is_pusnch_card: 1
    }
    distoryAndRegaihnLessonPunchApi(data).then(res=>{
      this.model.show = false
      this.getLists()
    }).catch(err => {
      //this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】取消设置热评
  cancelExcellent(){
    let data = {
      course_section_card_id: this.model.itemSel.courseSectionCardId,
      is_set_excellent_card: 0
    }
    setExcellentCourseCardApi(data).then(res=>{
      this.model.show = false
      this.getLists()
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  //【课节打卡】设置热评
  putLessonPunch(){
    let data = {
      course_section_card_id: this.model.itemSel.courseSectionCardId,
      is_set_excellent_card: 1
    }
    setExcellentCourseCardApi(data).then(res=>{
      this.model.show = false
      this.getLists()
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  

  todoAction(type, item) {
    if(type!=='comment'){
      // this.model.show = true
    }
    this.model.itemSel = item 
    switch(type) {
      case 'delete':
        this.$confirm('当前该内容会被隐藏后，员工端将不可显示这条内容，可通过恢复内容重新显示，是否确定隐藏？', '确定要隐藏这条内容么？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.deleteComment()
        })
        .catch(action => {})
        break
      case 'cancelExcellent':
        this.$confirm('你确定该内容取消优秀打卡？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.cancelExcellent()
        })
        .catch(action => {})
        break
      case 'excellent':
        this.$confirm('你确定该内容评为优秀打卡？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.putLessonPunch()
        })
        .catch(action => {})
        break
      case 'recover':
        this.$confirm('该内容恢复将重新在原课节内显示，是否确定恢复？', '恢复内容', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.recover()
        })
        .catch(action => {})
        break
      case 'comment':
        this.$router.push(
          { name: 'comment',
            query: {
              course_section_id: this.$route.query.course_section_id,
              course_id: this.$route.query.course_id,
              postId: item.courseSectionCardId
            }
          }
        )
        break
      default:
        break
    }
  }
}
