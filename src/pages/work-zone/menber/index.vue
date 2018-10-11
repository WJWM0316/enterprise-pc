<template>
  <section class="page-menber-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'workZoneList' }">工作圈管理</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="searchName"
          placeholder="输入搜索名称" />
      </el-col>
    </el-row>
    <div>
      <button class="common-btn" @click="filterMenber('all')" v-if="groupLists.length > 0">所有人</button>
      <button
        class="common-btn"
        v-for="(groupItem, groupIndex) in groupLists"
        :key="groupIndex"
        @click="filterMenber(groupItem)">
        {{groupItem.groupName}}
      </button>
    </div>
    <div class="menber-list">
      <div
        v-for="(menberItem, menberIndex) in menberLists"
        :key="menberIndex"
        @click="multipleSelection(menberItem, menberIndex)"
        :class="{'common-checkbox-active': menberItem.active}"
        class="common-checkbox">
        <i class="icon iconfont icon-check-circle" v-show="menberItem.active"></i>
        <i class="icon iconfont icon-radio_default" v-show="!menberItem.active"></i>
        <span>{{menberItem.realname}}</span>
      </div>
    </div>
    <div class="footer-button">
      <el-button type="primary" @click="submit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
    </div>
  </section>
</template>

<script>
import MenberList from './index'
export default MenberList
</script>

<style lang="scss">
@import "~COLORS/variables";
.page-menber-list {
  background: white;
  .header {
    margin: 30px 0;
  }
  .list-item {
    min-width: 128px;
    padding: 10px 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .el-checkbox {
    margin-top: 0px !important;
    margin-left: 0px !important;
    margin-bottom: 10px !important;
    margin-right: 10px !important;
  }
  .el-checkbox__label {
    min-width: 100px;
  }
  .menber-list {
    margin-top: 30px;
  }
  .footer-button {
    margin: 40px 0;
    button {
      width: 120px;
    }
  }
}
</style>
