<template>
  <section id="zike-backend">
    <page-aside />
    <main>
      <!-- 页面需要缓存 -->
      <keep-alive v-if="$route.meta.keepAlive">
        <transition > <router-view /> </transition>
      </keep-alive>
      <!-- 页面不需要缓存 -->
      <transition v-else>
        <router-view />
      </transition>
    </main>
    <modal-dialog class="confirm-dialog"
                  type="confirm"
                  v-model="confirm.show"
                  :title="confirm.title"
                  :show-close="false"
                  @confirm="confirm.confirm">
      <h3 class="title" v-text="confirm.contentTitle"></h3>
      <p class="content" v-text="confirm.content"></p>
    </modal-dialog>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageAside from 'COMPONENTS/pageAside/index.vue'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
@Component({
  name: 'App',
  components: {
    PageAside,
    ModalDialog
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

export default class App extends Vue {
  // 确认信息弹窗
  confirm = {
    show: false,
    title: '提示',
    contentTitle: '',
    content: '',
    confirm: () => {}
  }

  created () {}
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
</style>