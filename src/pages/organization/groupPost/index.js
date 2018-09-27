import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getMemberListApi, getGroupListApi, deleteGroupApi } from '@/store/api/organization.js'

@Component({
  name: 'menber-list',
  methods: {
    ...mapActions([
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
      'groupLists',
      'menberLists'
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
    SearchBar
  }
})
export default class MenberList extends Vue {


  // 搜索表单
  form = {
    groupName:'',
    id: '',
    name: '',
    owner_uid: '',
    organizations: '',
    cover_img_id: '',
    members: '',
    content: '',
    hits: '',
    status: '',
    sort: ''
  }

  rules = {
    groupName: [
      { required: true, message: '请填写课节标题', trigger: 'blur' }
    ]
  }


  checkList = {
    tem: [],
    value: []
  }

  temMenberLists = []
  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'

  // 搜索成员
  searchName = ''

  init() {
    const params = {
      id: this.$route.params.id
    }
    const data = {
      tem: [],
      value: []
    }
    Promise.all(
      [
        this.getGroupListsApi(),
        this.getMenberListsApi()
      ]
    )
    .then((res) => {
      console.log(res)
      this.temMenberLists = [...this.menberLists]
      this.checkList = data
      this.form.members = data.value.join(',')
    })
    .catch((err) => {
      this.showMsg({ content: '初始化页面失败~', type: 'error', duration: 3000 })
    })
  }
  
  /**
   * @Author   小书包
   * @DateTime 2018-09-17
   * @detail   搜索成员
   * @return   {[type]}   [description]
   */
  handleSearch() {
    // 获取成员列表
    this.getMenberListsApi({name: this.searchName})
      .then(() => {
        this.temMenberLists = [...this.menberLists]
      })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   */
  filterWorkZoneMenber(item) {
    let menberLists = [...this.menberLists]
    menberLists = menberLists.filter(field => {
      return field.selfGroup.includes(item.id)
    })
    this.temMenberLists = menberLists
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   多选
   */
  multipleSelection() {
    const menberLists = [...this.menberLists]
    const value = []
    menberLists.map(field => {
      if(this.checkList.tem.includes(field.realname)) {
        value.push(field.uid)
      }
    })
    this.checkList.value = value
    this.form.members = value.join(',')
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   成员分类
   * @return   {[type]}   [description]
   */
  memberClassification(groupId) {
    const data = {
      tem: [],
      value: []
    }
    const menberLists = [...this.menberLists]
    if(groupId === 'all') {
      menberLists.map(field => {
        data.tem.push(field.realname)
        data.value.push(field.uid)
      })
    } else {
      menberLists.map(field => {
        if(field.selfGroup.includes(groupId)) {
          data.tem.push(field.realname)
          data.value.push(field.uid)
        }
      })
    }
    this.checkList = data
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-18
   * @detail   修改表单
   * @return   {[type]}   [description]
   */
  submit() {
    this.submitBtnClick = !this.submitBtnClick
    this.putJobCircleApi(this.form)
      .then(res => {
        this.$message({message: res.data.msg, type: 'success'})
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
          this.$router.push({name: 'workZoneList'})
        }, 3000)
      })
      .catch(err => {
        this.$message.error(`${err.msg}~`)
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
          this.$router.push({name: 'workZoneList'})
        }, 3000)
      })
  }
}
