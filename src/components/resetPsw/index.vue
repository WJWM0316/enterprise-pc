<template>
  <section id="reset-psw" keep-alive="keep-alive" v-if="visiable">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :class="{'show-box': visiable}"  >
      <main class="dialog-bd">
        <img src="~IMAGES/lock.png" alt="" class="lock">
        <el-form :model="form" :rules="rules" ref="form">
          <h2>设置登录新密码</h2>
          <p>为确保您在使用系统时账号安全，请设置您的新密码</p>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入6-20个字符的新密码" maxLength="20"></el-input>
          </el-form-item>
          <div>
            <el-button type="primary" @click="submit" class="submit-button">重设密码</el-button>
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
    ...mapActions([])
  },
  computed: {
    ...mapGetters([])
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
    password: ''
  }
  rules = {
    password: [
      { required: true, message: '密码必须填写，6-20个字符', trigger: 'blur' },
      { validator: this.validateBlankCharacter, trigger: 'change' },
      { max: 20, message: '密码最多20个字符', trigger: 'blur' }
    ]
  }

  visiable = false

  close() {
    this.visiable = false
  }
  // 不能输入空白符
  validateBlankCharacter(rule, value, callback) {
    this.form.password = value.trim()
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

  submit(params) {
    this.$refs['form'].validate((valid) => {
      if(valid) {
        //
      }
    })
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
    padding: 30px 46px;
  }
  .submit-button {
    width: 100%;
  }
  h2{
    font-size:16px;
    font-weight:500;
    color:rgba(53,64,72,1);
    line-height:1;
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
  }
  p {
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:1;
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
}
</style>

