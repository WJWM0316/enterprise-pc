<template>
  <header class="help-header">
    <div class="left-infos">
      <div class="logo-box"></div>
      <span>帮助中心</span>
    </div>
    <ul class="help-header-navigation">
      <li
        class="navigation-li"
        :class="{'navigation-li-active': $route.query.tab === item.routeName}"
        @click="onTabClick(item.routeName)"
        v-for="item in navigation"
        :key="item.routeName">
          {{ item.btnTxt }}
      </li>
    </ul>
  </header>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ComponentHeader extends Vue {
  navigation = [
    {
      id: 1,
      routeName: 'enterprise',
      btnTxt: '企业端',
      active: false
    },
    {
      id: 2,
      routeName: 'staff',
      btnTxt: '员工端',
      active: false
    },
    {
      id: 3,
      routeName: 'tutor',
      btnTxt: '导师端',
      active: false
    }
  ]

  onTabClick(type) {
    this.setPathQuery({tab: type})
  }
}
</script>
<style lang="scss">
#help {
  .help-header{
    height:72px;
    background:rgba(53,64,72,1);
    box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
  }
  .left-infos {
    line-height: 38px;
    display: inline-block;
    margin: 17px 150px;
    span {
      display: inline-block;
      padding-left: 25px;
      border-left: 1px solid #929292;
      font-size: 20px;
      color: white;
      line-height: 1;
      vertical-align: middle;
    }
    .logo-box {
      width:123px;
      height:38px;
      background: rgba(255,255,255,.4);
      display: inline-block;
      float: left;
      margin-right: 24px;
    }
  }
  .help-header-navigation {
    float: right;
    color: white;
    margin-right: 150px;
  }
  .navigation-li {
    display: inline-block;
    line-height: 72px;
    font-size:14px;
    font-weight:300;
    color:rgba(255,255,255,1);
    margin-left: 50px;
    position: relative;
    cursor: pointer;
    &:before{
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      background: #D7AB70;
      content: '';
      display: block;
      width: 100%;
      opacity: 0;
      visibility: hidden;
    };
  }
  .navigation-li-active{
    &:before{
      opacity: 1;
      visibility: visible;
    };
  }
}
</style>