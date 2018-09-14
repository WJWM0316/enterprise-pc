<template>
  <section id="tutor">
    <div class="page-position">导师管理</div>

    <div class="tutor-tab-box">
      <div :class="{active: tutorType === 'inner'}" @click="select('inner')">内部导师</div>
      <div :class="{active: tutorType === 'outer'}" @click="select('outer')">外部导师</div>
    </div>
    
    <div class="banner"></div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入导师名称或关键字" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" class="click-item">添加外部导师</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="courseList"
    :fields="fields"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false">移除导师</el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'courseName'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.img"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img :src="props.scope.row.img">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2"> {{ props.scope.row.courseName}} </div>
                <div class="tutor-name">导师名称-组织架构</div>
            </div>
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'online'">
          {{ props.scope.row.online == 0 ? '下线' : '上线' }}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
    <modal-dialog
      v-model="models.show"
      :title="models.title"
      :show-close="models.showClose"
      :confirm-text="models.confirmText"
      :type="models.type"
      :width="models.width"
      :min-height="models.minHeight"
      @confirm="confirm"
      @cancel="cancel"
      >
        <div slot="title" style="margin-left: 10px;">
          <h3 class="dialog-title">
            {{models.title}} 
          </h3>
        </div>
        <div slot="customize-html">
          <div class="customize-html-content">
            <search-bar
              width="464px"
              @search="handleSearch"
              v-model="form.name"
              placeholder="请输入手机号搜索" />
          </div>
        </div>
    </modal-dialog>
  </section>
</template>

<script>
import CourseList from './index'
export default CourseList
</script>

<style lang="scss">
@import "~COLORS/variables";
#tutor {
  background: #fff;
  .action-zone {
    text-align: right;
  }
  .header {
    margin: 20px 0;
  }
  .search-zone {
    display: flex;
  }
  .tutor-name {
    color: #929292;
  }
  .click-item {
    color: #354048;
    margin-right: 8px;
  }
  .tutor-tab-box {
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    > div {
      transition: all ease .4s;
      color: #929292;
      position: relative;
      height: 46px;
      line-height: 46px;
      display: inline-block;
      margin-right: 50px;
      cursor: pointer;
      padding: 0 15px;
      font-size: 14px;
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
    .active {
      color: #354048;
      &:before{
        opacity: 1;
        visibility: visible;
      };
    }
  }
  .banner {
    height:136px;
    background: rgba(0,0,0,.1);
    margin: 30px 0;
  }
  .zike-common-search-bar {
    margin-top: 30px;
  }
}
</style>
