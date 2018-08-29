import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'list',
  props: {
    // 是否可多选
    selectable: {
      type: Boolean,
      default: false
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 列表字段信息
    fields: {
      type: Array,
      default () {
        return []
      }
    },

    // 表格固定高度
    height: [String, Number],

    // 列表数据
    list: {
      type: Array,
      default () {
        return []
      }
    },

    // 默认排序
    defaultSort: {
      type: Object,
      default () {
        return {}
      }
    },

    // 数据为空是显示的文本
    emptyText: {
      type: String,
      default: '暂时没有找到匹配记录'
    },

    // 是否开启分页器
    hasPagination: {
      type: Boolean,
      default: true
    },

    // 记录总数
    total: {
      type: Number,
      default: 0
    },

    // 当前页数
    page: {
      type: Number,
      default: 1
    },

    // 每页显示数量
    pageSize: {
      type: Number,
      default: 20
    },

    // 总页数
    pageCount: {
      type: Number,
      default: 0
    },

    // 分页布局
    paginationLayout: {
      type: String,
      default: 'prev, pager, next, slot'
    },

    // 切换页数时是否重新设置url
    replaceUrl: {
      type: Boolean,
      default: true
    }
  }
})
export default class List extends Vue {
  $table = null

  mounted () {
    this.init()
  }

  /**
   * 初始化
   */
  init () {
    const $table = this.$refs.table
    if (!$table) {
      this.$nextTick(() => {
        this.init()
      })
    } else {
      this.$table = $table
    }
  }

  /**
   * 清除所有选择项
   */
  clearSelection () {
    if (!this.$table) {
      console.log('表格元素还未渲染')
      return
    }

    this.$table.clearSelection()
  }

  /**
   * 切换某一行的选中状态
   * @param {*} row
   * @param {*} selected
   */
  toggleRowSelection (row, selected) {
    if (!this.$table) {
      console.log('表格元素还未渲染')
      return
    }

    this.$table.toggleRowSelection(row, selected)
  }

  /**
   * 全选
   */
  selectAll () {
    if (!this.$table) {
      console.log('表格元素还未渲染')
      return
    }

    this.list.forEach(item => {
      this.toggleRowSelection(item, true)
    })
  }

  /**
   * 排序
   * @param {*} column
   * @param {*} prop
   * @param {*} order
   */
  handleSortChange ({ column, prop, order }) {
    this.$emit('sort-change', { column, prop, order })
  }

  /**
   * 过滤
   * @param {*} filters
   */
  handleFilterChange (filters) {
    this.$emit('filter-change', filters)
  }

  /**
   * 切换页数
   * @param {*} currentPage
   */
  handlePageChange (currentPage) {
    this.$emit('page-change', currentPage)
    if (this.replaceUrl) {
      this.setPathQuery({page: currentPage})
    }
  }

  /**
   * 选择项发生变化
   * @param {*} val
   */
  handleSelectionChange (val) {
    this.$emit('selection-change', val)
  }

  tableRowClassName ({row, rowIndex}) {
    if (this.list.length === 0) {
      return
    }
    // console.log(this.list.length, rowIndex, row, '99999999999999999999999')
    if (rowIndex === 2) {
      return 'warning-row'
    }
    return ''
  }
}
