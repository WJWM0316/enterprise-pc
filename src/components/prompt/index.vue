<template>
  <section id="zike-prompt" transition="toast" keep-alive="keep-alive">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :style="{ width: dialogWidth }" :class="{'show-box': visiable}">
      <header class="dialog-hd">
        <div class="prompt-title">
          <i v-if="icon" :class="icon"></i>
          {{title}}
        </div> 
        <span @click="handleCancel" v-if="showClose" class="dialog-close">
          <i class="el-icon-close"></i>
        </span>
      </header>
      <main class="dialog-bd" :style="{ minHeight: dialogMinHeight }">
        <slot name="customize-html"></slot>
      </main>
      <footer class="dialog-ft">
        <div class="dialog-ft-btns">
          <el-button size="mini" @click="handleCancel" v-text="cancelText" v-show="showClose"></el-button>
          <el-button type="primary" size="mini" @click="handleConfirm" v-text="confirmText"></el-button>
        </div>
      </footer>
    </section>
  </section>
</template>

<script>
import ComponentDialog from './index'
export default ComponentDialog
</script>

<style lang="scss" scoped>
@import '~COLORS/variables.scss';

#zike-prompt {
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 2011;
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
  .prompt-title{
    font-size:16px;
    font-weight:500;
    color:rgba(53,64,72,1);
    line-height: 1;
  }
  .box {
    background: white;
    border-radius: 2px;
    transition: all ease-in-out .4s;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2012;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%);
    padding: 24px 32px;
    box-sizing: border-box;
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%);
  }

  header {
    flex: 0 0 auto;
    position: relative;
    color: $dialog-header-color;
    line-height: 1;
    .dialog-title {
      font-size: 14px;
      color: #040404;
      font-size: 16px;
      margin: 0;
      display: inline-block;
      vertical-align: middle;
    }
    .dialog-close {
      position: absolute;
      right: -23px;
      top: -15px;
      color: #606266;
      transition: all ease .4s;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }

  .dialog-bd {
    flex: 1 1 auto;
    color: $color-level-two;
    .dialog-content {
      text-align: center;
    }
  }

  footer {
    flex: 0 0 auto;
    .dialog-ft-btns {
      text-align: right;
      button {
        width: 64px;
        color: #354048;
      }
      .el-button--default{
        border: 1px solid rgba(220,223,230,1);
      }
    }
  }
  .el-icon-close {
    display: inline-block;
  }
}
</style>

