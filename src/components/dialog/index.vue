<template>
  <section id="zike-dialog" transition="toast" keep-alive="keep-alive">
    <div class="mask" :class="{'show-mask': visiable}"></div>
    <section class="box" :style="{ width: dialogWidth }" :class="{'show-box': visiable}"  >
      <header class="dialog-hd">
        <span class="default" v-if="headType==1"></span>
        <span class="blank" v-else-if="headType==2"></span>
        <img class="icon" src="~IMAGES/dl_err.png"  v-else-if="headType==3"/> 
        <img class="icon" src="~IMAGES/dl_suc.png"  v-else-if="headType==4"/>
        <slot name="title">
          <h3 class="dialog-title" v-html="title"></h3>
        </slot>


        <span @click="handleCancel" v-if="showClose" class="dialog-close">
          <i class="el-icon-close"></i>
        </span>
      </header>

      <main class="dialog-bd" :style="{ minHeight: dialogMinHeight }">
        <slot name="customize-html"></slot>
      </main>
      <footer class="dialog-ft">
        <div class="dialog-ft-btns" :class="{'button_2': bottomType == 2 }" v-if="isHideBtn==='2'">
          <slot name="footer">
            <template v-if="type === 'alert'">
              <el-button type="primary" size="large" @click="handleConfirm" v-text="confirmText" ></el-button>
            </template>
            <template v-else-if="type === 'confirm'">
              <el-button size="large" @click="handleCancel" v-text="cancelText" v-show="showClose"></el-button>
              <el-button 
                type="primary" 
                size="large" 
                @click="handleConfirm" 
                v-text="confirmText" 
                :class="{'err': headType == 3 }"
              ></el-button>
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
    padding: 32px 30px;
    box-sizing: border-box;
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%);
  }

  header {
    height: 24px;
    flex: 0 0 auto;
    position: relative;
    line-height: 24px;
    color: $dialog-header-color;
    >div {
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
    .blank {

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
      vertical-align: middle;
      position: relative;
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
      &.button_2 {
        button {
          width: auto;
          margin: 0 16px 0 8px;
          color: #354048;
          padding: 8px 18px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
        }
      }
      button {
        width: 124px;
        margin: 0 16px 0 8px;
        color: #354048;
        padding: 12px 0;
        
      }
      .el-button--primary {
        &.err {
          background:rgba(255,52,52,0.05);
          border:1px solid rgba(255,52,52,1);
          color:rgba(255,52,52,1) !important;
        }
      }
      
      button:last-child
      { 
        margin-right: 0;
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

