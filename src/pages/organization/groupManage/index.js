import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getGroupListApi, deleteGroupApi, putGroupApi } from '@/store/api/organization.js'

@Component({
  name: 'group-manage',
  watch: {
  },
  computed: {
    pageNum () {
      let num = Math.floor(this.groupList.total/this.zikeDefaultPageSize)
      if(this.groupList.total%this.zikeDefaultPageSize!==0){
        num +=1
      }
      return num
    }
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
      width: '70%',
      align: 'left'
    },
    {
      prop: 'sort',
      label: '排序',
      width: '15%',
      align: 'left'
    },
    {
      prop: 'actions',
      label: '操作',
      width: '15%',
      align: 'left'
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

  // 设置排序
  setSort(type,item){
    let data = {
      id: item.groupId,
      type: 1
    }
    if(type==='up'){
      data.type = 1

    }else if(type==='down'){
      data.type = 2
    }

    putGroupApi(data).then(res=>{
      this.$message({
          message: '成功',
          type: 'success'
        })
      this.getGroupList()
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
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
   * 获取列表
   */
  getGroupList({ page, pageSize } = {}) {
    let data = {
      isHaveMember: 0,
      globalLoading: true,
      page: page || this.form.page || 1,
      pageCount: this.zikeDefaultPageSize,
      default: 1
    }

    this.form.page = data.page
    
    getGroupListApi(data).then(res => {
      res.data.data.map(function(value,index){
          value.sort = '1'
          value.index = index
      })
      this.groupList = {
        list: res.data.data,
        total: res.data.meta.total
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-12-07
   * @detail   删除分组
   * @return   {[type]}        [description]
   */
  deleteGroup(item) {
    const h = this.$createElement;
    // 该组没有成员
    if(item.count === 0) {
      deleteGroupApi({id: item.groupId}).then(res=>{
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.init()
      })
      return
    }
    this.$msgbox({
      title: '删除确认提醒',
      message: h('div', null, [
        h('span', null, '删除 '),
        h('span', { style: 'color: #FA6A30' }, item.groupName),
        h('span', null, ' 该分组后，所属成员将全部转移到未分组?'),
      ]),
      showCancelButton: true,
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      beforeClose(action, instance, done) {
        if(action === 'confirm') {
          deleteGroupApi({id: item.groupId}).then(res=>{
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.init()
            done()
          })
        } else {
          done()
        }
      }
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
            groupId: item.groupId,
            groupName: item.groupName
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
