import Checkbox from './Checkbox.vue'

Checkbox.install = function (Vue) {
  Vue.component(Checkbox.options.name, Checkbox)
}

export default Checkbox
