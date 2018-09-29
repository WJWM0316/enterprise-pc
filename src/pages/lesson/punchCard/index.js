import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getLessonPunchListsApi } from 'API/lesson'

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
      label: '是否上线',
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

  cardList = []
  course_id = ''
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form,this.$route.query || {})
    console.log(this.form)
    this.course_section_id = this.$route.query.course_section_id
    this.getLists()
  }

  /**
   * 获取列表
   */
  getLists({ page, pageSize } = {}) {
    this.course_section_id = 13
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

  //设置排序
  setSort(){
    
  }

  todoAction(type, item) {
    console.log(item)
    switch(type) {
      case 'edit':
        this.$router.push(
          { name: 'lessonEdit',
            query: {
              id: item.courseSectionId,
              course_id: this.course_id
            }
          }
        )
        break
      case 'add':
        this.$router.push({ name: 'lessonAdd',query:{course_id: this.course_id}})
        break
      case 'punch':
        //this.showMsg({ content: '开发中~', type: 'error', duration: 3000 })
        break
      default:
        break
    }
  }
}
