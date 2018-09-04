import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'table-list',
  props: {
    // 列表数据
    list: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否可多选
    selectable: {
      type: Boolean,
      default: false
    },
    // 列表字段信息
    fields: {
      type: Array,
      default () {
        return []
      }
    }
  }
})
export default class ComponentTableList extends Vue {

  total = 50

  // 搜索表单
  form = {
    searchWord: ''
  }

  // 初始化的搜索表单
  initForm = {
    searchWord: ''
  }

  // 分页信息
  pagination = {
    page: 1,
    pageSize: this.zikeDefaultPageSize,
    pageCount: 0,
    total: 0
  }

  // 对每一行表格的样式做判断
  tableRowClassName({row}) {
    return row.isDeleted === 1 ? 'deleted-row' : 'success-row'
  }

  // 重新定义table的标题
  renderHeader (h, { column }) {

    if (!column.filterPlacement) {
      return h('span',column.label, {})
    }

    // 定义下拉的子节点
    const childNodes = column.filteredValue.map(item => {
      return h('el-option', {
          props: {
            label: item.label,
            value: item.value
          }
        }
      )
    })

    // 返回最终的domo节点
    return h('span',
      {
        class: 'zike-popper'
      },
      [
        h('el-select',
          {
            class: 'zike-table-header-select',
            props:
            {
              value: column.label
            },
            on:
            {
              change: this.change
            }
          },
          childNodes
        ),
        h('el-tooltip',
          {
            props:
            {
              content: column.filterPlacement,
              placement: 'top'
            }
          },
          [
            h('i',
              {
                class: 'el-icon-question'
              }
            ),
            h('div',
              {
                props:
                {
                  slot: 'content'
                }
              },
              column.filterPlacement
            )
          ]
        )
      ]
    )
  }

  // 点击分页按钮
  handleCurrentPageChange (page) {
    this.setPathQuery({page: page})
  }

  change (val) {
    const keyValue = val.split('-')
    this.$router.push({
      query: {
        [keyValue[0]]: [keyValue[1]]
      }
    })
  }
}
