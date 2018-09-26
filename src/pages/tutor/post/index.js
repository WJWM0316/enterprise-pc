import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Editor from 'COMPONENTS/editor'
import Cropper from 'cropperjs'
import { editorRules } from 'FILTERS/rules'
import { createTutorApi } from 'STORE/api/tutor.js'

@Component({
  components: {
    ModalDialog,
    Editor
  },
  methods: {
    ...mapActions([
      'showMsg',
    ])
  },
  computed: {
  }
})
export default class WorkZonePost extends Vue {

  form = {
    // 导师名称
    name: '',
    // 导师头衔
    title: '',
    // 手机号
    mobile: '',
    // 设置密码
    password: '',
  }

  // 初始化裁剪对象
  cropper = null

  rules = {
    name: [
      { required: true, message: '请输入导师名称', trigger: 'blur' }
    ],
    title: [
      { required: true, message: '请输入导师头衔', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur'}
    ]
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '创建成功',
    showClose: true,
    minHeight: 100,
    txt: '已经帮导师创建账号成功，可以交给导师登录了',
    confirmText: '知道了',
    type: 'alert'
  }

  // 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '提交'
  restaurants = []
  timeout =  null
  temMenberLists = []

  // 检测是否可以提交
  checkSubmit() {
    this.$refs['form'].validate((valid) => {
      console.log(valid)
      if (valid) {
        // 给提交按钮加个loading
        this.submitBtnClick = !this.submitBtnClick
        // 修改提交时按钮的文案
        this.submitBtnTxt = '正在提交'
        const need = ['name', 'title', 'mobile', 'password']
        const params = this.transformData(this.form, need)

        console.log(params)
        this.submit(params)
      }
    })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   获取提交参数
   * @return   {[type]}   [description]
   */
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
  // 提交表单数据
  submit(params) {
    let that = this
    createTutorApi(params)
      .then(res => {
        that.models.show = true
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
      .catch(err => {
        this.$message.error(`${err.data.msg}~`);
        setTimeout(() => {
          this.submitBtnClick = !this.submitBtnClick
          this.submitBtnTxt = '提交'
        }, 3000)
      })
  }

  // 选择搜索到的数据
  search(type) {}

  created() {
    this.initPageByPost()
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-12
   * @detail   初始化新增页面数据
   * @return   {[type]}   [description]
   */
  initPageByPost() {
    if(this.$route.name !== 'workZonePost') return
    // 获取组列表
    this.getGroupListsApi()
    // 获取成员列表
    this.getMenberListsApi({selectAll: 1})
      .then(() => {
        this.temMenberLists = [...this.menberLists]
      })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗确定按钮
   * @return   {[type]}   [description]
   */
  confirm() {
    this.$router.push({ name: 'tutor'})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗关闭按钮
   * @return   {[type]}        [description]
   */
  cancel() {
    this.models.show = false
  }

  todoAction(type) {}
}