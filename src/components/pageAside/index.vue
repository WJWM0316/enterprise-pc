<template>
  <aside id="page-aside">
    <div>
      <div class="logo">
        <div class="avatar-uploader">
          <img :src="companyLogoUrl" class="avatar">
          <div class="company-logo" role="button" @click="onSelectFile">
            <i  class="el-icon-upload"></i>
            <input type="file" id="uplaod-file" ref="hiddenFile" @change="onFileChange" style="display: none;"/>
          </div>
        </div>
      </div>
      <ul>
        <li
          v-for="(item, index) in routes"
          :key="`item.name`+index"
          v-show="item.meta.useNav"
          :class="{'active' : $route.meta.module === item.meta.module}">
            <router-link :to="{ name: item.name}"> <i class="zike-icon" :class="item.meta.icon"></i>  {{ item.title }}</router-link>
        </li>
      </ul>
      <div class="setting">
        <router-link :to="{ name: 'system'}" tag="p"> <el-badge :value="200" :max="99"> <i class="el-icon-message"></i> </el-badge> </router-link>
        <router-link :to="{ name: 'setting'}" tag="p"><i class="el-icon-setting"> </i></router-link>
      </div>
    </div>
  </aside>
</template>
<script>
import PageAsise from './index'
export default PageAsise
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>