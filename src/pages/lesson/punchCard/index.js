import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import { getLessonPunchListsApi, putLessonPunchApi, deleteLessonPunchApi ,distoryAndRegaihnLessonPunchApi ,setExcellentCourseCardApi } from 'API/lesson'

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
      width: '10%',
      filteredValue:
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
      filterPlacement: '正常：在前台正常露出的内容会显示该状态<br/>已删除：被删除的内容会显示该状态，在前台将被隐藏'
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
      width: '20%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '15%',
      filterPlacement: '删除/恢复：删除该内容，会导致内容不在员工端显示；删除后可以使用恢复来让内容重新在员工端显示<br/>优秀打卡/取消优秀：把打卡内容设置为优秀打卡或者取消优秀打卡<br/>评论：进入评论内容管理页面'
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
          like: {card_content: this.form.name},
          order:{created_at: 'DESC'},
          course_section_id:this.course_section_id,
          is_punch_card: this.form.is_punch_card|| 2,
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

      console.log(res)
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
    console.log(item)

    if(type!=='comment'){
      this.model.show = true
    }
    this.model.itemSel = item 
    switch(type) {
      case 'delete':
        this.model.txt = '删除后的内容前台不可见'
        this.model.confirm = 'deleteComment'
        break
      case 'cancelExcellent':
        this.model.txt = '把该打卡取消优秀打卡'
        this.model.confirm = 'cancelExcellent'
        break
      case 'excellent':
        this.model.txt = '把该打卡设为优秀打卡'
        this.model.confirm = 'putLessonPunch'
        break
      case 'recover':
        this.model.txt = '恢复后内容前台可见'
        this.model.confirm = 'recover'
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
