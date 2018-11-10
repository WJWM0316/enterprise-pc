import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getBooksListApi, setBooksStatusApi, getBooksFirstListApi } from 'API/workBook'
import ModalDialog from 'COMPONENTS/dialog/index.vue'

@Component({
  name: 'lighthouse-list',
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
      showTips: 'no',
      width: '13%'
    },
    {
      prop: 'title',
      label: '书名',
      align: 'left',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'introduce',
      label: '摘要',
      align: 'left',
      showTips: 'no',
      width: '25%'
    },
    {
      prop: 'readCount',
      label: '阅读人数',
      align: 'left',
      showTips: 'no',
      width: '8%'
    },
    {
      prop: 'tags',
      label: '分类',
      align: 'left',
      showTips: 'no',
      width: '12%',
      filteredValue:[],
      filterPlacement: '类型的提示文案'
    },
    {
      prop: 'status',
      label: '是否上线',
      align: 'left',
      showTips: 'yes',
      width: '10%',
      filteredValue:
      [ 
        {
          label: '全部',
          value: 'status-2'
        },
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
      prop: 'actions',
      label: '操 作',
      align: 'left',
      showTips: 'yes',
      width: '10%',
      filterPlacement: '编辑：编辑相关详细内容<br/>打卡：进入打卡内容管理页面'
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
  course_id = ''
  /**
   * 初始化表单、分页页面数据
   */

  create(){
  }

  init() {
    this.form = Object.assign(this.form, this.$route.query || {})
    this.course_id = this.$route.query.course_id
    this.getLists()
    this.getTagsLists()
  }

  getTagsLists(){
    this.fields[4].filteredValue = []
    getBooksFirstListApi().then(res=>{
      res.data.data.map(item=>{
        this.fields[4].filteredValue.push({
          label: item.tagName,
          value:`id-${item.id}`
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
      count: this.zikeDefaultPageSize,
      status: this.form.status,
      tag_id: this.form.id,
      title: this.form.title
    }

    //排序判断用
    this.form.page = param.page
    getBooksListApi(param).then(res=>{

      this.bookList = {
        list: res.data.data,
        total: res.data.meta.total
      }
    })
  }

  // 点击搜索时触发
  handleSearch() {
    this.form.page = 1
    this.setPathQuery(this.form)
  }

  //书籍更新状态 0上线 1下线
  setBookStatus(status,id){
    setBooksStatusApi({status,id}).then(res=>{
      this.form = {
        title: '',
        status: '',
        id: '',
        page: 1,
      }

      this.model.show = false
      this.init()
      this.$message({
        message: res.data.msg?res.data.msg:'成功',
        type: 'success'
      })
    }).catch(error => {
      this.$message.error(err.data.msg);
      return Promise.reject(error.data || {})
    })

  }

  confirm(){
    this.setBookStatus(this.model.status,this.model.id)
  }

  todoAction(type, item) {
    console.log(type,item)
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
