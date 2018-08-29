import Vue from 'vue'
import Component from 'vue-class-component'
import WangEditor from 'wangeditor'

// 添加自定义按钮
import './indent'
import './lineheight'

@Component({
  name: 'editor',
  props: {
    content: '', // 编辑器初始内容
    path: '', // 图片上传路径
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
    editor.config.uploadImgFileName = 'img'
    editor.config.uploadImgUrl = this.path
    // 自定义load事件
    editor.config.uploadImgFns.onload = function (resText, xhr) {
      const _editor = this
      const res = JSON.parse(resText || '{}')
      console.log(res)
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
          console.log('已插入图片，地址 ' + url)
          img = null
        }
        img.onerror = function () {
          console.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + url)
          img = null
        }
        img.src = url
      } else {
        self.$message.error(res.message)
      }
    }

    editor.create()

    // 添加事件监听
    editor.$txt.on('blur', () => {
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
    // this.$emit('input', this.editor.$txt.html())
  }
}
