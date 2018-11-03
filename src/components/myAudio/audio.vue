<template>
  <div class="zike-audio">
<!--     <audio :ref="audio"
      :src="url" :preload="audio.preload"
      @play="onPlay" 
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      style="display: none;" 
      @loadedmetadata="onLoadedmetadata">
    </audio> -->
    <div>
      <i class="icon iconfont icon-voicecontrol"></i>
      <!-- <i class="active-btn"></i> -->
      <div class="progress">
        <div class="bg"></div>
        <div class="mask">
          <div
            class="circle">
            <div class="tips"></div>
          </div>
        </div>
      </div>
      <span class="total">11</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'vue-audio',
  props: {
    infos: { // 需要播放音频数据
      type: Object,
      default: () => {
        return {
          url: ''
        }
      }
    }
  },
  watch: {
    'infos': {
      handler() {
        this.init()
      },
      immediate: true
    }
  }
})
export default class ComponentAudio extends Vue {
  audio = null
  init() {
    if (!window.audio) window.audio = new Audio()
    this.audio = window.audio
    this.audio.src = this.infos.url
    // document.querySelector('.zike-audio').appendChild(this.audio)
    // this.audio.play()
  }
}
</script>

<style lang="scss">
.zike-audio {
  height:40px;
  background:rgba(255,249,217,1);
  border-radius:20px;
  border:1px solid rgba(215,171,112,0.2);
  position: relative;
  line-height: 40px;
  padding: 0 14px;
  display: inline-block;
  > div {
    height: 40px;
    line-height: 40px;
  }
  .start,
  .total {
    font-size:12px;
    color:rgba(102,102,102,1);
  }
  .progress {
    width:158px;
    height:4px;
    border-radius:6px;
    display: inline-block;
    margin: 0 10px;
    vertical-align: middle;
    position: relative;
    .mask {
      height:4px;
      background:rgba(255,226,102,1);
      border-radius:6px;
      position: relative;
    }
    .bg{
      background:rgba(0,0,0,0.04);
      border-radius:6px;
      display: inline-block;
      vertical-align: middle;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top:0;
    }
    .circle {
      width:12px;
      height:12px;
      background:rgba(255,255,255,1);
      border:2px solid rgba(255,226,102,1);
      border-radius: 50%;
      position: absolute;
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
    }
    .a-r{
      right: -12px;
    }
    .b-r {
      right: 0;
    }
    .tips {
      width:32px;
      height:28px;
      background:rgba(250,106,48,1);
      border-radius:4px;
      position: absolute;
      top: -40px;
      line-height: 28px;
      text-align: center;
      font-size: 4px;
      color: #fff;
      left: 50%;
      transform: translateX(-50%);
      &:after {
        width: 0;
        height: 0;
        border-color: red;
        position: absolute;
        bottom: -11px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: rgba(250,106,48,1) transparent transparent transparent ;
        display: block;
        content: '';
      }
    }
  }
}
</style>