<template>
<div class="audio-box">
    <audio
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      :src="theUrl"
      controls="controls" style="display:none;"></audio>
    <div>
      <div class="left-button" @click="startPlayOrPause" :class="{'is-playing': audio.playing, 'is-default': !audio.playing }"></div>
      <div class="slider" @touchstart="handleTouchStart">
        <div class="slider-track"></div>
        <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
        <div class="slider-thumb" :style="'left:'+sliderTime+'%'">
          <div class="tips" v-show="audio.playing && audio.currentTime >= 1">{{ parseInt(audio.currentTime) }}</div>
        </div>
      </div>
      <div class="right-button">{{ audio.maxTime }}s</div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'self-audio',
  props: {
    theUrl: {
      type: String,
      required: true,
    }
  }
})
export default class ComponentAudio extends Vue {

  // fallingStar = fallingStar
  sliderTime = 0
  audio = {
    // 该字段是音频是否处于播放状态的属性
    playing: false,
    // 音频当前播放时长
    currentTime: 0,
    // 音频最大播放时长
    maxTime: 0,
    minTime:0,
    step:0.1
  }
  startPlayOrPause() {
    return this.audio.playing ? this.pause() : this.play()
  }
  play() {
    this.$refs.audio.play()
  }
  pause() {
    this.$refs.audio.pause()
  }
  onPlay() {
    this.audio.playing = true
  }
  onPause() {
    this.audio.playing = false
  }
  onLoadedmetadata(res) {
    this.audio.maxTime = parseInt(res.target.duration)
  }
  onTimeupdate(res) {
    this.audio.currentTime = res.target.currentTime
    this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
  }

  handleTouchStart(e) {
    this.setValue(e.touches[0])
    document.addEventListener('touchmove', this.handleTouchMove)
    document.addEventListener('touchup', this.handleTouchEnd)
    document.addEventListener('touchend', this.handleTouchEnd)
    document.addEventListener('touchcancel', this.handleTouchEnd)
  }
  handleTouchMove(e){
    this.setValue(e.changedTouches[0])
  }
  handleTouchEnd(e) {
    this.setValue(e.changedTouches[0])
    document.removeEventListener('touchmove', this.handleTouchMove)
    document.removeEventListener('touchup', this.handleTouchEnd)
    document.removeEventListener('touchend', this.handleTouchEnd)
    document.removeEventListener('touchcancel', this.handleTouchEnd)
  }
  setValue(e) {
    const $el = this.$el
    const {
      maxTime,
      minTime,
      step
    } = this.audio
    let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (maxTime - minTime)
    value = Math.round(value / step) * step + minTime
    value = parseFloat(value.toFixed(5))

    if (value > maxTime) {
      value = maxTime
    } else if (value < minTime) {
      value = minTime
    }
    this.$refs.audio.currentTime = value
  }
}
</script>

<style lang="less">
.audio-box {
  width: 240px;
  height: 40px;
  line-height: 40px;
  position: relative;
  box-sizing: border-box;
  background:rgba(255,249,217,1);
  border-radius:20px;
  border:1px solid #D7AB70;
  > div {
    display: flex;
  }
  .left-button {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .is-playing{
    background: url('~IMAGES/playing.gif') no-repeat center center;
    background-size: 50%;
  }
  .is-default{
    background: url('~IMAGES/playing.png') no-repeat center center;
    background-size: 50%;
  }
  .right-button {
    width: 50px;
    text-align: center;
    font-size:12px;
    color:rgba(102,102,102,1);
  }
  .tips {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    background:rgba(250,106,48,1);
    border-radius:4px;
    color: white;
    text-align: center;
    font-size:14px;
    color:rgba(255,255,255,1);
    box-sizing: border-box;
    min-width: 35px;
    line-height: 1.4;
    &:after {
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      bottom: -10px;
      border-color: #fa6a30 transparent transparent transparent;
      display: block;
      content: '';
    }
  }
  .slider {
    position: relative;
    height: 40px;
    flex-grow: 1;
  }

  .slider-track {
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -1px;
    background: rgba(0,0,0,.04);
  }

  .slider-fill {
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #FFE266;
    left: 0;
    top: 50%;
    margin-top: -1px;
  }

  .slider-thumb {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background-color: #FFE266;
    color: #e92e35;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>