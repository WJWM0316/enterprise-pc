import Vue from 'vue'
import Component from 'vue-class-component'
import { routes } from '@/router/routes'

@Component({
  name: 'page-asise',
  methods: {
    ...mapActions(['showMsg'])
  }
})
export default class PageAside extends Vue {

  // 侧边栏路由
  routes = routes
  // 企业LOGO
  companyLogoUrl = 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg'
}