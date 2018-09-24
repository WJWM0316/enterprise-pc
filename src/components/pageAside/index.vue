<template>
  <aside id="page-aside">
    <section>
      <div>
        <div class="logo">
          <div class="avatar-uploader">
            <img :src="companyLogoUrl" class="avatar">
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in routes"
            :key="`item.name`+index"
            v-show="item.meta.useNav"
            :class="{'active' : $route.meta.module === item.meta.module}">
              <router-link :to="{ name: item.name}"> <i :class="`zike-icon icon iconfont ${item.meta.icon}`"></i>  {{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </aside>
</template>
<script>
import PageAsise from './index'
export default PageAsise
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>