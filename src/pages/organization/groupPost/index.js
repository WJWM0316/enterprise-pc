import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBar from 'COMPONENTS/searchBar/index.vue'
import { getMemberListApi, getGroupListApi, deleteGroupApi, addGroupApi, editGroupApi } from '@/store/api/organization.js'

@Component({
  name: 'groupPost',
  methods: {
    ...mapActions([
      'showMsg',
      'getMenberListsApi'
    ])
  },
  computed: {
    ...mapGetters([
      'jobCircleLists',
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
    id: '',
    name: '',
  }

  rules = {
    name: [
      //{ required: true, message: '分组名必须填写，最多20个字', trigger: 'blur' }
      { required: true,validator: this.validatePass,  trigger: 'blur' }
    ]
  }


  checkList = {
    tem: [],
    value: []
  }

  groupList = []

  temMenberLists = []
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
    const data = {
      tem: [],
      value: []
    }

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

    this.getMenberListsApi().then((res) => {
      this.temMenberLists = [...this.menberLists]
      this.checkList = data

      if(this.$route.name === 'editGroup'){
        this.getEditMsg()
      }
      if(this.groupLists.length>0){
        let groupList = [{
          groupName:'所有人',
          groupId:'all',
          active: false
        }]
        this.groupLists.map(item=>{
          item.active = false
          groupList.push(item)
        })
        this.groupList = groupList
      }
    })
  }

  //编辑信息操作
  getEditMsg(){
    getMemberListApi({groupId: this.$route.params.groupId}).then(res=>{
      const menberLists = [...res.data.data]
      const list = []

      menberLists.map(field => {
        list.push(field.realname)
      })
      this.checkList.tem = list
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
    this.getMenberListsApi(params)
      .then(() => {
        this.temMenberLists = [...this.menberLists]
      })
  }

  /**
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
   * @detail   成员分类
   */
  memberClassification(groupItem) {
    /*const data = {
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
    }*/
    
    let data = {
      tem: [...this.checkList.tem],
      value: [...this.checkList.value]
    } 
    const menberLists = [...this.menberLists]
    groupItem.active = !groupItem.active
      
    if(groupItem.groupId === 'all'){
      data = {
        tem: [],
        value: []
      }
    }
    console.log(groupItem.groupId)
    menberLists.map(field => {
      if(groupItem.groupId === 'all'){
        if(groupItem.active){
          // 选中
          data.tem.push(field.realname)
          data.value.push(field.uid)
        }

        this.groupList.map(item=>{
          item.active = groupItem.active
        })
      }else {
        if(field.selfGroup.includes(groupItem.groupId)) {
          console.log(field.uid)
          if(groupItem.active ){
            // 选中
            if(!data.value.includes(field.uid)){
              data.tem.push(field.realname)
              data.value.push(field.uid)
            }
          }else {
            //取消
            let index = data.value.indexOf(field.uid)
            if(index>-1){
              data.value.splice(index, 1);
              data.tem.splice(index, 1);
            }
          }
        }
      }
    })
    console.log(data)
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
          memberList: this.checkList.value.join(',')
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
