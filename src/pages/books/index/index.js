import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list_copy/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getBooksListApi, setBooksStatusApi, getBooksFirstListApi } from 'API/workBook'
import ModalDialog from 'COMPONENTS/dialog/index.vue'

@Component({
  name: 'books-list',
  methods: {
  },
  computed: {
    pageNum () {
      let num = Math.floor(this.bookList.total/this.zikeDefaultPageSize)
      if(this.bookList.total%this.zikeDefaultPageSize!==0){
        num +=1
      }
      return num
    }
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
    ModalDialog,
    SearchBar
  }
})
export default class booksList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'middleUrl',
      label: '封面',
      align: 'left',
      width: '13%'
    },
    {
      prop: 'title',
      label: '书名',
      align: 'left',
      width: '10%'
    },
    {
      prop: 'wordIntro',
      label: '摘要',
      align: 'left',
      width: '25%'
    },
    {
      prop: 'readCount',
      label: '阅读人数',
      align: 'left',
      width: '8%'
    },
    {
      prop: 'tags',
      label: '分类',
      align: 'left',
      width: '12%',
      dropdown:[],
      tooltip: '类型的提示文案'
    },
    {
      prop: 'status',
      label: '是否上线',
      align: 'left',
      width: '10%',
      dropdown:
      [ 
        {
          label: '全部',
          value: 'status-all'
        },
        {
          label: '上线',
          value: 'status-0'
        },
        {
          label: '下线',
          value: 'status-1'
        }
      ],
      tooltip: '上线：在员工端显示<br/>下线：在员工端不显示'
    },
    {
      prop: 'actions',
      label: '操作',
      align: 'left',
      width: '10%',
      tooltip: '上线：在员工端显示<br/>下线：在员工端不显示'
    }
  ]


  model = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '确定',
    type: 'confirm',
    confirmType: 'danger',
    width: '432px',
    height: '192px',
    status: 0,
    id: null,
    confirm: ''
  }
  // 搜索表单
  form = {
    title: '',
    status: '',
    id: '',
  }

  // 初始化的搜索表单
  initForm = {
    name: ''
  }

  bookList = {
    list: [],
    total: 0
  }
  /**
   * 初始化表单、分页页面数据
   */

  created() {
    this.getTagsLists()
  }

  init() {
    this.form = {}
    this.form = Object.assign(this.form, this.$route.query)
    this.getLists()
  }

  getTagsLists() {
    this.fields[4].dropdown = [{
      label: '全部',
      value: 'tag_id-all'
    }]
    getBooksFirstListApi().then(res=>{
      res.data.data.map(item=>{
        this.fields[4].dropdown.push({
          label: item.tagName,
          value:`tag_id-${item.id}`
        })
      })
    })
  }

  /**
   * 获取列表
   */
  getLists({ page, pageSize } = {}) {
    let param = {
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize
    }
    if(this.form.tag_id) {
      param.tag_id = this.form.tag_id === 'all' ? '' : this.form.tag_id
      param.page = this.form.page ? this.form.page : 1
    }
    if(this.form.title) {
      param.title = this.form.title
      param.page = this.form.page ? this.form.page : 1
    }
    if(this.form.status) {
      param.status = Number(this.form.status) === 0 ? 0 : Number(this.form.status) === 1 ? 1 : ''
    }
    //排序判断用
    this.form.page = param.page
    getBooksListApi(param).then(res=>{
      this.bookList = {
        list: res.data.data,
        total: res.data.meta.total,
        page: res.data.meta.currentPage
      }
    })
  }

  // 点击搜索时触发
  handleSearch() {
    this.form.page = 1
    this.setPathQuery(this.form)
  }

  //书籍更新状态 0上线 1下线
  setBookStatus(status,id) {
    setBooksStatusApi({status, id})
      .then(res=>{
        this.model.show = false
        this.getLists(this.form)
        this.$message({
          message: res.data.msg ? res.data.msg : '成功',
          type: 'success'
        })
      })
      .catch(error => {
        this.$message.error(err.data.msg)
        return Promise.reject(error.data || {})
      })

  }

  confirm(){
    this.setBookStatus(this.model.status, this.model.id)
  }

  todoAction(type, item) {
    this.model.show = true
    this.model.id = item.id
    switch(type) {
      case 'up':
        this.model.status = 0
        break
      case 'down':
        this.model.status = 1
        break
      default:
        break
    }
  }
}
