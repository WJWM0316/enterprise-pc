import Dialog from './index.vue'

Dialog.install = function (Vue) {
  Vue.component(Dialog.options.name, Dialog)
}

export default Dialog
