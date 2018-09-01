<template>
  <div class="m-modal-dialog" v-show="visiable">
    <div class="wrapper">
      <div class="dialog" :style="{ width: dialogWidth, minHeight: dialogMinHeight }">
        <header class="dialog-hd">
          <slot name="title">
            <h3 class="dialog-title" v-text="title"></h3>
          </slot>
          <button type="button" class="dialog-close u-btn" @click="handleCloseDialog" v-if="showClose">关闭</button>
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
  </div>
</template>

<script>
import Dialog from './dialog'
export default Dialog
</script>

<style lang="scss" scoped>
@import '~SCSS/variables';
@import '~SCSS/mixins';

[class*="m-modal"] {
  position: fixed;
  left: 0;
  top: 0;
  background: $dialog-bg;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2011;

  & > .wrapper {
    @include setFlex();
    align-items: center;
    align-content: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    min-height: 100%;
    padding: 80px 0;
  }
}

.m-modal-dialog {

  .dialog {
    @include setFlex($direction: column);
    flex: 0 0 auto;
    background: $color-white;
    border-radius: 2px;
    animation: kf-fade-in-top 300ms;
    border: 15px solid rgba(255,0,0,.2)
  }

  .dialog-hd {
    flex: 0 0 auto;
    position: relative;
    /*background: $color-dark;*/
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
      top: 12px;
      padding: 0 10px;
      color: $dialog-close-color;

      &:hover {
        color: $dialog-close-color-hover;
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

