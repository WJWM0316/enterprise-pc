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
      'getJobCircleDetailsApi',
      'putJobCircleApi',
      'getJobCircleHitListsApi',
      'getJobCircleOrganizationListsApi',
      'updateMenberListsApi',
      'updateMultipleMenberListsApi',
      'updateMenberListsAllApi',
      'updateMenberListsByIdApi',
      'noCheckGroupListsApi',
      'switchCheckGroupListsApi',
      'classifyMemberListsByGroupIdApi',
      'setSelfDefinedGroup',
      'removeSelfDefinedGroup',
      'updateAllGroupListStatus',
      'updateSingleGrouptatus',
      'updateSingleMemberStatus',
      'updateAllMemberStatus'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
      'groupLists',
      'menberLists',
      'jobCircleMemberLists',
      'jobCircleDetails',
      'jobCircleHitLists',
      'jobCircleOrganizationLists'
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

  checkList = {
    tem: [],
    value: []
  }

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
    const data = { tem: [], value: [] }
    Promise.all(
      [
        this.getGroupListsApi({isHaveMember: 1}),
        this.getMenberListsApi({selectAll: 1}),
        this.getJobCircleMemberListsApi(params),
        this.getJobCircleDetailsApi(params),
        this.getJobCircleHitListsApi(params),
        this.getJobCircleOrganizationListsApi(params)
      ]
    )
    .then((res) => {
      const jobCircleDetails = this.jobCircleDetails
      this.form = {
        id: jobCircleDetails.id,
        name: jobCircleDetails.name,
        owner_uid: jobCircleDetails.ownerUid,
        cover_img_id: jobCircleDetails.coverImgId,
        content: jobCircleDetails.content,
        status: jobCircleDetails.status === '上线' ? 1 : 0,
        sort: jobCircleDetails.sort
      }
      this.form.hits = this.jobCircleHitLists.join(',')
      this.form.organizations = this.jobCircleOrganizationLists.join(',')
      this.menberLists.map(field => {
        if(this.jobCircleMemberLists.includes(field.uid)) {
          data.tem.push(field.realname)
          data.value.push(field.uid)
        }
      })
      this.checkList = data
      this.form.members = data.value.join(',')
      this.updateMultipleMenberListsApi({list: this.form.members.split(',')})
      this.setSelfDefinedGroup()
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
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail  刷选组员数据
   * @return   {[type]}      [description]
   */
  filterMenber(type, item) {
    const value = []
    this.classifyMemberListsByGroupIdApi({groupId: item.groupId, bool: item.active})
    this.switchCheckGroupListsApi({groupId: item.groupId})
    this.menberLists.map(field => {
      if(field.selfGroup.includes(item.groupId)) {
        item.active ? this.updateSingleMemberStatus({uid: field.uid, bool: true}) : this.updateSingleMemberStatus({uid: field.uid, bool: false})
      }
    })
    const checkedMenberLists = this.menberLists.filter(field => field.active)
    checkedMenberLists.length === this.menberLists.length ? this.updateSingleGrouptatus({groupId: 'all', bool: true}) : this.updateSingleGrouptatus({groupId: 'all', bool: false})
    this.menberLists.map(field => {
      if(field.active) value.push(field.uid)
    })
    this.form.members = value.join(',')
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-10
   * @detail   多选
   */
  multipleSelection(item, index) {
    const value = []
    this.updateMenberListsApi({ index })
    this.menberLists.map(field => {
      if(field.active) value.push(field.uid)
    })
    this.form.members = value.join(',')
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
        }, 3000)
      })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-10-16
   * @detail   通过成员关联组
   * @return   {[type]}   [description]
   */
  memberAssociationGroup(item) {
    // 是否选中全部的组织
    const isCheckedAll = this.menberLists.every(field => field.active)
    // 判断是否已经全选
    isCheckedAll ? this.updateSingleGrouptatus({groupId: 'all', bool: true}) : this.updateSingleGrouptatus({groupId: 'all', bool: false})

    this.menberLists.map(field => {
      // 当前的成员id 和选中的成员id 是否相等
      if(field.uid === item.uid) {
        // 判断有没有分组
        if(field.selfGroup.length) {
          // 遍历所有的分组
          this.groupLists.map(group => {
            // 当前选中的项所在的分组
            if(field.selfGroup.includes(group.groupId)) {
              // 当前分组有多少人
              const currentTypeGroupNums = this.menberLists.filter(member => member.selfGroup.includes(group.groupId))
              // 当前分组有多少人是被选中的
              const currentTypeGroupNumsActive = currentTypeGroupNums.filter(member => member.active )
              if(currentTypeGroupNums.length === currentTypeGroupNumsActive.length) {
                item.active ? this.updateSingleGrouptatus({groupId: group.groupId, bool: true}) : this.updateSingleGrouptatus({groupId: group.groupId, bool: false})
              } else {
                this.updateSingleGrouptatus({groupId: group.groupId, bool: false})
              }
            }
          })
        }
      }
    })
  }
}
