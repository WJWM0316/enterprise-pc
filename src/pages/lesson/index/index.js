import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getLessonListsApi } from 'API/lesson'

@Component({
  name: 'lighthouse-list',
  methods: {
    ...mapActions(['getJobCircleListsApi'])
  },
  computed: {
    ...mapGetters(['jobCircleLists'])
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
      label: '课 节',
      align: 'center',
      showTips: 'no',
      width: '40%'
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
        },
        {
          label: '全部',
          value: 'status-all'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'sort',
      label: '权 重',
      align: 'center',
      showTips: 'no',
      width: '10%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'sort-全部'
        },
        {
          label: '升序',
          value: 'sort-升序'
        },
        {
          label: '降序',
          value: 'sort-降序'
        }
      ],
      filterPlacement: '权重的提示文案'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '20%',
      filterPlacement: '类型的提示文案'
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

  lessonList = []
  course_id = ''
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    console.log('init----',this.$route)
    this.form = Object.assign(this.form, this.$route.query || {})
    this.course_id = this.$route.query.course_id
    console.log(this.form)
    this.getLists()
  }

  /**
   * 获取列表
   */
  getLists({ page, pageSize } = {}) {
    let data = {
      like: {
        title:this.form.name
      },
      order: {
        update_time: 'DESC',
        favors_count: 'DESC',
        comments_count: 'DESC'
      },
      course_id: this.course_id
    }
    let jsonDataString = JSON.stringify({search: data})
    console.log(jsonDataString)
    let UrlString = encodeURIComponent(jsonDataString)
    let param = {
      jsonData: UrlString,
      page: page || this.form.page || 1,
      pageCount: this.zikeDefaultPageSize
    }

    /*console.log(param)
    if(this.form.name) {
      params.name = this.form.name
    }*/

    getLessonListsApi(param).then(res=>{
      this.lessonList = {
        list: res.data.data,
        total: res.data.meta.total
      }
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
        this.$router.push({ name: 'punchCard',query:{course_section_id: item.courseSectionId}})
        break
      default:
        break
    }
  }
}
