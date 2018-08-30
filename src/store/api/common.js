/**
 * 跨模块调用的接口
 */
import { post } from './api'

export const demo = data => post({
  url: '/article/lists',
  data
})

