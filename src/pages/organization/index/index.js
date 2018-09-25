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
    },
})
export default class pageOrganization extends Vue {
  groupList = [ 
    {
      groupId: 10, 
      groupName: "所有人", 
      sort: 10, 
      count: 10
    }
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
    }
  ]
  value = ''
  // 表单数据
    courseList = [

    ]
    // 表格字段
  fields = [
    {
      prop: 'groupName',
      label: '成员',
      align: 'center'
    },
    {
      prop: 'rolename',
      label: '职位',
      align: 'center'
    },
    {
      prop: 'roleId',
      label: '权限',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'mobile',
      label: '手机号码',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'email',
      label: '邮箱',
      align: 'center',
      showTips: 'no'
    },
    {
      prop: 'wechat',
      label: '微信',
      showTips: 'no'
    }
  ]

  created() {
      this.getMsgList()
    }

    getMsgList() {
      getMemberListApi().then( res => {
        this.courseList = res.data.data
      })

      getGroupListApi().then( res => {
        this.groupList = [...this.groupList,...res.data.data]
      })
    }

    // 添加课程-跳转
    addWorkZone() {
        this.$router.push({ name: 'addMember'})
    }

    todoAction(type) {
      console.log(type)
    switch(type) {
      case 'set':
        console.log(1)
        this.$router.push({
          name: 'groupManage'
        })
        break
      case 'add':
        console.log(1)
          this.$router.push({
            name: 'addMember'
          })
        break
      default:
        break
    }
    }
}
