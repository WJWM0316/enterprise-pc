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
      handler (route) {
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
  // 表格字段
  fields = [
    {
      prop: 'title',
      label: '课程',
      width: '200'
    },
    {
      prop: 'community_status',
      label: '状态',
      width: 80
    },
    {
      prop: 'start_time',
      label: '持续时间',
      width: 150
    },
    {
      prop: 'id',
      label: '灯塔ID',
      width: 80
    },
    {
      prop: 'sort',
      label: '排序',
      width: 100,
      sortable: 'custom'
    },
    {
      prop: 'master_uid',
      label: '操作'
    }
  ]

  // 搜索表单
  form = {
    searchWord: ''
  }

  // 初始化的搜索表单
  initForm = {
    searchWord: ''
  }

  // 修改排序表单
  sortForm = {
    sort: ''
  }

  // 课程列表
  courses = []

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
    this.form = $.extend(true, {}, this.initForm, form || {})
    this.pagination = $.extend(true, {}, this.pagination, pagination || {})
    this.getlighthouseList()
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
    if (this.searchType === '0') {
      otherSearch.master_realname = this.form.searchWord
      result.other_search = this.$util.filterParams(otherSearch)
      delete result.other_search.search_word
    } else {
      search.like = {
        title: this.form.searchWord
      }
    }
    if (!this.$route.query.order) {
      search.order = { create_time: 'desc' }
    }
    result.search = this.$util.filterParams(search)
    return result
  }

  /**
   * 搜索
   */
  handleSearch () {
    this.pagination.page = 1
    this.setPathQuery(this.form)
    // this.getlighthouseList()
  }

  /**
   * 添加课程
   */
  handleAddCourse () {
    this.$router.push({
      name: 'lighthousePost'
    })
  }

  /**
   * 编辑小课
   * @param {*} event
   * @param {*} item
   */
  routeJump (type, item) {
    switch (type) {
      case 'edit':
        this.$router.push({
          name: 'lighthouseEdit',
          params: {
            id: item.id
          }
        })
        break
      case 'communicate':
        this.$router.push({
          name: 'communicateList',
          params: {
            community_title: item.community_title,
            title: item.title
          },
          query: {
            communityId: item.id
          }
        })
        break
      case 'lesson':
        this.$router.push({
          name: 'lessonList',
          query: {
            community_id: item.id
          }
        })
        break
      default:
        break
    }
  }

  /**
   * 排序
   * @param {*} column
   * @param {*} prop
   * @param {*} order
   */
  handleSortChange ({ column, prop, order }) {
    switch (order) {
      case 'ascending':
        this.form.order = {
          [prop]: 'asc'
        }
        break
      case 'descending':
        this.form.order = {
          [prop]: 'desc'
        }
        break
      default:
        if (this.form.order) {
          this.form.order = null
        }
    }
    this.handleSearch()
  }

  /**
   * 过滤
   * @param {*} filters
   */
  handleFilterChange (filters) {
    for (let [key, value] of Object.entries(filters)) {
      if (value && value.length > 0) {
        this.form[key] = value[0]
      } else {
        this.form[key] = null
      }
    }
    this.handleSearch()
  }

  /**
   * 页数切换
   * @param {*} currentPage
   */
  handlePageChange (currentPage) {}
}
