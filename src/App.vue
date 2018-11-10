<template>
  <section id="x-plus">
    <page-aside />
    <main class="offset-left">
      <page-header />
      <router-view class="pages" />
    </main>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageAside from 'COMPONENTS/pageAside/index.vue'
import PageHeader from 'COMPONENTS/pageHeader/index.vue'

@Component({
  name: 'App',
  components: {
    PageAside,
    PageHeader
  },
  computed: {
    ...mapGetters([
      'token',
      'pageName'
    ])
  }
})

export default class App extends Vue {

  // 白名单模式，下面路由不显示管理页面的侧边栏,和顶部的导航栏
  shouldFloatingBoxShown() {
    return [
      'login',
      'help'
    ].includes(this.pageName)
  }
}
</script>
<style lang="scss">
@import "./App.scss";
@import '~ICONFONT/iconfont.css';
</style>