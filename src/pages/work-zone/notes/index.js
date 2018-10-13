import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import MyPrompt from 'COMPONENTS/prompt/index.vue'
@Component({
  name: 'note-list',
  methods: {
    ...mapActions([
      'showMsg',
      'getJobCircleNoteListsApi',
      'deleteJobCircleNoteApi',
      'setJobCircleNotetoTopApi',
      'updateJobCircleNoteVisibleApi',
      'recoverJobCircleNoteApi',
      'getJobCircleTopNumApi',
      'cancleJobCircleNotetoTopApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleNoteLists',
      'jobCircleTopNum'
    ])
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
    SearchBar,
    MyPrompt
  }
})
export default class NoteList extends Vue {

  // 表格字段
  fields = [
    {
      prop: 'content',
      label: '帖子内容',
      align: 'left',
      showTips: 'no',
      width: '30%'
    },
    {
      prop: 'realname',
      label: '发布者',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'type',
      label: '文件类型',
      align: 'center',
      showTips: 'no',
      width: '10%'
    },
    {
      prop: 'visible',
      label: '是否公开',
      align: 'center',
      showTips: 'yes',
      width: '15%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'visible-3'
        },
        {
          label: '公开',
          value: 'visible-0'
        },
        {
          label: '隐藏',
          value: 'visible-1'
        }
      ],
      filterPlacement: '隐藏该内容，除了已加入工作圈的成员和选定的成员以外的成员都不可见；隐藏后可重新公开，公开则所有成员都可见'
    },
    {
      prop: 'deletedAt',
      label: '状态',
      align: 'center',
      showTips: 'yes',
      width: '10%',
      filteredValue:
      [
        {
          label: '全部',
          value: 'delete-3'
        },
        {
          label: '正常',
          value: 'delete-0'
        },
        {
          label: '已删除',
          value: 'delete-1'
        }
      ],
      filterPlacement: '删除该内容，会导致内容不在员工端显示；删除后可以使用恢复来让内容重新在员工端显示'
    },
    {
      prop: 'createdAt',
      label: '建立时间',
      align: 'center',
      showTips: 'no',
      width: '15%'
    },
    {
      prop: 'actions',
      label: '操 作',
      showTips: 'yes',
      width: '30%',
      filterPlacement: '帖子的相关操作~'
    }
  ]

  // 搜索表单
  form = {
    keyword: ''
  }

  // 确认信息弹窗
  models = {
    show: true,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    type: 'confirm'
  }

  /**
   * 初始化表单、分页页面数据
   */
  init() {
    this.form = Object.assign(this.form, this.$route.query, this.$route.params)
    this.getJobCircleNoteLists()
  }

  /**
   * 获取课程列表
   */
  getJobCircleNoteLists({ page, pageSize } = {}) {
    const params = {
      id: this.form.id,
      page: page || this.form.page || 1,
      count: this.zikeDefaultPageSize,
      globalLoading: true
    }
    if(this.form.visible) {
      params.visible = this.form.visible === '3' ? '' : this.form.visible
    }
    if(this.form.delete) {
      params.delete = this.form.delete === '3' ? '' : this.form.delete
    }
    if(this.form.keyword) {
      params.keyword = this.form.keyword
    }
    this.getJobCircleNoteListsApi(params)
    this.getJobCircleTopNumApi({id: this.form.id})
  }

  // 点击搜索时触发
  handleSearch() {
    this.setPathQuery(this.form)
  }

  // 添加课程-跳转
  addWorkZone() {
    this.$router.push({ name: 'workZonePost'})
  }

  todoAction(type, item) {
    switch(type) {
      case 'comment':
        this.$router.push({name: 'commentList', params: {id: item.id}})
        break
      case 'delete':
        this.$confirm('删除后前台不可见, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteJobCircleNoteApi({id: item.id})
              .then(() => {
                this.getJobCircleNoteLists()
              })
        })
        .catch(action => {
          this.$message({type: 'info', message: '取消操作~'})
        })
        break
      case 'hide':
        this.updateJobCircleNoteVisibleApi({id: item.id, visible: item.visible === '公开' ? 1 : 0})
            .then(() => {
              this.getJobCircleNoteLists()
            })
        break
      case 'recover':
        this.recoverJobCircleNoteApi({id: item.id, visible: item.visible === '公开' ? 1 : 0})
            .then(() => {
              this.getJobCircleNoteLists()
            })
        break
      case 'top':
      console.log(this.jobCircleTopNum.topNum)
        if(this.jobCircleTopNum.topNum > 2) {
          this.$confirm('设置这条内容为置顶后，最早的一条置顶内容将自动取消~', '置顶超过3条后', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.setJobCircleNotetoTopApi({id: item.id})
                .then(() => {
                  this.getJobCircleNoteLists()
                  this.getJobCircleTopNumApi({id: this.form.id})
                })
          })
          .catch(action => {
            this.$message({type: 'info', message: '用户取消~'})
          })
        } else {
          this.setJobCircleNotetoTopApi({id: item.id})
              .then(() => {
                this.getJobCircleNoteLists()
                this.getJobCircleTopNumApi({id: this.form.id})
              })
        }
        break
      case 'notop':
        this.cancleJobCircleNotetoTopApi({id: item.id})
            .then(() => {
              this.getJobCircleNoteLists()
              this.getJobCircleTopNumApi({id: this.form.id})
            })
        break
      default:
        break
    }
  }
  confirm() {}
  cancel() {}
  /**
   * @Author   小书包
   * @DateTime 2018-09-28
   * @detail   重置单元行样式
   * @return   {[type]}   [description]
   */
  tableRowClassName({row}) {
    if(row.deletedAt === '已删除') {
      return 'row-delete'
    } else {
      return 'row-exist'
    }
  }
}
