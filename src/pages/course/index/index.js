import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'lighthouse-list',
  watch: {
    '$route': {
      handler () {
        this.init()
      },
      immediate: true
    }
  }
})
export default class CourseList extends Vue {

  // 表单数据
  courseList = []

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

  created () {
    for (let i = 0; i < 20; i++) {
      this.courseList.push({
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: 0,
        course: '公开卡',
        online: 0,
        type: 4,
        range: 'desc',
        img: 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg',
        isDeleted: 0,
        sort: 'desc'
      })
    }
  }
  /**
   * 初始化表单、分页页面数据
   */
  init () {
    const { form, pagination } = this.$util.getListInitDataByQueryParams(this.form, this.$route.query, { searchWord: 'string' })
    /* eslint-disable */
    this.form = $.extend(true, {}, this.initForm, form || {})
    this.pagination = $.extend(true, {}, this.pagination, pagination || {})
    /* eslint-enable */
    // this.getlighthouseList()
  }

  /**
   * 获取课程列表
   */
  async getlighthouseList () {}

  // 点击搜索时触发
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    this.getlighthouseList()
  }

  // 添加课程-跳转
  addCourse () {
    this.$router.push({ name: 'coursePost'})
  }

  // 对每一行表格的样式做判断
  tableRowClassName({row}) {
    return row.isDeleted === 1 ? 'deleted-row' : 'success-row'
  }

  // 重新定义table的标题
  renderHeader (h, { column }) {

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
