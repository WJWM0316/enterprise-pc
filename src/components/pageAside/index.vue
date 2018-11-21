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
            v-if="item.meta.useNav"
            :name="item.name"
            :class="{'active' : $route.meta.module === item.meta.module}">
              <router-link :to="{ name: item.name}"> <i :class="`zike-icon icon iconfont ${item.meta.icon}`"></i>  {{ item.title }}</router-link>
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
  methods: {
    ...mapActions(['showMsg'])
  },
  computed: {
    ...mapGetters([
      'userInfos'
    ])
  }
})
export default class PageAside extends Vue {

  // 侧边栏路由
  routes = null

  init() {
    const allowRoutes = ['course', 'broadcast', 'work-zone']
    const filterRoute = routes.filter(route => route.meta.useNav && allowRoutes.includes(route.name))
    if(this.userInfos.roles[0] < 3) {
      this.routes = routes
    } else {
      this.routes = filterRoute
    }
  }
  created() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
#page-aside {
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