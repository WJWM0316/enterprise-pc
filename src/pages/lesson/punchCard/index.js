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
      prop: 'title',
      label: '打卡内容',
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
      label: '发布者',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'sort',
      label: '建立时间',
      align: 'center',
      showTips: 'no',
      width: '10%'
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

  lessonList = []
  course_id = ''
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    console.log('init----',this.$route)
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { name: 'string' })
    this.form = Object.assign(this.initForm, form || {})
    this.pagination = Object.assign(this.pagination, pagination || {})
    this.course_section_id = this.$route.query.course_section_id

    this.getLists()
  }

  /**
   * 获取列表
   */
  getLists() {
    let data = {
      like: {
        title:this.form.name
      },
      order: {
        update_time: 'DESC',
        favors_count: 'DESC',
        comments_count: 'DESC'
      },
      course_section_id: this.course_section_id
    }
    let jsonDataString = JSON.stringify({search: data})
    console.log(jsonDataString)
    let UrlString = encodeURIComponent(jsonDataString)
    let param = {
      jsonData: UrlString,
      page: 1,
      pageCount: 20
    }

    console.log(param)
    getLessonPunchListsApi(param).then(res=>{
      console.log(res)
      this.lessonList = res.data.data
    })
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery(this.form)
    this.getWorkZoneLists()
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
