<template>
  <section id="add-member-box" transition="toast" keep-alive="keep-alive">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :class="{'show-box': visiable}"  >
      <header class="dialog-hd">
        <span class="default" v-if="headType==1"></span>
        <slot name="title">
          <h3 class="dialog-title" v-html="title"></h3>
        </slot>
        <span @click="handleCancel" v-if="showClose" class="dialog-close">
          <i class="el-icon-close"></i>
        </span>
      </header>
      <main class="dialog-bd" :style="{ minHeight: dialogMinHeight }">
        <el-form :model="form" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" class="limit-width" placehholder="限制10个字以内"></el-input>
          </el-form-item>
          <el-form-item label="选择性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职位" prop="occupation">
            <el-input v-model="form.occupation" class="limit-width" placeholder="请填写职位信息"></el-input>
          </el-form-item>
          <el-form-item label="所属分组" prop="groupId">
            <el-select v-model="form.groupId" placeholder="请选择分组" class="limit-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="region">
            <el-select v-model="form.region" placeholder="选择权限" class="limit-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.mobile" class="limit-width" placeholder="请填写手机号"></el-input>
          </el-form-item>
          <el-form-item label="微信号">
            <el-input v-model="form.wechat" class="limit-width" placeholder="请填写微信号"></el-input>
          </el-form-item>
          <div>
            <div class="continute-button">
              <div
                class="common-checkbox common-checkbox-active">
                <i class="icon iconfont icon-check-circle" v-if="false"></i>
                <i class="icon iconfont icon-radio_default"></i>
                <span style="color: #354048">继续添加下一个</span>
              </div>
            </div>
            <el-button type="primary" @click="submitForm('form')" class="submit-button">提交</el-button>
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
  name: 'modal-dialog',
  computed: {
    ...mapGetters(['openModal'])
  },
  model: {
    prop: 'show',
    event: 'input'
  },
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: true
    },

    // 弹窗类型
    type: {
      type: String,
      default: 'alert'
    },

    //头部类型 1黄条。2 空格。3错误。4 正确
    headType: {
      type: String,
      default: '1'
    },

    //按钮类型 1默认固定宽度。2 padding
    bottomType: {
      type: String,
      default: '1'
    },

    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },

    // 弹窗标题
    title: {
      type: String,
      default: '添加新成员'
    },

    // 弹窗内容
    content: {
      type: String,
      default: ''
    },

    // 弹窗宽度
    width: {
      type: [Number, String],
      default: 682
    },

    // 弹窗最小高度
    minHeight: {
      type: [Number, String],
      default: 90
    },

    // 确定按钮文本
    confirmText: {
      type: String,
      default: '确定'
    },

    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消'
    },

    //是否隐藏 1是。2 否
    isHideBtn: {
      type: String,
      default: '2'
    }
  },
  watch: {
    show: {
      handler(show) {
        this.visiable = show
        this.$store.dispatch('switchOpenModal', show)
      },
      immediate: true
    },
    visiable: {
      handler(visiable) {
        if (!visiable) {
          this.$emit('close')
        }
      }
    }
  }
})
export default class ComponentDialog extends Vue {

  visiable = false

  form = {
    name: '',
    occupation: '',
    email: '',
    wechat: '',
    region: '',
    mobile: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    gender: '',
    desc: ''
  }
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    occupation: [
      { required: true, message: '请输入职位', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    region: [
      { required: true, message: '请选择权限', trigger: 'change' }
    ],
    gender: [
      { required: true, message: '请选择性别', trigger: 'change' }
    ],
    wechat: [
      { required: true, message: '请输入微信号', trigger: 'blur' }
    ],
    mobile: [
      { required: true, message: '请输入手机号', trigger: 'blur' }
    ]
  }
  // 弹窗宽度
  get dialogWidth() {
    const width = this.width
    return width.toString().indexOf('px') >= 0 ? width : `${width}px`
  }

  // 弹窗最小高度
  get dialogMinHeight() {
    const minHeight = this.minHeight
    return minHeight.toString().indexOf('px') >= 0 ? minHeight : `${minHeight}px`
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

  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false;
      }
    })
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

