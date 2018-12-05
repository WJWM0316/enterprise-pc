<template>
  <section class="page-work-zone-list">
    <div class="page-position">工作圈管理</div>
    <div class="header">
      <div class="list-total">共<strong>{{jobCircleLists.total}}</strong>个工作圈</div>
      <div class="action-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入工作圈名称" />
        <el-button type="primary" @click="addWorkZone" class="btn-limit-width btn_add">新建工作圈</el-button>
      </div>
    </div>
    <table-list
    :list="jobCircleLists.list"
    :fields="fields"
    :total="jobCircleLists.total"
    :page="jobCircleLists.page"
    >
      <template slot-scope="props" slot="columns">
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
  .action-zone {
    float: right;
    display: inline-block;
    .zike-common-search-bar {
      display: inline-block;
      vertical-align: middle;
      margin-right: 16px;
    }
    .el-button--primary{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .header {
    margin: 36px 0 24px 0;
  }
  .list-total {
    font-size:16px;
    font-weight:400;
    color:rgba(53,64,72,1);
    line-height: 40px;
    vertical-align: middle;
    display: inline-block;
    strong {
      color: #D7AB70;
      font-weight: 500;
      margin: 0 2px;
    }
  }
  .btn_add {
    box-sizing: border-box;
    width: 124px;
    text-align: center;
  }
  .deleted {
    background:rgba(248,250,251,1);
  }
  .limit-row-num-2{
    padding-right: 40px;
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
      padding: 4px;
      display: inline-block;
      line-height: 1;
    }
    .name {
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:1;
      padding: 4px;
      background:rgba(255,249,217,1);
      color:rgba(215,171,112,1);
      display: inline-block;
      line-height: 1;
    }
  }
}

</style>
