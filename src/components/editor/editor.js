/* eslint-disable */
import Vue from 'vue'
import Component from 'vue-class-component'
import WangEditor from 'wangeditor'
import { upload_api } from '@/store/api/index.js'
import { getAccessToken } from '@/store/cacheService'

// 添加自定义按钮
import './indent'
import './lineheight'

// 获取cookie
const getcookie = (name) =>{
 const arr = document.cookie.match(new RegExp('[sS]*'+ name +'=([^;]*)'))
 if(arr !== null)
  return unescape(arr[1])
 return null
}

@Component({
  name: 'editor',
  props: {
    content: '',
    path: '',
    height: {
      type: Number,
      default: 400
    }
  },
  watch: {
    content: {
      handler (val) {
        this.handleInput({ content: val })
      },
      immediate: true
    }
  }
})
export default class Editor extends Vue {
  editor = null

  mounted () {
    const self = this
    const editor = new WangEditor(this.$refs.editor)
    editor.config.menus = ['|', 'source', 'bold', 'indent', 'lineheight', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', 'link', 'unlink', /* 'table', */ 'img', /* 'video', */ 'insertcode', 'undo', 'redo', 'fullscreen']
    editor.config.uploadImgUrl = `${upload_api}?token=${getAccessToken()}&attach_type=img`
    editor.config.withCredentials = false
    // 自定义 onchange 触发的延迟时间，默认为 200 ms
    editor.customConfig.onchangeTimeout = 1000 // 单位 ms
    // 自定义load事件
    editor.config.uploadImgFns.onload = (resText) => {
      const _editor = this
      const res = JSON.parse(resText || '{}')
      if (!res || Object.keys(res).length <= 0) {
        this.$message.error('服务器繁忙')
        return false
      }
      if (res.status_code === 200) {
        const url = res.data.img.url
        const originalName = _editor.uploadImgOriginalName || ''

        // 将结果插入编辑器
        let img = document.createElement('img')
        img.onload = () => {
          const html = '<img src="' + url + '" alt="' + originalName + '" style="max-width:100%;"/>'
          _editor.command(null, 'insertHtml', html)
          img = null
        }
        img.onerror = function () {
          img = null
        }
        img.src = url
      } else {
        self.$message.error(res.message)
      }
    }

    editor.create()

    // 添加事件监听
    editor.$txt.on('change', () => {
      this.$emit('blur')
    })

    // 监听编辑器内容变动
    editor.onchange = function () {
      self.handleInput(this.$txt.html())
    }

    this.editor = editor
    this.handleInput()
  }

  /**
   * 实时编辑内容
   * @param {*} content
   * @param {*} event
   */
  handleInput ({ content, event } = {}) {
    if (!this.editor) {
      this.$nextTick(() => {
        this.handleInput()
      })
    } else {
      let html = content || this.editor.$txt.html()
      const $html = $(`<div>${html}</div>`)
      $html.find('img').css({
        maxWidth: '100%'
      })
      html = $html.html()
      this.$emit('input', html)
    }
  }

  /**
   * 清除编辑器内容
   */
  clear () {
    this.editor.clear()
  }
}
