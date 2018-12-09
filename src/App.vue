<template>
  <section id="x-plus">
    <template v-if="token">
      <page-aside />
      <main class="offset-left">
        <page-header />
        <router-view class="pages" />
      </main>
    </template>
    <reset-psw-box></reset-psw-box>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
import PageAside from 'COMPONENTS/pageAside/index.vue'
import PageHeader from 'COMPONENTS/pageHeader/index.vue'
import { Loading } from 'element-ui'
import Cookies from 'js-cookie'
import resetPswBox from 'COMPONENTS/resetPsw/index.vue'

@Component({
  name: 'App',
  methods: {
    ...mapActions([
      'loginApi',
      'editPwdApi'
    ])
  },
  components: {
    PageAside,
    PageHeader,
    resetPswBox
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

<style lang="scss">
@import '~COLORS/variables.scss';
#reset-psw {
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 5;
    opacity: 0;
    visibility: hidden;
    transition: all ease .4s;
    transform: scale(10);
  }
  .mask.show-mask {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  .box {
    width: 460px;
    background: white;
    border-radius: 2px;
    transition: all ease-in-out .4s;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 6;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 432px;
  }

  .box.show-box {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%);
  }
  .dialog-bd {
    flex: 1 1 auto;
    color: $color-level-two;
    padding: 24px 46px 30px 46px;
  }
  .submit-button {
    width: 100%;
  }
  h2{
    font-size:20px;
    font-weight:500;
    color:rgba(53,64,72,1);
    line-height:1;
    text-align: center;
    margin: 5px 0;
    font-weight: 500;
  }
  p {
    font-size:14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:22px;
    margin: 0;
    margin-bottom: 30px;
  }
  .lock{
    display: block;
    margin: 0 auto;
    width: 140px;
  }
  .el-form-item__error {
    position: relative;
  }
  .el-form-item {
    margin-bottom: 16px !important;
  }
  input::-webkit-input-placeholder {
    color: #dcdcdc;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>