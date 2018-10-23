import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getMemberListApi, getGroupListApi, deleteGroupApi, addGroupApi, editGroupApi } from '@/store/api/organization.js'

@Component({
  name: 'groupPost',
  methods: {
    ...mapActions([
      'showMsg',
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
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
  }

  rules = {
    name: [
      //{ required: true, message: '分组名必须填写，最多20个字', trigger: 'blur' }
      { required: true,validator: this.validatePass,  trigger: 'blur' }
    ]
  }


  checkList = []

  groupList = []

  memberList = []
  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'

  // 搜索成员
  searchName = ''

  //编辑需要
  editData = {
    groupId: '',
    name: '',
    groupNameList:[]
  }

  validatePass(rule, value, callback){
    if (value === '') {
      callback(new Error('分组名必须填写，最多20个字'));
    } else if ( this.editData.groupNameList.includes(value)){
      callback(new Error('分组名已经存在，请重新填写'));
    }else {
      callback();
    }
  }

  init() {
    const params = {
      id: this.$route.params.id
    }

    this.checkList = []

    getGroupListApi().then(res=>{
      if(res.data.data.length>0){
        let data = [{
          groupName:'所有人',
          groupId:'all',
          active: false
        }]
        res.data.data.map(item=>{
          item.active = false
          data.push(item)
        })
        this.groupList = data
      }
    })

    getMemberListApi().then((res) => {
      res.data.data.map(res=>{
        res.active = false
        res.selfGroup = []
        if(res.group) res.group.map(val => res.selfGroup.push(val.groupId))
      })
      this.memberList = res.data.data

      if(this.$route.name === 'editGroup'){
        this.getEditMsg()
      }
    })
  }

  //编辑信息操作
  getEditMsg(){
    getMemberListApi({groupId: this.$route.params.groupId}).then(res=>{
      let memberList = [...res.data.data]
      let list = []

      memberList.map(field => {
        list.push(field.realname)
      })

      this.form.name = res.data.data[0].group[0].groupName
      this.multipleSelection()

      this.editData.groupId = this.$route.params.groupId
      this.editData.name = this.form.name
      this.groupList.map(item=>{
        if(item.groupName != this.form.name){
          this.editData.groupNameList.push(item.groupName)
        }
      })
    })
  }
  
  /**
   * @detail   搜索成员
   */
  handleSearch() {
    let params = {}
    if(this.searchName.length>0){
      params = {
        name: this.searchName
      }
    }
    // 获取成员列表
    getMemberListApi(params)
      .then(res => {
        console.log(res)
        this.memberList = res.data.data
      })
  }

  /**
   * @detail   多选
   */
  multipleSelection(item) {
    let value = []
    let index = ''
    let checkList = this.checkList
    item.active = !item.active
    if(item.active){
      checkList.push(item.uid)
    }else {
      index = checkList.indexOf(item.uid)
      checkList.splice(index,1)
    }

  }

  /**
   * @detail   成员分类
   */
  memberClassification(groupItem) {
    let data = [...this.checkList] 
    let memberList = this.memberList
    groupItem.active = !groupItem.active
      
    if(groupItem.groupId === 'all'){
      data = []
    }
    memberList.map(field => {
      if(groupItem.groupId === 'all'){
        if(groupItem.active){
          // 选中
          data.push(field.uid)
          field.active = true
        }else {
          field.active = false
        }

        this.groupList.map(item=>{
          item.active = groupItem.active
        })
      }else {
        if(field.selfGroup.includes(groupItem.groupId)) {
          if(groupItem.active ){
            // 选中
            if(!data.includes(field.uid)){
              data.push(field.uid)
              field.active = true
            }
          }else {
            //取消
            let index = data.indexOf(field.uid)
            if(index>-1){
              data.splice(index, 1);
              field.active = false
            }
          }
        }
      }
    })
    console.log(data,memberList)
    this.checkList = data
  }

  /**
   * @detail   修改表单
   */
  submit(params) {
    let obj = {
      suc: (res)=>{
        this.$message({message: res.data.msg, type: 'success'})
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
          this.$router.push({name: 'groupManage'})
        }, 3000)
      },
      err: (err)=>{
        this.$message.error(`${err.data.msg}~`)
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
          //this.$router.push({name: 'groupManage'})
        }, 3000)
      }
    }
    if(this.$route.name === 'addGroup'){
      addGroupApi(params)
        .then(res => {
          obj.suc(res)
        })
        .catch(err => {
          obj.err(err)
        })
    }else {
      params.id = this.$route.params.groupId
      editGroupApi(params)
        .then(res => {
          obj.suc(res)
        })
        .catch(err => {
          obj.err(err)
        })
    }
  }

  // 检测是否可以提交
  checkSubmit() {

    this.$refs['form'].validate((valid) => {
      if (valid) {
        // 给提交按钮加loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'

        const params = {
          name: this.form.name,
          memberList: this.checkList.join(',')
        }

        this.submit(params)
      }
    })
  }

  transformData(data, params) {
    const formData = {}
    params.map(field => {
      if(typeof data[field] != 'object') {
        formData[field] = data[field]
      } else {
        formData[field] = data[field].value
      }
    })
    return formData
  }

}
