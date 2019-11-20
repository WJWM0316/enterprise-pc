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
    // 当前页数
    page: {
      type: [String, Number],
      default: 1
    },
    // 重置表格的行样式
    tableRowClassName: {
      type: Function,
      default({row}) {}
    }
  }
})
export default class ComponentTableList extends Vue {

  created(){
  }
  // 点击分页按钮
  handleCurrentPageChange(page) {
    this.setPathQuery({page: page})
  }
  handleCommand(val, prop) {
    const keyValue = val.split('-')
    const data = {}
    let query = this.$route.query
    if(Object.keys(query).length>0){
      Object.keys(query).forEach(function(key){
        if(key !== keyValue[0]){
          data[key] = query[key]
        }
      })
    }
    data[keyValue[0]] = keyValue[1]

    if(data['page']){
      data['page'] = 1
    }
    this.$router.push({
      query: data
    })
  }
}
