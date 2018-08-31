<template>
  <section id="zike-backend">
    <page-aside />
    <main>
      <!-- 页面需要缓存 -->
      <keep-alive v-if="$route.meta.keepAlive">
        <transition > <router-view class="pages" /> </transition>
      </keep-alive>
      <!-- 页面不需要缓存 -->
      <transition v-else>
        <router-view class="pages" />
      </transition>
    </main>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageAside from 'COMPONENTS/pageAside/index.vue'
@Component({
  name: 'App',
  components: {
    PageAside
  },
  /* eslint-disable */
  computed: {
    ...mapGetters([
      'brand',
      'model'
    ])
  },
  methods: {
    ...mapActions([
      'changeBrand',
      'changeModel'
    ])
  }
  /* eslint-enable */
})

export default class App extends Vue {}
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
    overflow: hidden;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.pages {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;
  width: calc(100% + 17px);
  position: relative;
  box-sizing: border-box;
}
</style>