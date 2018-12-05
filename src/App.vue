<template>
  <section id="x-plus">
    <template v-if="token">
      <page-aside />
      <main class="offset-left">
        <page-header />
        <router-view class="pages" />
      </main>
    </template>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageAside from 'COMPONENTS/pageAside/index.vue'
import PageHeader from 'COMPONENTS/pageHeader/index.vue'
import { Loading } from 'element-ui'
import Cookies from 'js-cookie'

@Component({
  name: 'App',
  methods: {
    ...mapActions([
      'loginApi'
    ])
  },
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

  loadingInstance = null
  shouldFloatingBoxShown() {
    return [
      'login',
      'help'
    ].includes(this.pageName)
  }

  created() {
    this.loadingInstance = Loading.service({})
    const code  = Cookies.get('code') ? Cookies.get('code') : process.env.VUE_APP__TEST_COMPANY
    this.loginApi({code, 'Authorization-Sso': Cookies.get('Authorization-Sso')})
        .then(() => {
          this.loadingInstance.close()
        })
  }
}
</script>
<style lang="scss">
@import "./App.scss";
@import url('https://at.alicdn.com/t/font_843064_1pqw5jcfn4h.css');
</style>