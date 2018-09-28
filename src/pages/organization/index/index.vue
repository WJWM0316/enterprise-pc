<template>
  <div id="organization">
    <div class="page-position">组织管理</div>
    <div class="group-type-list">
        <el-row class="organization-base " style="margin-top: 14px">
         <el-col :span="24" class="right-content">
          <el-button type="primary" class="click-item" @click="todoAction('set')">分组管理</el-button>
         </el-col>
        </el-row>
        <el-button
              size="large"
              v-for="(groupItem, groupIndex) in groupList"
              :key="groupIndex"
              @click="selectGroup(groupItem.groupId)">
            {{groupItem.groupName}}
        </el-button>
        <div class="border"></div>
    </div>

    <el-row class="organization-base">
      <el-col :span="12" class="left-content">
        <h2 class="">
          全部成员
          <span class="number">（{{courseList.length}}人）</span>
        </h2>
      </el-col>
      <el-col :span="12" class="right-content">
        <el-button type="primary" class="click-item" @click="todoAction('add')">添加新成员</el-button>
      </el-col>
    </el-row>
  

  
  <div class="dropdown-select">
        
    <el-select v-model="rolevalue" placeholder="选择权限" @change="changeRule">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
    </el-select>
  </div>
  <table-list
      :list="courseList"
      :fields="fields"
      >
      <template scope="props" slot="columns">

        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'groupName'">
          <img v-if="props.scope.row&&props.scope.row.avatar && props.scope.row.avatar.smallUrl" :src="props.scope.row.avatar.smallUrl">
          {{props.scope.row.realname}}
        </div>

        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'"></div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </div>
</template>

<style lang="scss">
.page-position {
  margin-bottom: 32px;
}
#organization {
  background: #fff;
  .organization-base {
    line-height: 35px;
    margin-bottom: 25px;
    h1{
      margin: 0;
      padding: 0;
      float: left;
      line-height: 40px;
      vertical-align: middle;
      font-size:30px;
      font-weight:500;
      color:rgba(53,64,72,1);
    }
    h2 {
      margin: 0;
      line-height: 40px;
    }
    .number {
      font-size:16px;
      font-weight:400;
      color:rgba(146,146,146,1);
      margin-left: 10px;
    }
    .left-content {
      text-align: left;
    }
    .right-content {
      text-align: right;
    }
    .click-item {
      color:rgba(53,64,72,1);
    }
  }
  .group-type-list {
    .el-button{
      width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
    }
    .border {
      width:100%;
      height:3px;
      border-bottom:1px dashed rgba(235,238,245,1);
      margin-bottom: 30px;
    }
  }
  .dropdown-select {
    margin: 24px 0 16px 0;
  }
}
</style>

<script>
import memberList from './index'
export default memberList
</script>

