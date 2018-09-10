<template>
  <section id="zike-dialog" transition="toast" keep-alive="keep-alive">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :style="{ width: dialogWidth }" :class="{'show-box': visiable}">
      <header class="dialog-hd">
        <slot name="title">
          <h3 class="dialog-title" v-html="title"></h3>
        </slot>
        <span @click="handleCloseDialog" v-if="showClose" class="dialog-close">
          <i class="el-icon-close"></i>
        </span>
      </header>
      <main class="dialog-bd" :style="{ minHeight: dialogMinHeight }">
        <slot name="customize-html"></slot>
      </main>
      <footer class="dialog-ft">
        <div class="dialog-ft-btns">
          <slot name="footer">
            <template v-if="type === 'alert'">
              <el-button type="primary" size="large" @click="handleConfirm" v-text="confirmText"></el-button>
            </template>
            <template v-else-if="type === 'confirm'">
              <el-button size="large" @click="handleCancel" v-text="cancelText" v-show="showClose"></el-button>
              <el-button type="primary" size="large" @click="handleConfirm" v-text="confirmText"></el-button>
            </template>
          </slot>
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

#zike-dialog {
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
    transform: translate(-50%, -50%) scale(3);
    padding: 30px;
    box-sizing: border-box;
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }

  header {
    flex: 0 0 auto;
    position: relative;
    color: $dialog-header-color;
    line-height: 1;
    margin-left: 18px;
    &:before{
      content: '';
      width:6px;
      background:rgba(255,226,102,1);
      display: inline-block;
      position: absolute;
      height: 80%;
      top: 50%;
      transform: translateY(-50%);
    };
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
      right: -20px;
      top: -20px;
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
        width: 124px;
        margin: 0 16px 0 8px;
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

