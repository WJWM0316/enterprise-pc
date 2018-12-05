<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <img src="~IMAGES/logo.png" class="avatar">
        </div>
        <ul>
          <li
            v-for="(item, index) in routes"
            :key="`item.name`+index"
            :class="{'active' : $route.meta.module === item.meta.module}">
              <router-link :to="{ name: item.name}"> 
                <i :class="`zike-icon icon iconfont ${item.meta.icon}`"></i>  {{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </aside>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { routes } from '@/router/routes'

@Component({
  name: 'page-asise',
  computed: {
    ...mapGetters([
      'userInfos'
    ])
  },
  watch: {
    'userInfos.roles': {
      handler(roles) {
        // 确保数据已经回来
        if(roles.length) {
          const isContentManager = roles.some(field => field <= 3) && !roles.includes(1) && !roles.includes(2)
          const contentManagerRoutes = routes.filter(route => route.meta.useNav && ['course', 'broadcast', 'work-zone'].includes(route.name))
          // 付费路由
          const officialRoute = routes.filter(route => route.meta.useNav)
          // 试用路由
          const notOfficialRoute = routes.filter(route => route.meta.useNav && route.name !== 'books')
          if(!isContentManager && !this.userInfos.company.isTrial) {
            this.routes = officialRoute
          } else if(!isContentManager && this.userInfos.company.isTrial) {
            this.routes = notOfficialRoute
          } else {
            this.routes = contentManagerRoutes
          }
        }
      },
      immediate: true
    }
  }
})
export default class PageAside extends Vue {
  routes = null
}
</script>
<style lang="scss" scoped>
#page-aside {
  width: 200px;
  height: 100vh;
  background: #354048;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  > section {
    height: 100%;
    overflow: hidden;
    width: 200px;
    > div {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      width: 217px;
    }
  }
  .logo {
    position: relative;
    margin: 42px auto 50px;
    .avatar {
      position: relative;
      z-index: 1;
      width:124px;
      margin-left: 34px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 150px;
  }
  li {
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    transition: all ease .4s;
    font-size: 14px;
    &:hover {
      background:rgba(255,226,102,0.12);
    }
    .zike-icon {
      margin-right: 10px;
    }
    a {
      text-decoration: none;
      color: #EDEDED;
      display: block;
      padding-left: 50px;
      .iconfont{
        color: #929292;
      }
    }
  }
  .active {
    background:rgba(255,226,102,0.12);
    position: relative;
    a {
      color: #fff;
      .iconfont{
        color: #fff;
      }
    }
    &:before {
      background: #FFE266;
      content: '';
      display: block;
      left: 0;
      position: absolute;
      height: 100%;
      width:4px;
    }
    &:after {
      width: 0;
      height: 0;
      border-color: red;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent transparent #FFE266;
      display: block;
      content: '';
    }
  }
}
</style>