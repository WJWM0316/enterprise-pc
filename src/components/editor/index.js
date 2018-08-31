/* eslint-disable */
import Editor from './Editor.vue'

Editor.install = function (Vue) {
  Vue.component(Editor.options.name, Editor)
}

export default Editor
