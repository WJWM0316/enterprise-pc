<template>
  <section id="zike-backend">
    <page-aside v-if="!shouldFloatingBoxShown()" />
    <main class="offset-left" v-if="!shouldFloatingBoxShown()">
      <page-header v-if="!shouldFloatingBoxShown()" />
      <transition name="fade">
        <router-view class="pages" />
      </transition>
    </main>
    <transition name="fade" v-else>
      <router-view />
    </transition>
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
  watch: {
    '$route': {
      handler() {
        if(!this.token) {
          this.$router.push({name: 'login'})
        }
      },
      immediate: true
    }
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