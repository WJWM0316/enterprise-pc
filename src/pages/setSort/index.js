import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list_copy/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import { getCategoryListsApi, createCategoryApi, editCategoryApi, updateCategoryApi, deleteCategoryApi } from '@/store/api/setting.js'

@Component({
  name: 'group-manage',
  watch: {
  },
  components: {
    ModalDialog,
    TableList,
    SearchBar
  },
  watch: {
    '$route': {
      handler() {
        this.init()
      },
      immediate: true
    }
  },
  computed: {
    pageNum () {
      let num = Math.floor(this.classifyList.total/this.zikeDefaultPageSize)
      if(this.classifyList.total%this.zikeDefaultPageSize!==0){
        num +=1
      }
      return num
    }
  }
})
export default class classifyList extends Vue {

  // 表单数据
  classifyList = []
  input5 = ''
  total = 50

   // 表格字段
  fields = [
    {
      prop: 'categoryName',
      label: '课程、直播的分类',
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

  // 确认信息弹窗
  model = {
    show: false,
    title: '提示',
    txt: '删除后该导师将无法进入，但其所有内容均会保留',
    showClose: true,
    confirmText: '确定',
    type: 'confirm',
    width: '432px',
    height: '192px',
    confirm: ''
  }

  // 搜索表单
  form = {
    name: '',
    hintTXt: ''
  }

  // 初始化的搜索表单
  initForm = {
    name: ''
  }

  created() {}

  // 设置排序
  setSort(type,item){
    let data = {
      id: item.categoryId,
      type: 1
    }
    if(type === 'up'){
      data.type = 1

    }else if(type === 'down'){
      data.type = 2
    }
    updateCategoryApi(data).then(res=>{
      this.$message({message: '成功', type: 'success'})
      this.getList()
    }).catch(err => {
      this.$message.error(err.data.msg);
    })
  }

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form,this.$route.query  || {})
    this.getList()
  }

  /**
   * 获取列表
   */
  getList({ page } = {}) {
    let data = {
      page: page || this.form.page || 1,
      pageCount: this.zikeDefaultPageSize,
      useCount: 1,
      default: 1
    }

    this.form.page = data.page
    getCategoryListsApi(data).then(res => {
      if(res.data.data.length === 0 && data.page>1){
        this.$router.push({ query: {page: data.page-1} })
        return
      }
      res.data.data.map(function(value,index){
          value.sort="1"
          value.index = index
      })
      this.classifyList = {
        list: res.data.data,
        total: res.data.meta.total
      }
    })
  }

  deleteClass() {
    deleteCategoryApi({id: this.model.itemSel.categoryId}).then(res=>{
      this.model.show = false
      this.$message({
        message: res.data.msg,
        type: 'success'
      });
      this.getList()
    })
  }

  addHint(){
      this.model.show = false
  }

  addClass() {
    let data = {
      name: this.form.name
    }

    this.form.name.replace(/\s*/g,"")
    if(this.form.name.length<1){
      this.form.hintTXt = '名字不能为空'
      return
    }

    createCategoryApi(data).then(res=>{
      this.model.show = false
      this.form.hintTXt = ''
      this.$message({
        message: res.data.msg,
        type: 'success'
      });
      this.getList()
    },res=>{
      this.form.hintTXt = res.data.msg
    })
  }

  editClass() {
    let data = {
      id: this.model.itemSel.categoryId,
      name: this.form.name
    }

    data.name.replace(/\s*/g,"")
    if(data.name.length<1){
      this.form.hintTXt = '名字不能为空'
      return
    }
    editCategoryApi(data).then(res=>{
      this.model.show = false
      this.form.hintTXt = ''
      this.$message({
        message: res.data.msg,
        type: 'success'
      });
      this.getList()
    },res=>{
      this.form.hintTXt = res.data.msg
    })
  }

  // 点击搜索时触发
  handleSearch () {
    this.form.page = 1
    this.setPathQuery(this.form)
    this.getList()
  }

  // 添加课程-跳转
  addGroup() {
    this.$router.push({ name: 'addGroup'})
  }

  confirm(){
    this[this.model.confirm]()
  }

  todoAction(type, item) {
    const h = this.$createElement
    if(type!=='add'){
      this.model.itemSel = item 
    }
    switch(type) {
      case 'add':
        this.model.show = true
        this.form.hintTXt = ''
        this.model.type = 'confirm'
        this.model.txt = ''
        this.model.confirm = 'addClass'
        this.model.confirmText = '提交'
        this.model.title = '新建分类'
        break
      case 'edit':
        this.model.show = true
        this.form.hintTXt = ''
        this.model.type = 'confirm'
        this.model.txt = ''
        this.model.confirm = 'editClass'
        this.model.confirmText = '提交'
        this.model.title = '编辑分类'
        this.form.name = item.categoryName
        break
      case 'delete':
        // 没有课程或者直播
        if(item.courseCount === 0 && item.liveCount === 0) {
          this.$msgbox({
            title: '删除类型',
            message: h('div', null, [
              h('span', null, '确定要删除当前内容类型吗？ ')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if(action === 'confirm') {
                this.deleteClass(item)
                done()
              } else {
                done()
              }
            }
          })
          return
        }
        this.$msgbox({
          title: '删除类型',
          message: h('p', null, [
            h('span', { style: 'color: #FA6A30' }, item.categoryName),
            h('span', null, ` 类型包含${item.courseCount}个课程和${item.liveCount}个直播，该操作将同时把内容划分为`),
            h('span', { style: 'color: #FA6A30' }, ' 未分类 '),
            h('span', null, '类型，建议修改内容类型再次删除类型，确定要删除当前内容类型么？')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if(action === 'confirm') {
              this.deleteClass(item)
              done()
            } else {
              done()
            }
          }
        })
        break
      default:
        break
    }
  }
}
