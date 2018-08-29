import PriceInput from './PriceInput.vue'

PriceInput.install = function (Vue) {
  Vue.component(PriceInput.options.name, PriceInput)
}

export default PriceInput
