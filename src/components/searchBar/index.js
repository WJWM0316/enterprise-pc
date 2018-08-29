import SearchBar from './SearchBar.vue'

SearchBar.install = function (Vue) {
  Vue.component(SearchBar.options.name, SearchBar)
}

export default SearchBar
