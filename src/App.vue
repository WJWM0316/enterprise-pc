<template>
  <section id="zike-backend">
    <page-aside v-if="!shouldFloatingBoxShown()" />
    <main>
      <page-header />
      <section class="container">
        <transition name="fade">
          <router-view />
        </transition>
      </section>
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
import 'ICONFONT/iconfont.css'
@Component({
  name: 'App',
  components: {
    PageAside,
    ZikeToast,
    PageHeader
  },
  computed: {
    /* eslint-disable */
    ...mapGetters(['token']),
    /* eslint-enable */
  }
})

export default class App extends Vue {

  // 白名单模式，下面路由不显示管理页面的侧边栏
  shouldFloatingBoxShown() {
    return [
      '/login'
    ].includes(this.$route.path)
  }
}
</script>
<style lang="less">
#zike-backend {
  > aside {
    width: 200px;
    height: 100vh;
    background: #354048;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  > main {
    position: relative;
    margin-left: 200px;
    overflow: hidden;
  }
}
.container {
  margin: 20px;
  padding: 20px;
  position: relative;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
/*.fade-enter-active,
.fade-leave-active {
  transition: all ease .1s;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}*/
.pages {
  height: 100%;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}
</style>