<template>
  <list class="page-new-course course-list"
        :fields="fields"
        :list="courses"
        :total="pagination.total"
        :page="pagination.page"
        :page-size="pagination.pageSize"
        :page-count="pagination.pageCount"
        @sort-change="handleSortChange"
        @filter-change="handleFilterChange"
        @page-change="handlePageChange">
    <div class="list-top f-clear-float" slot="list-top">
      <search-bar class="f-float-left" @search="handleSearch" v-model="form.searchWord" placeholder="请输入课程名&导师"></search-bar>
      <el-button type="primary" class="f-float-right" @click="handleAddCourse">新建课程</el-button>
    </div>
    <template scope="props" slot="columns">
      <!-- 操作列 -->
      <div class="btn-container" v-if="props.scope.column.property === 'master_uid'" style="height: 48px;">
        <el-button type="text" @click="routeJump('edit', props.scope.row)" class="func-btn-text">编辑</el-button>
        <el-button type="text" @click="routeJump('lesson', props.scope.row)" class="func-btn-text">课节</el-button>
        <el-button type="text" @click="routeJump('communicate', props.scope.row)" class="func-btn-text">成员交流</el-button>
        <el-button type="text" @click="routeJump('repair', props.scope.row)" class="func-btn-text">修复打卡</el-button>
      </div>
      <div v-else-if="props.scope.column.property === 'title'" style="display: flex; padding-left: 8px;">
        <div class="img-box">
          <el-popover
            ref="popoverCover"
            placement="right"
            width="400">
            <i class="u-image auto"><img :src="props.scope.row.icon"></i>
          </el-popover>
          <img :src="props.scope.row.icon" alt="" v-popover:popoverCover>
        </div>
        <div class="text-box">
          <div>
            <div class="text">{{props.scope.row[props.scope.column.property]}}</div>
            <div class="mix-walk">
              <span class="name">{{props.scope.row['master_realname']}}</span>
              <span class="fee">{{props.scope.row['join_price'] | moneyFilter}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="props.scope.column.property === 'community_status'"> {{props.scope.row['community_status'] | communityStatus}} </div>
      <div v-else-if="props.scope.column.property === 'sort'"> {{props.scope.row['sort'] | sortFilter}} </div>
      <div v-else-if="props.scope.column.property === 'start_time'"> 
        <p>{{props.scope.row['start_time'] * 1000 | date }} </p>
        <p>{{props.scope.row['end_time'] * 1000 | date }} </p>
      </div>
      <!-- 其他 -->
      <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
    </template>
  </list>
</template>

<script>
import CourseList from './index'
export default CourseList
</script>

<style lang="scss">
@import "~SCSS/variables";
@import "~SCSS/mixins";

.page-new-course {
  .f-float-right {
    float: right;
  }
  .m-search-bar {
    .control {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  .el-input__inner {
    height: 38px !important;
  }
  .el-table {
    .cell {
      color: #929292;
    }
  }
  .list-top {
    margin-bottom: 30px;
  }

  .key,
  .update-time {
    color: $color-level-three;
  }

  .cover-wrapper {
    padding: 10px 0;
    line-height: 1;
    
    .cover {
      @include setSize(40px, 40px)
    }
  }

  .change-sort-input {
      padding: 0 10px;
      width: 190px;
      height: 34px;
      border: solid 1px $color-light-gray;
      border-radius: 2px
    }
  .select-type {
    width:100px;
    height:38px;
    background:rgba(255,255,255,1);
    border-radius:2px;
    border-color:rgba(226,227,229,1);
    margin-left: 10px;
  }
  .func-btn-text {
    height:18px;
    font-size:13px;
    font-family:PingFangSC-Medium;
    color:rgba(78,120,161,1);
    line-height:18px;
  }
  .text-box {
    text-align: left;
    flex-grow: 1;
    position: relative;
    > div {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #354048;
      font-size: 14px;
      line-height: 1.4;
    }
    .mix-walk {
      overflow: hidden;
      font-size: 12px;
      .name {
        float: left;
        color: #929292;
        font-size: 12px;
      }
      .fee {
        float: right;
      }
    }
  }
  .img-box {
    width: 74px;
    height: 74px;
    background: rgba(0,0,0,.1);
    margin-right: 10px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
