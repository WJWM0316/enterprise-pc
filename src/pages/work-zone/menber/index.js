import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBar from 'COMPONENTS/searchBar/index.vue'

@Component({
  name: 'menber-list',
  methods: {
    ...mapActions([
      'showMsg',
      'getGroupListsApi',
      'getMenberListsApi',
      'getJobCircleMemberListsApi',
      'getJobCircleDetailsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
      'groupLists',
      'menberLists',
      'jobCircleMemberLists',
      'jobCircleDetails'
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
    name: ''
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
        this.getMenberListsApi({selectAll: 1}),
        this.getJobCircleMemberListsApi(params),
        this.getJobCircleDetailsApi(params)
      ]
    )
    .then((res) => {
      this.temMenberLists = [...this.menberLists]
      this.temMenberLists.map(field => {
        if(this.jobCircleMemberLists.includes(field.uid)) {
          data.tem.push(field.realname)
          data.value.push(field.uid)
        }
      })
      this.checkList = data
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
  submit() {}
}
