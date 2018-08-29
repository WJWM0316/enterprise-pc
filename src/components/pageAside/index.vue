<template>
  <aside id="page-aside">
    <div>
      <div class="logo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <span class="mask"><i class="el-icon-upload"></i></span>
          <img :src="companyLogoUrl" class="avatar">
        </el-upload>
      </div>
      <ul>
        <li
          v-for="(item, index) in routes"
          :key="`item.name`+index"
          v-show="item.meta.useNav"
          :class="{'active' : $route.name === item.meta.modules}">
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