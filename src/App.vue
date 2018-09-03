<template>
  <section id="zike-backend">
    <page-aside v-if="shouldFloatingBoxBeShown" />
    <main>
      <!-- 页面需要缓存 -->
      <keep-alive v-if="$route.meta.keepAlive">
        <transition name="fade" > <router-view class="pages" /> </transition>
      </keep-alive>
      <!-- 页面不需要缓存 -->
      <transition name="fade" v-else>
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
import ZikeToast from 'COMPONENTS/toast'

@Component({
  name: 'App',
  /* eslint-disable */
  methods: {
    ...mapActions(['showMsg'])
  },
  /* eslint-enable */
  components: {
    PageAside,
    ZikeToast
  }
})

export default class App extends Vue {

  shouldFloatingBoxBeShown() {
    // 白名单模式，下面路由不显示管理页面的侧边栏
    return [
      'demo'
    ].indexOf(this.$route.flag) !== -1
  }

  created() {
    this.showMsg({ content: '自定义toast弹窗哦~', type: 'success', duration: 10000 })
  }
}
</script>
<style lang="less">
#zike-backend {
  display: flex;
  flex-direction: row;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  > aside {
    width: 200px;
    height: 100vh;
    background: rgba(0,0,0,.05);
    position: relative;
  }
  > main {
    flex-grow: 1;
    height: 100vh;
    overflow: hidden;
    position: relative;
    margin: 20px;
  }
}

body {
  overflow: hidden;
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
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  width: calc(100% + 17px);
  position: relative;
  box-sizing: border-box;
}
</style>