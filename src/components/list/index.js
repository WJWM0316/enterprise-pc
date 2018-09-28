import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'table-list',
  props: {
    // 列表数据
    list: {
      type: Array,
      default() {
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
      default() {
        return []
      }
    },
    // 记录总数
    total: {
      type: Number,
      default: 0
    },
    // 重置表格的行样式
    tableRowClassName: {
      type: Function,
      default({row}) {}
    }
  }
})
export default class ComponentTableList extends Vue {

  // 点击分页按钮
  handleCurrentPageChange(page) {
    this.setPathQuery({page: page})
  }

  handleCommand(val) {
    const keyValue = val.split('-')
    this.$router.push({
      query: {
        [keyValue[0]]: keyValue[1]
      }
    })
  }

  // 重新定义table的标题
  renderHeader(h, { column }) {
    const showTips = () => {
      if (column.className === 'yes' && column.filterPlacement && column.filteredValue.length) {
        return (
          <el-dropdown trigger="click" class="zike-dropdown" onCommand={ this.handleCommand.bind(this) }>
            <span class="el-dropdown-link">
              {column.label}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {
                column.filteredValue.map(item => {
                  return <el-dropdown-item command={item.value}> {item.label} </el-dropdown-item>
                })
              }
            </el-dropdown-menu>
          </el-dropdown>
        )
      } else if(column.className === 'no' && column.filterPlacement && column.filteredValue.length) {
        return (
          <el-dropdown trigger="click" class="zike-dropdown" onCommand={ this.handleCommand.bind(this) }>
            <span class="el-dropdown-link">
              {column.label}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {
                column.filteredValue.map(item => {
                  return <el-dropdown-item command={item.value}> {item.label} </el-dropdown-item>
                })
              }
            </el-dropdown-menu>
          </el-dropdown>
        )
      } else {
        return (<span style="color: #909399;margin-right: 15px">{ column.label }</span>)
      }
    }

    if (!column.filterPlacement)
    {
      return column.className === 'yes'
      ?
        (
          <div>
            <span style="margin-right: 10px;">{ column.label }</span>
            <el-popover
              placement="top"
              width="144"
              trigger="hover">
              <div domPropsInnerHTML={column.filterPlacement}></div>
              <i class="el-icon-question" style="color: rgba(188,188,188,1);position: relative;z-index: 2;" slot="reference"></i>
            </el-popover>
          </div>
        )
      :
        (
          <span>{ column.label }</span>
        )
    }
    else
    {
      return (
        <div>
          { showTips() }
          {
            (() => {
              if (column.className === 'yes') {
                return (
                  <el-popover
                    placement="top"
                    width="144"
                    trigger="hover">
                    <div domPropsInnerHTML={column.filterPlacement}></div>
                    <i class="el-icon-question" style="color: rgba(188,188,188,1);position: relative;z-index: 2;" slot="reference"></i>
                  </el-popover>
                )
              }
            })()
          }
        </div>
      )
    }
  }
}
