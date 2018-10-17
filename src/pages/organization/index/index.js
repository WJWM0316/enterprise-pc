import Vue from 'vue'
import Component from 'vue-class-component'
import TableList from 'COMPONENTS/list/index.vue'
import { getMemberListApi, getGroupListApi } from '@/store/api/organization.js'

@Component({
  name: 'member-list',
  components: {
      TableList
    },
    watch: {
      groupList (val) {},
      '$route': {
        handler() {
          this.init()
        },
        immediate: true
      }
    },
})
export default class pageOrganization extends Vue {
  groupList = [
  ]
  options = [
    {
      value: '1',
        label: '超级管理员'
    },
    {
      value: '2',
        label: '后台管理员'
    },
    {
      value: '3',
        label: '内容管理员'
    },
    {
      value: '4',
      label: '全部成员'
    }
  ]
    rolevalue = ''
    // 表单数据
    courseList = {
      list: [],
      total: 0
    }
    // 表格字段
    fields = [
        {
          prop: 'groupName',
          width: '30%',
          label: '成员',
          align: 'center'
        },
        {
          prop: 'occupation',
          width: '10%',
          label: '职位',
          align: 'center',
          showTips: 'no'
        },
        {
          prop: 'roleName',
          width: '10%',
          label: '权限',
          align: 'center'
        },
        {
          prop: 'mobile',
          width: '10%',
          label: '手机号码',
          align: 'center',
          showTips: 'no'
        },
        {
          prop: 'email',
          width: '10%',
          label: '邮箱',
          align: 'center',
          showTips: 'no'
        },
        {
          prop: 'wechat',
          width: '10%',
          label: '微信',
          showTips: 'no'
        }
    ]

    memberData = {
      selectAll: 1,
      count: 20,
      page: 1
    }

    created(){}

    init() {
      
      this.memberData = {
        selectAll: 1,
        count: 20,
        page: 1
      }
      this.memberData = Object.assign(this.memberData,this.$route.query || {})
      console.log(this.memberData)
      console.log(this.$route.query)
      if(this.$route.query.roleId){
        delete this.memberData.roleId
        this.rolevalue = this.$route.query.roleId
      }
      this.getMemberList()
      this.getMsgList()

    }

    getMsgList() {
      getGroupListApi().then( res => {
          this.groupList = [
          {
            groupId: 10, 
            groupName: "所有人", 
            sort: 10, 
            count: 10,
            active: true
          }]

          res.data.data.map(item=>{
            if(this.$route.query.groupId && this.$route.query.groupId == item.groupId){
              item.active = true
              this.groupList[0].active = false
            }else {
              item.active = false
            }
          })
          this.groupList = [...this.groupList,...res.data.data]
      })
    }

    //跳转个人空间
    viewMenberInfo(id) {
      this.$router.push({ 
        name: 'userInfos', 
        params: { id }
      })
    }

    getMemberList(){
      getMemberListApi(this.memberData).then( res => {
        this.courseList = {
          list : res.data.data,
          total: res.data.meta&&res.data.meta.total?res.data.meta.total:0
        }
      })
    }

    // 添加课程-跳转
    addWorkZone() {
        this.$router.push({ name: 'addMember'})
    }

    todoAction(type) {
      switch(type) {
        case 'set':
          this.$router.push({
            name: 'groupManage'
          })
          break
        case 'add':
            this.$router.push({
              name: 'addMember'
            })
          break

        case 'edit':
            this.$router.push({
              name: 'editMember',
              query: {
                user_id: 108,
              }
            })
          break

        default:
          break
      }
    }

    selectGroup(item){
      let query = {
        page: 1,
        roleId: '4'
      }

      if(item.groupId===10){
          query = {}
      }else {
          query.groupId = item.groupId
      }

      this.$router.push({
        name: 'organization',
        query: query
      })

      /*this.groupList.map((field) => {
        if(field.active) {
          field.active = false
        }
      })
      item.active = true
      this.rolevalue = '4'
      this.memberData.page = 1

      delete this.memberData.roleId
      this.getMemberList()*/
      
    }

    changeRule(id){
      let query = {
        page: 1
      }

      if(id==4){
          query = {}
      }else {
          query.roleId = id
      }

      if(this.$route.query.groupId){
          query.groupId = this.$route.query.groupId
      }
      this.$router.push({
        name: 'organization',
        query: query
      })
    }
}
