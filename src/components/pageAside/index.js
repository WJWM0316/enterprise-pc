import Vue from 'vue'
import Component from 'vue-class-component'
import { routes } from '@/router/routes'

@Component({
  name: 'page-asise'
})
export default class PageAside extends Vue {
  // 侧边栏路由
  routes = routes
  // 企业LOGO
  companyLogoUrl = 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg'
  // Logo 上传成功
  handleAvatarSuccess (res, file) {
    return {res, file}
  }
  // Logo上传之前， 必须检查文件文件类型和大小
  beforeAvatarUpload (file) {
    return file
  }
  // 获取文件的后缀
  getFileExt (file) {
    return file.name.split('.')[file.name.split('.').length - 1]
  }
}