import List from './List.vue'

List.install = function (Vue) {
  Vue.component(List.options.name, List)
}

export default List
