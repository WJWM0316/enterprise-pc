import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
//import { getTutorListApi, deletetTutorApi, searchTutorApi, createTutorApi} from 'STORE/api/tutor'
import { getTutorListApi, deletetTutorApi, searchTutorApi, createTutorApi} from 'STORE/api/tutor.js'

@Component({
  name: 'tutor-list',
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
   components: {
    TableList
  }
})
export default class CourseList extends Vue {
  teaType = 'primary'
  teaType2 = ''

  // 表单数据
  tutorList = []
  input5 = ''
  total = 50

  // 表格字段
  fields = [
    {
      prop: 'realname',
      label: '导师资料',
      align: 'center'
    },
    {
      prop: 'mobile',
      label: '手机号',
      align: 'center'
    },
    {
      prop: 'communityCount',
      label: 'TA的邀请',
      align: 'center',
    },
    {
      prop: 'liveCount',
      label: 'TA的直播',
      align: 'center',
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes'
    }
  ]

  // 搜索表单
  form = {
    searchWord: ''
  }

  // 初始化的搜索表单
  initForm = {
    searchWord: ''
  }

  // 分页信息
  pagination = {
    page: 1,
    pageSize: this.zikeDefaultPageSize,
    pageCount: 0,
    total: 0
  }

  searchType = '1'

  created() {
    this.init()
  }
  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.getList()
  }

  /**
   * 获取列表
   */
  async getList() {
    let params = {
      type: this.teaType === 'primary' ? 1 : 2,
      page: 1,
      pageCount: 20
    }
    getTutorListApi(params).then(res=>{
      console.log(typeof res.data,res.data.data)
      this.tutorList = res.data.data

      console.log( this.tutorList)
    })
  }

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    this.getList()
  }

  // 添加课程-跳转
  addTea() {
    this.$router.push({ name: 'tutorPost'})
  }

  selectTea(type){
    if(type===1){
      this.teaType = 'primary'
      this.teaType2 = ''

    }else {
      this.teaType = ''
      this.teaType2 = 'primary'
    }
  }

  removeTea(){

  }
}
