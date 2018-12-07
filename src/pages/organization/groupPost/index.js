import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import addMemberBox from 'COMPONENTS/addMemberBox/index.vue'

import { getMemberListApi, getGroupListApi, addGroupApi, editGroupApi } from '@/store/api/organization.js'

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
    SearchBar,
    addMemberBox
  }
})
export default class MenberList extends Vue {
  confirmModels = {
    show: false
  }
  // 搜索表单
  form = {
    id: '',
    name: '',
  }

  rules = {
    name: [
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

  //basegroupList = []
  baseMemberList = []
  groupMsg = {}
  isBeforeSearch = false  //是否刚搜索

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
    this.groupMsg = this.$route.params
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

    this.getMemberList().then((res) => {
      this.memberList = res
      this.baseMemberList = [...res]

      if(this.$route.name === 'editGroup'){
        this.form.name = this.groupMsg.groupName
        if(this.groupMsg.groupId){
          this.getEditMsg()
        }
      }
    })
  }

  //获取成员列表
  getMemberList(params){
    return getMemberListApi(params)
      .then(res => {
        res.data.data.map(res=>{
          res.active = false
          res.selfGroup = []
          if(res.group) res.group.map(val => res.selfGroup.push(val.groupId))
        })
        return res.data.data
      })
      .catch(error => {
        return Promise.reject(error.data || {})
      })
  }

  //编辑信息操作
  getEditMsg(){
    //获取该组下的成员
    this.getMemberList({groupId: this.groupMsg.groupId}).then((res) => {
      let list = []
      if(res.length>1){
        res.map(field => {
          list.push(field.uid)
        })
        this.memberList.map(field => {
          if(list.includes(field.uid)){
            this.checkList.push(field.uid)
            field.active = true
          }
        })

        this.editData.groupId = this.groupMsg.groupId
        this.editData.name = this.groupMsg.groupId
        this.groupList.map(item=>{
          if(item.groupName != this.form.name){
            this.editData.groupNameList.push(item.groupName)
          }
        })
      }
    })
  }
  
  /**
   * @detail   搜索成员
   */
  handleSearch() {
    let params = {}
    let checkList = this.checkList
    if(this.searchName.length>0){
      params = {
        name: this.searchName
      }
    }
    // 获取成员列表
    this.getMemberList(params).then(res=>{
      if(res.length>0){
        this.groupList.map(item=>{
          item.active = false
        })

        res.map( item => {
          if(checkList.includes(item.uid)){
            item.active = true
          }
        })
        this.memberList = res
        this.isBeforeSearch = true
      }
    })
  }

  /**
   * @detail   多选
   */
  multipleSelection(item) {
    let index = ''
    let checkList = this.checkList
    item.active = !item.active
    if(item.active){

      if(!checkList.includes(item.uid)){
        checkList.push(item.uid)
      }
    }else {
      index = checkList.indexOf(item.uid)
      checkList.splice(index,1)
    }
  }

  /**
   * @detail   成员分类
   */
  memberClassification(groupItem) {
    if(this.isBeforeSearch){
      this.isBeforeSearch = false
      this.memberList = this.baseMemberList
    }
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
      params.id = this.groupMsg.groupId
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

        let params = {
          name: this.form.name,
          memberList: this.checkList.join(',')
        }

        if(params.memberList.length<1){
          delete params.memberList
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

  deepCopy (obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是一个对象
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      // 遍历obj,并且判断是obj的属性才拷贝
      if (obj.hasOwnProperty(key)) {
        // 判断属性值的类型，如果是对象递归调用深拷贝
        newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  }

  openConfirmModel() {
    this.confirmModels.show = !this.confirmModels.show
  }
}
