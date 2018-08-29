import Vue from 'vue'
import Component from 'vue-class-component'
import SearchBar from 'COMPONENTS/searchBar'
import List from 'COMPONENTS/list'

import { getlighthouseList } from 'API/lighthouse'

@Component({
  name: 'lighthouse-list',
  components: {
    List,
    SearchBar
  },
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    }
  },
  filters: {
    moneyFilter (value) {
      return Number(value) === 0 ? '免费' : `￥${value}`
    },
    sortFilter (val) {
      let num = null
      if (Number(val) < 10) {
        num = `00${val}`
      } else if (Number(val) > 9 && Number(val) < 100) {
        num = `0${val}`
      } else {
        num = val
      }
      return num
    }
  }
})
export default class CourseList extends Vue {

  // 表单数据
  courseList = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      tag: 1,
      course: '公开卡',
      online: 1,
      type: 1,
      range: 'desc',
      img: 'http://img4.duitang.com/uploads/item/201408/08/20140808143427_y8P3S.jpeg',
      isDeleted: 0,
      sort: 'desc'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      tag: 0,
      course: '公开卡',
      online: 1,
      type: 2,
      range: 'desc',
      img: 'http://img4.duitang.com/uploads/item/201408/08/20140808143427_y8P3S.jpeg',
      isDeleted: 0,
      sort: 'desc'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      tag: 1,
      course: '公开卡',
      online: 1,
      type: 3,
      range: 'desc',
      img: 'http://img4.duitang.com/uploads/item/201408/08/20140808143427_y8P3S.jpeg',
      isDeleted: 1,
      sort: 'arc'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
      tag: 0,
      course: '公开卡',
      online: 0,
      type: 4,
      range: 'desc',
      img: 'http://img4.duitang.com/uploads/item/201408/08/20140808143427_y8P3S.jpeg',
      isDeleted: 0,
      sort: 'desc'
    }
  ]

  input3 = ''
  input4 = ''
  input5 = ''
  select = ''

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

  searchType = '1'

  /**
   * 初始化表单、分页页面数据
   */
  init () {
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { searchWord: 'string' })
    /* eslint-disable */
    this.form = $.extend(true, {}, this.initForm, form || {})
    /* eslint-enable */
    this.pagination = $.extend(true, {}, this.pagination, pagination || {})
    // this.getlighthouseList()
  }

  /**
   * 获取课程列表
   */
  async getlighthouseList ({ page, pageSize } = {}) {
    try {
      const params = {
        page: page || this.pagination.page || 1,
        page_count: pageSize || this.pagination.pageSize,
        is_course: 3
      }
      const form = this.transformData(this.form)
      const data = this.$util.filterParams($.extend(true, {}, params, form || {}))
      const { communitys, total } = await getlighthouseList({
        json_data: JSON.stringify(params),
        globalLoading: true
      })
      this.courses = communitys

      // 更新分页信息
      this.pagination.page = params.page
      this.pagination.pageSize = params.page_count
      this.pagination.total = total
      this.pagination.pageCount = Math.ceil(this.pagination.total / this.pagination.pageSize)
    } catch (e) {
      this.$message.error(e.message)
    }
  }

  /**
   * 将表单数据转换成提交接口的数据
   * @param {*} data
   */
  transformData (data) {
    const result = {}
    const search = this.$util.getObjectByKeys(data, ['order', 'between', 'status'])
    const otherSearch = this.$util.getObjectByKeys(data, ['searchWord', 'master_realname', 'community_status'], { searchWord: 'search_word' })
    result.search = this.$util.filterParams(search)
    return result
  }

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    // this.getlighthouseList()
  }

  // 添加课程-跳转
  handleAddCourse () {
    this.$router.push({
      name: 'lighthousePost'
    })
  }

  // 当前排序发生变化
  handleRangeStatusChange (value, row, column) {
    // const query = this.$route.query
    const route = {
      online: value
    }
    // if (query.page) {
    //   route.page = query.page
    // }
    this.$router.push({query: {...route}})
    return row.range === value;
  }

  // 当前是否上线变化
  handleOnlineStatusChange (value, row, column) {
    console.log('handleOnlineStatusChange')
    this.$refs.table.doLayout()
    return row.online === value;
  }

  // 当前类型变化
  handleTypeStatusChange (value, row, column) {
    console.log('handleTypeStatusChange')
    this.$refs.table.doLayout()
    return row.type === value;
  }

  // 对每一行表格的样式做判断
  tableRowClassName({row, rowIndex}) {
    return row.isDeleted === 1 ? 'deleted-row' : 'success-row'
  }

  // 当每一行有选择的表头发生变化时
  onTableHeaderClick (column, event) {
    switch (column.property) {
      case 'online':
        // this.form.clearFilter()
        break;
      default:
        break;
    }
  }

  // 重新定义是否上线列的头
  renderOnlineHeader(h, { column, $index }) {
    return h('span',
      {
        class: 'zike-popper'
      },
      [
        h('span', {}, column.label),
        h(
          'el-tooltip',
          {
            class: 'item',
            props: {
              effect: 'dark',
              content: '上线： 在员工端显示、 下线：在员工端不显示',
              placement: 'top-start'
            }
          },
          [
            h(
              'i',
              {
                class: 'el-icon-question',
                props: {
                  'v-popover': {
                    default: 'popoverCover'
                  }
                }
              }
            ),
          ]
        )
      ]
    )
  }

  // 重新定义排序列的头
  renderRangeHeader(h, { column, $index }) {
    return h('span',
      {
        class: 'zike-popper'
      },
      [
        h('span', {}, column.label),
        h(
          'el-tooltip',
          {
            class: 'item',
            props: {
              effect: 'dark',
              content: '不知道要什么文案好~',
              placement: 'top-start'
            }
          },
          [
            h(
              'i',
              {
                class: 'el-icon-question',
                props: {
                  'v-popover': {
                    default: 'popoverCover'
                  }
                }
              }
            ),
          ]
        )
      ]
    )
  }

  // 点击分页按钮
  handleCurrentPageChange (page) {
    this.$router.push({query: {page}})
  }

  handleSortChange ({ column, prop, order }) {
    console.log('dddddddddddddddddddddd')
  }

  filterChange () {
    console.log(11)
  }
}
