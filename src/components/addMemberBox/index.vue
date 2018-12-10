<template>
  <section id="add-member-box" keep-alive="keep-alive">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :class="{'show-box': visiable}"  >
      <header class="dialog-hd">
        <span class="default"></span>
        <h3 class="dialog-title">添加新成员</h3>
        <span @click="handleCancel" class="dialog-close"> <i class="el-icon-close"></i> </span>
      </header>
      <main class="dialog-bd">
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" class="limit-width" placehholder="限制10个字以内"></el-input>
          </el-form-item>
          <el-form-item label="选择性别" prop="gender">
            <el-radio v-model="form.gender" label=1>男</el-radio>
            <el-radio v-model="form.gender" label=2>女</el-radio>
          </el-form-item>
          <el-form-item label="职位" prop="occupation">
            <el-input v-model="form.occupation" class="limit-width" placeholder="请填写职位信息"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" prop="groupId">
            <el-select
              class="limit-width"
              popper-class="limit-select-dropdown-height"
              v-model="form.groupId"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="所属分组">
              <el-option
                v-for="groupItem in groupLists"
                :key="groupItem.groupId"
                :label="groupItem.groupName"
                :value="groupItem.groupId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="roleId">
            <el-select v-model="form.roleId" placeholder="选择权限" class="limit-width">
              <el-option :label="roleItem.label" :value="roleItem.value" v-for="roleItem in roleList" :key="roleItem.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理分组" prop="contentAdminGroup" v-if="form.roleId === 3">
            <el-select
              class="limit-width"
              popper-class="limit-select-dropdown-height"
              v-model="form.contentAdminGroup"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择分组">
              <el-option
                v-for="groupItem in groupLists"
                :key="groupItem.groupId"
                :label="groupItem.groupName"
                :value="groupItem.groupId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="form.mobile" class="limit-width" placeholder="请填写手机号" maxLength="11"></el-input>
          </el-form-item>
          <el-form-item label="微信号" prop="wechat">
            <el-input v-model="form.wechat" class="limit-width" placeholder="请填写微信号"></el-input>
          </el-form-item>
          <div>
            <div class="continute-button">
              <div
                class="common-checkbox" @click="checked" :class="{'common-checkbox-active': form.isContinuted}">
                <i class="icon iconfont icon-check-circle" v-if="form.isContinuted"></i>
                <i class="icon iconfont icon-radio_default" v-if="!form.isContinuted"></i>
                <span style="color: #354048">继续添加下一个</span>
              </div>
            </div>
            <el-button type="primary" @click="preSubmit" class="submit-button">提交</el-button>
          </div>
        </el-form>
      </main>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'modal-add-member-box',
  methods: {
    ...mapActions([
      'getGroupListsApi',
      'addMemberApi'
    ])
  },
  computed: {
    ...mapGetters([
      'groupLists',
      'openModal'
    ])
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: {
      handler(show) {
        this.visiable = show
      },
      immediate: true
    },
    visiable: {
      handler(visiable) {
        if(!visiable) this.$emit('close')
      },
      immediate: true
    }
  }
})
export default class ComponentAddMemberBox extends Vue {
  form = {
    name: '',
    occupation: '',
    email: '',
    wechat: '',
    mobile: '',
    password: '123456',
    gender: '1',
    groupId: [],
    roleId: '',
    contentAdminGroup: [],
    isContinuted: false
  }
  rules = {
    name: [
      { required: true, message: '姓名必须填写，最多10个字符', trigger: 'blur' },
      { validator: this.validateBlankCharacterName, trigger: 'change' },
      { max: 10, message: '姓名最多10个字符', trigger: 'blur' }
    ],
    occupation: [
      { required: true, message: '请输入职位', trigger: 'blur' },
      { validator: this.validateBlankCharacter, trigger: 'change' },
      { max: 40, message: '职位最多40个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '邮箱必须填写，可作为成员登录邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    roleId: [
      { required: true, message: '请选择权限', trigger: 'change' }
    ],
    groupId: [
      { required: true, message: '请选择分组', trigger: 'change' }
    ],
    contentAdminGroup: [
      { required: true, message: '请选择管理分组', trigger: 'change' }
    ],
    gender: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ],
    wechat: [
      { validator: this.validatorWechat,  trigger: 'change' }
    ],
    mobile: [
      { validator: this.validatorMobile,  trigger: 'change' }
    ]
  }
  roleList = [
    {
      value: 6,
      label: '普通学员'
    },
    {
      value: 3,
      label: '课程、直播和工作圈管理'
    },
    {
      value: 2,
      label: '后台管理员'
    },
    {
      value: 1,
      label: '超级管理员'
    }
  ]

  visiable = false

  // 不能输入空白符
  validateBlankCharacterName(rule, value, callback) {
    if(!value.slice(0, 1).trim()) {
      this.form.name = value.trim()
      callback()
    } else {
      callback()
    }
  }

  // 不能输入空白符
  validateBlankCharacter(rule, value, callback) {
    if(!value.slice(0, 1).trim()) {
      this.form.occupation = value.trim()
      callback()
    } else {
      callback()
    }
  }

  //手机
  validatorMobile(rule, value, callback){
    let val = value.replace(/(^\s*)|(\s*$)/g, '')
    let re = new RegExp(/^[1][3,4,5,7,8,9][0-9]{9}$/)
    if (val.length === 0) {
      callback()
    } else if(val.length > 0) {
      if(!re.test(val)){
        callback(new Error('手机格式不正确'))
      } else {
        callback()
      }
    }
  }

  //微信
  validatorWechat(rule, value, callback){
    if(!value.slice(0, 1).trim()) {
      this.form.wechat = value.trim()
      callback()
    } else {
      callback()
    }
  }

  close() {
    this.visiable = false
  }
  /**
   * 关闭弹窗
   */
  handleCloseDialog() {
    this.visiable = false
    this.$emit('input', this.visiable)
  }

  /**
   * 点击确定
   */
  handleConfirm() {
    this.$emit('confirm')
  }

  /**
   * 点击取消
   */
  handleCancel() {
    this.handleCloseDialog()
    this.$emit('cancel')
  }

  transformData() {
    const formData = {...this.form}
    delete formData.isContinuted
    formData.groupId = formData.groupId.join(',')
    if(formData.contentAdminGroup.length) {
      formData.contentAdminGroup = formData.contentAdminGroup.join(',')
    } else {
      delete formData.contentAdminGroup
    }
    if(!formData.mobile) delete formData.mobile
    if(!formData.wechat) delete formData.wechat
    return formData
  }

  preSubmit() {
    this.$refs['form'].validate((valid) => {
      if(valid) {
        const params = this.transformData()
        this.submit(params)
      }
    })
  }

  submit(params) {
    this.addMemberApi(params)
        .then((res) => {
          this.$message({message: res.data.msg, type: 'success'})
          if(this.form.isContinuted) {
            this.$refs['form'].resetFields()
            this.form.wechat = ''
            this.form.mobile = ''
            this.form.contentAdminGroup = []
          } else {
            this.close()
          }
        })
        .catch(err => {
          this.$message.error(`${err.msg}~`)
        })
  }

  checked() {
    this.form.isContinuted = !this.form.isContinuted
  }
  created() {
    this.getGroupListsApi()
  }
}

</script>

<style lang="scss" scoped>
@import '~COLORS/variables.scss';
#add-member-box {
  .limit-width {
    width: 100%;
  }
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 5;
    opacity: 0;
    visibility: hidden;
    transition: all ease .4s;
    transform: scale(10);
  }
  .mask.show-mask {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  .box {
    width: 530px;
    background: white;
    border-radius: 2px;
    transition: all ease-in-out .4s;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 6;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%);
    /*padding: 32px 30px;*/
    box-sizing: border-box;
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%);
  }

  header {
    height: 62px;
    line-height: 62px;
    flex: 0 0 auto;
    position: relative;
    color: $dialog-header-color;
    border-bottom: 1px solid #EDEDED;
    > div {
      display: inline-block;
    }
    .default {
      width:6px;
      background:rgba(255,226,102,1);
      display: inline-block;
      height: 16px;
      margin-right: 16px;
      margin-left: 16px;
      position: relative;
      top: 4px;
    }
    .icon {
      width:24px;
      height:24px;
      margin-right: 16px;
      position: relative;
      top: 2px;
      float: left;
    }
    .dialog-title {
      font-size: 14px;
      color: #354048;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      display: inline-block;
      position: relative;
    }
    .dialog-close {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #606266;
      transition: all ease .4s;
      cursor: pointer;
      line-height: 1;
      &:hover {
        color: red;
      }
    }
  }
  .el-form-item {
    margin-right: 60px;
  }
  .el-form-item__label {
    padding-right: 16px;
  }
  .dialog-bd {
    flex: 1 1 auto;
    color: $color-level-two;
    padding: 40px 32px 24px 32px;
    .dialog-content {
      text-align: center;
    }
  }
  .submit-button {
    float: right;
    width: 124px;
  }
  .continute-button {
    display: inline-block;
  }
  input::-webkit-input-placeholder{
    color: #BCBCBC;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>

