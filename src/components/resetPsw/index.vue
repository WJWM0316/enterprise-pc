<template>
  <section id="reset-psw" keep-alive="keep-alive" v-if="visiable">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :class="{'show-box': visiable}"  >
      <main class="dialog-bd">
        <el-form :model="form" :rules="rules" ref="form">
          <h2>设置登录新密码</h2>
          <p>为确保您在使用系统时账号安全，请设置您的新密码</p>
          <el-form-item prop="name">
            <el-input type="password" v-model="form.name" placehholder="请输入6-20个字符的新密码" maxLength="20"></el-input>
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
    name: ''
  }
  rules = {
    name: [
      { required: true, message: '姓名必须填写，最多10个字符', trigger: 'blur' },
      { max: 5, message: '姓名最多10个字符', trigger: 'blur' }
    ]
  }

  visiable = false

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

  submit(params) {
    this.addMemberApi(params)
        .then((res) => {
          this.$message({message: res.data.msg, type: 'success'})
        })
        .catch(err => {
          this.$message.error(`${err.msg}~`)
        })
  }
}

</script>

<style lang="scss" scoped>
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
}
</style>

