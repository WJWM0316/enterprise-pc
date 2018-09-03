<template>
  <div id="zike-dialog" transition="toast" keep-alive="keep-alive">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <div class="box" :style="{ width: dialogWidth, minHeight: dialogMinHeight }" :class="{'show-box': visiable}">
      <header class="dialog-hd">
        <slot name="title">
          <h3 class="dialog-title" v-html="title"></h3>
        </slot>
        <!-- <button type="button" class="dialog-close u-btn" @click="handleCloseDialog" v-if="showClose">关闭</button> -->
        <span @click="handleCloseDialog" v-if="showClose" class="dialog-close">
          <i class="el-icon-close"></i>
        </span>
      </header>
      <div class="dialog-bd">
        <slot name="customize-html"></slot>
      </div>
      <footer class="dialog-ft">
          <div class="dialog-ft-btns">
            <slot name="footer">
              <template v-if="type === 'alert'">
                <el-button type="primary" size="large" @click="handleConfirm" v-text="confirmText"></el-button>
              </template>
              <template v-else-if="type === 'confirm'">
                <el-button type="primary" size="large" @click="handleConfirm" v-text="confirmText"></el-button>
                <el-button size="large" @click="handleCancel" v-text="cancelText" v-show="showClose"></el-button>
              </template>
            </slot>
          </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Dialog from './dialog'
export default Dialog
</script>

<style lang="scss" scoped>
@import '~SCSS/variables';
@import '~SCSS/mixins';

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
    border: 15px solid rgba(58, 142, 230,.8);
    transition: all ease-in-out .4s;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 2012;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%) scale(3);
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }

  .dialog-hd {
    flex: 0 0 auto;
    position: relative;
    line-height: 20px;
    color: $dialog-header-color;
    text-indent: 20px;

    .dialog-title {
      font-size: 14px;
      color: #040404;
      font-size: 16px;
    }

    .dialog-close {
      position: absolute;
      right: 10px;
      top: 0;
      padding: 0 10px;
      color: #606266;
      transition: all ease .4s;
      &:hover {
        color: red;
      }
    }
  }

  .dialog-bd {
    flex: 1 1 auto;
    padding: 20px;
    color: $color-level-two;

    .dialog-content {
      text-align: center;
    }
  }

  .dialog-ft {
    flex: 0 0 auto;

    .dialog-ft-btns {
      padding: 20px;
      border-top: solid 1px #e2e3e5;
      text-align: center;
      button {
        width: 135px;
        margin: 0 15px;
      }
    }
  }
}
</style>

