import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getMemberListApi, getGroupListApi, deleteGroupApi } from '@/store/api/organization.js'

@Component({
  name: 'group-manage',
  watch: {
  },
  components: {
    TableList,
    SearchBar
  }
})
export default class groupList extends Vue {

  // 表单数据
  groupList = []
  input5 = ''
  total = 50

   // 表格字段
  fields = [
    {
      prop: 'groupName',
      label: '分组',
      align: 'center'
    },
    {
      prop: 'sort',
      label: '排序',
      align: 'center'
    },
    {
      prop: 'actions',
      label: '操作',
      align: 'center'
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
    count: this.zikeDefaultPageSize,
    status: 0,
    name: ''
  }

  searchType = '1'

  created() {
    this.init()
  }


  /**
   * 初始化表单、分页页面数据
   */
  init() {
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { searchWord: 'string' })
    this.form = Object.assign(this.initForm, form || {})
    this.pagination = Object.assign(this.pagination, pagination || {})
    this.getGroupList()
  }

  /**
   * 获取课程列表
   */
  getGroupList() {
    getGroupListApi().then(res => {
      console.log(res.data.data)
      this.groupList = res.data.data
    })
  }

  deleteGroup(item) {
    deleteGroupApi({id: item.groupId}).then(res=>{
      console.log(res)
      this.$message({
        message: res.data.msg,
        type: 'success'
      });

      this.init()

    })
  }

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    this.getGroupList()
  }

  // 添加课程-跳转
  addGroup() {
    this.$router.push({ name: 'addGroup'})
  }

  todoAction(type, item) {
    console.log(item)
    switch(type) {
      case 'add':
        this.$router.push({
          name: 'addGroup'
        })
        break
      case 'edit':
        this.$router.push({
          name: 'editGroup',
          params: {
            groupId: item.groupId
          }
        })
        break
      case 'delete':
        this.deleteGroup(item)
        break
      default:
        break
    }
  }
}
