import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getLessonListsApi, sortUpdateApi } from 'API/lesson'

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
          value: 'status-2'
        }
      ],
      filterPlacement: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'sort',
      label: '排序',
      align: 'center',
      width: '10%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '20%',
      filterPlacement: '编辑：编辑相关详细内容<br/>打卡：进入打卡内容管理页面'
    }
  ]

  // 搜索表单
  form = {
    name: '',
    status: 2
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
        update_time: 'DESC'
      },
      status: this.form.status || 2,
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

    //排序判断用
    this.form.page = param.page
    getLessonListsApi(param).then(res=>{
      res.data.data.map(function(value,index){
          value.sort="1"
          value.index = index
      })
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
  setSort(type,item){
    let data = {
      course_section_id: item.courseSectionId,
      isUp: ''
    }
    if(type==='up'){
      data.isUp=1
    }else if(type==='down'){
      data.isUp=0
    }

    sortUpdateApi(data).then(res=>{
      this.$message({
        message: '成功',
        type: 'success'
      })
      this.getLists()
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  todoAction(type, item) {
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
        this.$router.push({ 
          name: 'punchCard',
          query:{
            course_section_id: item.courseSectionId,
            course_id:  this.course_id
          }
        })
        break
      default:
        break
    }
  }
}
