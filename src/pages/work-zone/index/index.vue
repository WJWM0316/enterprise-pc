<template>
  <section class="page-work-zone-list">
    <div class="page-position">工作圈管理</div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入工作圈名称" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addWorkZone" class="click-item">新建工作圈</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="jobCircleLists.list"
    :fields="fields"
    :total="jobCircleLists.total"
    :page="jobCircleLists.page"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="routeJump(props.scope.row.id, 'workZoneUpdate')">
              编辑
          </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="routeJump(props.scope.row.id, 'notesList')">
              帖子管理
          </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="routeJump(props.scope.row.id, 'menbersList')">
              成员管理
          </el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'name'" class="flex-box">
          <div class="img-box">
            <!-- <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.coverImg.smallUrl"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img :src="props.scope.row.coverImg.smallUrl">
              </i>
            </div> -->
            <img :src="props.scope.row.coverImg.smallUrl">
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2"> {{ props.scope.row.name}} </div>
                <div class="lalel">
                  <span class="group-name">{{props.scope.row.groupName}}</span>
                  <span class="name">{{props.scope.row.realname}}</span>
                </div>
            </div>
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'status'">
          {{ props.scope.row.status }}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </section>
</template>

<script>
import WorkzoneList from './index'
export default WorkzoneList
</script>

<style lang="scss">
@import "~COLORS/variables";
.page-work-zone-list {
  background: white;
  .input-with-select {
    width: 400px;
  }
  .action-zone {
    text-align: right;
  }
  .deleted {
    background:rgba(248,250,251,1);
  }
  .header {
    margin: 30px 0;
  }
  .click-item {
    color: #354048;
  }
  .content {
    .lalel{
      font-size: 12px;
      line-height: 1;
      margin-top: 8px;
    }
    .group-name{
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:1;
      background:rgba(53,64,72,1);
      padding: 2px 5px;
    }
    .name {
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:1;
      padding: 2px 5px;
      background:rgba(255,249,217,1);
      color:rgba(215,171,112,1);
    }
  }
}

</style>
