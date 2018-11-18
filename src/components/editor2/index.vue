<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import E from 'wangeditor'
import { upload_api } from '@/store/api/index.js'
import { getAccessToken } from '@/store/cacheService'

@Component({
  name: 'editor-bar',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(html) {
        if(this.editor) {
          this.editor.txt.html(html)
        }
      },
      immediate: true
    },
    isClear: {
      handler(val) {
        if(val) {
          this.editor.txt.clear()
        }
      },
      immediate: true
    }
  }
})
export default class pageEditor extends Vue {
  editor = null
  init() {
    this.editor = new E(this.$refs.toolbar, this.$refs.editor)
    this.editor.customConfig.uploadImgServer = `${upload_api}?token=${getAccessToken()}&attach_type=img`
    this.editor.customConfig.withCredentials = false
    this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024 // 将图片大小限制为 5M
    this.editor.customConfig.zIndex = 2
    this.editor.customConfig.showLinkImg = false
    // 自定义 onchange 触发的延迟时间，默认为 200 ms
    this.editor.customConfig.onchangeTimeout = 1000 // 单位 ms
    // 配置菜单
    this.editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]

    this.editor.customConfig.uploadImgHooks = {
      fail(xhr, editor, result) {
        // 插入图片失败回调
      },
      success(xhr, editor, result) {
        // 图片上传成功回调
      },
      timeout(xhr, editor) {
        // 网络超时的回调
      },
      error(xhr, editor) {
        // 图片上传错误的回调
      },
      customInsert(insertImg, result, editor) {
        insertImg(result.data[0].url)
      }
    }
    this.editor.customConfig.onblur = (html) => {
      this.$emit('change', html) // 将内容同步到父组件中
    }
    this.editor.customConfig.customAlert = (info) => {
      this.$message.error('上传图片大小不能超过5M~')
    }
    this.editor.create()
  }
  mounted() {
    this.init()
  }
}
</script>

<style lang="css">
.editor {
  position: relative;
  z-index: 1;
}
.toolbar {
  border: 1px solid #ccc;
  padding: 0 5px;
  border-bottom: unset;
  background: white;
}
.text {
  border: 1px solid #ccc;
  height: 500px;
}
</style>