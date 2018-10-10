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
      <el-button size="large" @click="filterMenber('all')" class="list-item" v-if="groupLists.length > 0">所有人</el-button>
      <el-button
        size="large"
        v-for="(groupItem, groupIndex) in groupLists"
        :key="groupIndex"
        class="list-item"
        @click="filterMenber(groupItem)">
          {{groupItem.groupName}}
      </el-button>
    </div>
    <div class="menber-list">
      <el-checkbox-group v-model="checkList.tem">
        <el-checkbox
          :label="menberItem.realname"
          :key="menberIndex"
          @change="multipleSelection"
          v-for="(menberItem, menberIndex) in menberLists" />
      </el-checkbox-group>
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
    width: 128px;
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
    width: 100px;
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
