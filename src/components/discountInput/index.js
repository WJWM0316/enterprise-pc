import DiscountInput from './DiscountInput.vue'

DiscountInput.install = function (Vue) {
  Vue.component(DiscountInput.options.name, DiscountInput)
}

export default DiscountInput
