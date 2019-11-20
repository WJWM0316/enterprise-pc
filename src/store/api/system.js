/**
 * 所有系统模块对应的接口请求
 */
/* eslint-disable */
import { post } from './api'

export const demo = data => post({
  url: '/article/lists',
  data
})
