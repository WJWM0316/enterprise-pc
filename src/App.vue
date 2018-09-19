<template>
  <section id="zike-backend">
    <page-aside v-if="!shouldFloatingBoxShown()" />
    <main>
      <page-header v-if="!shouldFloatingBoxShown()" />
      <transition name="fade">
        <router-view class="pages" />
      </transition>
    </main>
    <zike-toast />
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageAside from 'COMPONENTS/pageAside/index.vue'
import PageHeader from 'COMPONENTS/pageHeader/index.vue'
import ZikeToast from 'COMPONENTS/toast'

@Component({
  name: 'App',
  components: {
    PageAside,
    ZikeToast,
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
      'token'
    ])
  }
})

export default class App extends Vue {

  // 白名单模式，下面路由不显示管理页面的侧边栏,和顶部的导航栏
  shouldFloatingBoxShown() {
    return [
      '/login'
    ].includes(this.$route.path)
  }
}
</script>
<style lang="scss">
@import "./App.scss";
@import '~ICONFONT/iconfont.css';
</style>
<style lang="scss">
  body {
    /*font-size: function-name(3px);*/
  }
</style>