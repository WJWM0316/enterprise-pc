import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'search-bar',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    placeholder: {
      type: String,
      default: '请输入关键词'
    },

    // 类型，0=>默认，1=>略小灰色搜索框
    type: {
      type: Number,
      default: 0
    }
  },
  watch: {
    value: {
      handler (val) {
        this.keyword = val
      },
      immediate: true
    }
  }
})
export default class SearchBar extends Vue {
  keyword = ''

  /**
   * 搜索
   */
  handleSearch () {
    this.$refs.control.blur()
    this.$emit('search', this.keyword)
  }

  handleInput () {
    this.$emit('input', this.keyword)
  }
}
