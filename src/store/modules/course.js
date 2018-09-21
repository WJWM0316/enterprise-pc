import {
  GET_COURSE_LISTS,
  GET_COURSE_DEATAILS,
  GET_COURSE_PEAPLE,
  GET_COURSE_ORGANAZATIOMNS,
  GET_COURSE_CATAGORY,
  GET_COURSE_PEAPLE_HITS
} from '../mutation-types'

import {
  postCourseApi,
  putCourseApi,
  getCourseListsApi,
  getCourseDetailApi,
  getCoursePeopleApi,
  getCourseOrganizationsApi,
  getCourseCategoryApi
} from 'API/course'

const state = {
  courseList: {
    list: [],
    total: 0
  },
  courseDetail: {},
  coursePeaple: {},
  coursePeapleHits: {},
  courseOrganizations: {},
  courseCategory: {}
}

const mutations = {
  [GET_COURSE_LISTS] (status, data) {
    state.courseList.list = data.data
    state.courseList.total = data.meta.total
  },
  [GET_COURSE_DEATAILS] (status, data) {
    state.courseDetail = data
  },
  [GET_COURSE_PEAPLE] (status, data) {
    state.coursePeaple = data
  },
  [GET_COURSE_PEAPLE_HITS] (status, data) {
    state.coursePeapleHits = data
  },
  [GET_COURSE_ORGANAZATIOMNS] (status, data) {
    state.courseOrganizations = data
  },
  [GET_COURSE_CATAGORY] (status, data) {
    state.courseCategory = data
  }
}

const getters = {
  courseList: state => state.courseList,
  courseDetail: state => state.courseDetail,
  coursePeaple: state => state.coursePeaple,
  coursePeapleHits: state => state.coursePeapleHits,
  courseOrganizations: state => state.courseOrganizations,
  courseCategory: state => state.courseCategory
}

const actions = {

  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程列表
   * @return   {[type]}          [description]
   */
  getCourseListsApi (store, params) {
    return getCourseListsApi(params)
      .then(res => {
        store.commit(GET_COURSE_LISTS, res.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   添加课程
   * @return   {[type]}          [description]
   */
  postCourseApi (store, params) {
    return postCourseApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   编辑课程
   * @return   {[type]}          [description]
   */
  putCourseApi (store, params) {
    return putCourseApi(params)
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程详情
   * @return   {[type]}          [description]
   */
  getCourseDetailApi (store, params) {
    return getCourseDetailApi(params)
      .then(res => {
        store.commit(GET_COURSE_DEATAILS, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程必修成员
   * @return   {[type]}          [description]
   */
  getCoursePeopleApi (store, params) {
    return getCoursePeopleApi({...params, role: 1})
      .then(res => {
        store.commit(GET_COURSE_PEAPLE, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取不可见学员
   * @return   {[type]}          [description]
   */
  getCoursePeopleHitsApi (store, params) {
    return getCoursePeopleApi({...params, role: 2})
      .then(res => {
        store.commit(GET_COURSE_PEAPLE_HITS, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程组织
   * @return   {[type]}          [description]
   */
  getCourseOrganizationsApi (store, params) {
    return getCourseOrganizationsApi(params)
      .then(res => {
        store.commit(GET_COURSE_ORGANAZATIOMNS, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  },
  /**
   * @Author   小书包
   * @DateTime 2018-09-20
   * @detail   获取课程分类
   * @return   {[type]}          [description]
   */
  getCourseCategoryApi (store, params) {
    return getCourseCategoryApi(params)
      .then(res => {
        store.commit(GET_COURSE_CATAGORY, res.data.data)
        return res
      })
      .catch(error => {
        return error
      })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
