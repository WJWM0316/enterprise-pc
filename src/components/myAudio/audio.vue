<template>
  <div class="aduio" :class="{'isRead': !isReaded && isNeedRead, 'isReadEnd': isReadEnded && isNeedEnd}"  @click.stop="play">
    <div class="playBtn" :class="{'lessonPlayBtn': isLesson}">
      <img src="@a/icon/playing.png" v-show="status === 0">
      <img src="@a/icon/music_loading.png" class="load" v-show="status === 1">
      <img src="@a/icon/playing.gif" v-show="status === 2">
    </div>
    <div class="progress" :class="{'lessonProgress': isLesson}" ref="progress">
      <div class="realBar" :style="{'width': `${progress}%`}">
        <div class="slider"
          @touchmove.stop.prevent="touchmove"
          @touchstart.stop.prevent="touchstart"
          @touchend.stop.prevent="touchend"
          :currentTime="parseInt(currentTime)"
          :class="{'start': progress === 0, 'end': progress === 100, 'cursor': operation}"
        ></div>
      </div>
    </div>
    <div class="duration lessonDuration" v-if="isLesson">{{messageData.duration | conversion}}</div>
    <div class="duration" v-else>{{messageData.file.duration}}s</div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import browser from '@u/browser'
import Vue from 'vue'
export default {
  props: {
    isNeedRead: { // 是否需要红点标识
      type: Boolean,
      default: false
    },
    isNeedEnd: { // 是否需要已结束标识
      type: Boolean,
      default: false
    },
    audioList: { // 需要续播的音频列表
      type: Array,
      default: () => {
        return []
      }
    },
    messageData: { // 需要播放音频数据
      type: Object,
      default: () => {
        return {
          path: ''
        }
      }
    },
    isLesson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      audio: null,
      status: 0, // 0未播放 1加载中 2播放中
      length: 0,
      offsetX: 0,
      progress: 0,
      startX: 0,
      moveX: 0,
      endX: 0,
      isReaded: this.messageData.isView, // 0 未读 1已读
      isReadEnded: this.messageData.listenStatus, // 0未播完 1播完
      operation: false,
      currentTime: 0, // 当前播放进度
      duration: 0, // 音频时长
      curIndex: 0 // 当前播放音频在audioList的索引值
    }
  },
  watch: {
    audioList () {},
    messageData () {},
    audioCurId (val) {
    }
  },
  computed: {
    ...mapState({
      audioCurId: state => state.global.audioCurId
    }),
    isCurAudio () { // 判断播放的是否当前audio
      if (this.messageData.file) {
        return this.audioCurId === this.messageData.file.id
      } else {
        return this.audioCurId === this.messageData.id
      }
    }
  },
  methods: {
    ...mapActions([
      'updata_audioCurId'
    ]),
    touchstart (e) {
      this.startX = e.changedTouches[0].clientX
    },
    touchmove (e) {
      if (!this.audio.src) return
      this.moveX = e.changedTouches[0].clientX - this.offsetX
      if (this.moveX < 0) {
        this.moveX = 0
      }
      if (this.moveX > this.length) this.moveX = this.length
      this.progress = this.moveX / this.length * 100
      this.currentTime = this.progress * 0.01 * this.audio.duration
      this.operation = true
      this.audio.pause()
      if (this.progress < 0) this.progress = 0
      if (this.progress > 100) this.progress = 100
    },
    touchend (e) {
      if (!this.audio.src) return
      this.operation = false
      this.audio.currentTime = parseInt(this.progress * 0.01 * this.audio.duration) // 取整防止超过音频本身的时长重新播放
      this.audio.play()
    },
    play () {
      let playFun = () => {
        if (!this.audio.src || !this.isCurAudio) {
          if (this.messageData.file) {
            this.audio.src = this.messageData.file.url
          } else {
            this.audio.src = this.messageData.url
          }
        }
        // 消除红点
        if (!this.isReaded && this.isNeedRead) {
          this.isReaded = true
          this.$emit('removeRed')
        }
        try {
          setTimeout(() => {
            let nowId = ''
            if (this.messageData.file) {
              nowId = this.messageData.file.id
            } else {
              nowId = this.messageData.id
            }
            this.updata_audioCurId(nowId)
            this.audio.play()
          }, 200)
        } catch (e) {
          this.audio.play()
        }
      }
      if (!this.isCurAudio) {
        playFun()
      } else {
        if (this.audio.paused) {
          playFun()
        } else {
          this.audio.pause()
        }
      }
    }
  },
  mounted () {
    if (!window.audio) window.audio = new Audio()
    this.audio = window.audio
    this.audioList.filter((item, index) => {
      if (this.messageData.messageId === item.messageId) {
        this.curIndex = index
        return false
      }
    })
    this.$nextTick(() => {
      this.length = this.$refs.progress.clientWidth
      this.offsetX = this.$refs.progress.offsetLeft * window.dpr
    })
    // 缓存阶段
    this.audio.addEventListener('waiting', () => {
      if (!this.isCurAudio) return
      this.status = 1
    }, false)
    // 播放阶段
    this.audio.addEventListener('timeupdate', () => {
      if (!this.isCurAudio) {
        this.status = 0
        return
      }
      if (this.status !== 2) {
        this.status = 2
      }
      this.duration = this.audio.duration
      this.progress = this.audio.currentTime / this.audio.duration * 100
    }, false)
    // 暂停监听
    this.audio.addEventListener('pause', () => {
      if (this.isCurAudio) {
        this.status = 0
      }
    }, false)
    // 结束监听
    this.audio.addEventListener('ended', () => {
      if (!this.isCurAudio) return
      this.status = 0
      if (this.audioList.length - 1 > this.curIndex) {
        this.$emit('nextMusic', this.audioList[this.curIndex + 1].index)
      }
      // 播放完毕
      if (!this.isReadEnded && this.isNeedEnd) {
        this.$emit('endAudio')
        this.isReadEnded = true
      }
    }, false)
  }
}
</script>
<style lang="less">
  .aduio {
    width: 213px;
    height: 40px;
    padding: 0 15px 0 10px;
    white-space: nowrap;
    background: #FFF5CA;
    box-sizing: border-box;
    border-radius: 0px 20px 20px 19px;
    display: flex;
    align-items: center;
    font-size: 0;
    white-space: nowrap;
    position: relative;
    &.isRead:before {
      position: absolute;
      top: 0;
      right: -10px;
      content: '';
      width: 7px;
      height: 7px;
      background: #FF3434;
      border-radius: 50%;
      overflow: hidden;
    }
    &.isReadEnd:after {
      position: absolute;
      top: 50%;
      margin-top: -6px;
      right: -26px;
      content: '';
      width: 15px;
      height: 12px;
      background: url('../../assets/icon/live_icon_playend@3x.png');
      background-size: 100% 100%;
    }
    .playBtn {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
        display: block;
        &.load {
          animation: loading 1s linear infinite;
        }
      }
    }
    .lessonPlayBtn{
      margin-right: 29px;
    }
    .progress {
      width: 125px;
      height: 3px;
      background: #fff;
      border-radius:3px;
      position: relative;
      display: inline-block;
      .realBar {
        width: 50%;
        height: 3px;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        margin-top: -1.5px;
        left: 0;
        background: #FFE266;
        .slider {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.06);
          border:1px solid #F9F9F9;
          position: absolute;
          top: 50%;
          margin-top: -6px;
          right: 0;
          margin-right: -6px;
          box-sizing: border-box;
          &.start {
            margin-right: -12px;
          }
          &.end {
            margin-right: 0;
          }
          &.cursor::before {
            content: attr(currentTime);
            width: 33px;
            height: 24px;
            color: #354048;
            font-weight: 300;
            font-size: 24px; /*px*/
            line-height: 20px;
            text-align: center;
            background: url('../../assets/icon/course.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -250%;
            left: 50%;
            margin-left: -16.5px;
          }
        }
      }
    }
    .lessonProgress{
      width: 188px;
    }
    .duration {
      float: right;
      font-size: 28px; /*px*/
      color: #354048;
      font-weight: 300;
      display: inline-block;
      position: absolute;
      right: 15px;
    }
    .lessonDuration{
      font-size: 28px;/*px*/
      color: #929292;
      right: 25px;
    }
  }
</style>