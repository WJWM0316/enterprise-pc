<template>
  <div class="zike-audio" :class="{'zike-audio-disable': disabled}">
    <audio ref="audio"
      :src="url" :preload="audio.preload"
      @play="onPlay" 
      @error="onError"
      @waiting="onWaiting"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      style="display: none;" 
      @loadedmetadata="onLoadedmetadata">
    </audio>
    <div>
      <i class="icon iconfont icon-voicecontrol" @click="startPlayOrPause"></i>
      <!-- <i class="active-btn"></i> -->
      <div class="progress">
        <div class="bg"></div>
        <div class="mask" :style="`width: ${(parseInt(audio.currentTime) / audio.maxTime) * 100}%`">
          <div
            class="circle"
            :class="{ 'a-r' : ((parseInt(audio.currentTime) / audio.maxTime) * 100) < 50, 'b-r': ((parseInt(audio.currentTime) / audio.maxTime) * 100) >= 50 }">
            <div class="tips" v-show="audio.currentTime > 1">{{ parseInt(audio.currentTime) }}</div>
          </div>
        </div>
      </div>
      <span class="total">{{ audio.maxTime }}s</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'vue-audio',
  props: {
    theUrl: {
      type: String,
      required: true,
    },
    theSpeeds: {
      type: Array,
      default () {
        return [1, 1.5, 2]
      }
    },
    theControlList: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  }
})
export default class ComponentAudio extends Vue {
  url = this.theUrl
  audio = {
    currentTime: 0,
    maxTime: 0,
    playing: false,
    muted: false,
    speed: 1,
    waiting: true,
    preload: 'auto'
  }
  sliderTime = 0
  volume = 100
  speeds = this.theSpeeds
  controlList = {
    // 不显示下载
    noDownload: false,
    // 不显示静音
    noMuted: false,
    // 不显示音量条
    noVolume: false,
    // 不显示进度条
    noProcess: false,
    // 只能播放一个
    onlyOnePlaying: false,
    // 不要快进按钮
    noSpeed: false
  }
  changeSpeed() {
    let index = this.speeds.indexOf(this.audio.speed) + 1
    this.audio.speed = this.speeds[index % this.speeds.length]
    this.$refs.audio.playbackRate = this.audio.speed
  }
  startMutedOrNot() {
    this.$refs.audio.muted = !this.$refs.audio.muted
    this.audio.muted = this.$refs.audio.muted
  }
  // 音量条toolTip
  formatVolumeToolTip(index) {
    return '音量条: ' + index
  }
  // 进度条toolTip
  formatProcessToolTip(index = 0) {
    index = parseInt(this.audio.maxTime / 100 * index)
    return '进度条: ' + index
  }
  // 音量改变
  changeVolume(index = 0) {
    this.$refs.audio.volume = index / 100
    this.volume = index
  }
  // 播放跳转
  changeCurrentTime(index) {
    this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
  }
  startPlayOrPause() {
    if(this.disabled) return
    return this.audio.playing ? this.pausePlay() : this.startPlay()
  }
  // 开始播放
  startPlay() {
    this.$refs.audio.play()
  }
  // 暂停
  pausePlay() {
    this.$refs.audio.pause()
  }
  // 当音频暂停
  onPause () {
    this.audio.playing = false
  }
  // 当发生错误, 就出现loading状态
  onError () {
    this.audio.waiting = true
  }
  // 当音频开始等待
  onWaiting (res) {}
  // 当音频开始播放
  onPlay (res) {
    this.audio.playing = true
    this.audio.loading = false
    if(!this.controlList.onlyOnePlaying){
      return 
    }
    let target = res.target
    let audios = document.getElementsByTagName('audio');
    [...audios].forEach((item) => {
      if(item !== target){
        item.pause()
      }
    })
  }
  // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
  onTimeupdate(res) {
    this.audio.currentTime = res.target.currentTime
    this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
  }
  // 当加载语音流元数据完成后，会触发该事件的回调函数
  // 语音元数据主要是语音的长度之类的数据
  onLoadedmetadata(res) {
    this.audio.waiting = false
    this.audio.maxTime = parseInt(res.target.duration)
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
      right: -16px;
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
.zike-audio-disable {
  opacity: .5;
}
</style>