<template>
  <section id="reset-psw" v-show="visiable">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :class="{'show-box': visiable}"  >
      <main class="dialog-bd">
        <img src="~IMAGES/lock.png" alt="" class="lock image-lock">
        <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
          <h2>设置登录新密码</h2>
          <p>为确保您在使用系统时账号安全，请设置您的新密码</p>
          <el-form-item prop="newPwd">
            <el-input type="password" v-model="form.newPwd" placeholder="请输入6-20个字符的新密码" maxLength="20"></el-input>
          </el-form-item>
          <div>
            <a @click="submit" class="submit-button">重设密码</a>
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
  name: 'modal-reset-psw',
  methods: {
    ...mapActions(['editPwdApi'])
  },
  props: {
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
    }
  }
})
export default class ComponentAddMemberBox extends Vue {
  
  form = {
    newPwd: ''
  }

  rules = {
    newPwd: [
      { required: true, message: '密码必须填写', trigger: 'blur' },
      { min: 6, max: 20, message: '密码必须填写，6-20个字符', trigger: 'blur' },
      { validator: this.validateBlankCharacter, trigger: 'change' }
    ]
  }

  visiable = false

  // 不能输入空白符
  validateBlankCharacter(rule, value, callback) {
    callback()
    this.form.newPwd = value.replace(/^ +| +$/g, '')
  }

  submit() {
    this.$refs['form'].validate((valid) => {
      if(valid) {
        this.editPwdApi({newPwd: this.form.newPwd})
            .then(() => {
              this.$message({message: '修改成功~', type: 'success'})
              window.localStorage.removeItem('UFC')
              window.location.reload()
            })
      }
    })
  }

  showResetPsw() {
    const image = document.querySelector('.image-lock')
    if(image) {
      image.onload = () => this.visiable = true
    }
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   回车键登录
   * @return   {[type]}          [description]
   */
  onEnterLogin(e) {
    document.onkeydown = (e) => {
     const code = window.event ? e.keyCode : e.which
     if(code === 13) this.submit()
    }
  }

  mounted() {
    this.onEnterLogin()
  }
}

</script>

<style lang="scss">
@import '~COLORS/variables.scss';
#reset-psw {
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
    width: 460px;
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
    box-sizing: border-box;
    width: 432px;
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%);
  }
  .dialog-bd {
    flex: 1 1 auto;
    color: $color-level-two;
    padding: 24px 46px 30px 46px;
  }
  .submit-button {
    width: 100%;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFE266;
    border: 1px solid #FFE266;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  h2{
    font-size:20px;
    font-weight:500;
    color:rgba(53,64,72,1);
    line-height:1;
    text-align: center;
    margin: 5px 0;
    font-weight: 500;
  }
  p {
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:22px;
    margin: 0;
    margin-bottom: 30px;
  }
  .lock{
    display: block;
    margin: 0 auto;
    width: 140px;
  }
  .el-form-item__error {
    position: relative;
  }
  .el-form-item {
    margin-bottom: 16px !important;
  }
  input::-webkit-input-placeholder {
    color: #dcdcdc;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>

