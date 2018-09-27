<template>
  <section id="tutor">
    <div class="page-position">导师管理</div>

    <div class="tutor-tab-box">
      <div :class="{active: tutorType === 'inner'}" @click="select('inner')">内部导师</div>
      <div :class="{active: tutorType === 'outer'}" @click="select('outer')">外部导师</div>
    </div>
    
    <div class="banner" v-if="tutorType === 'outer'"></div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="pagination.name"
          placeholder="请输入导师名称或关键字" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" class="click-item" @click="openMadal" v-if="tutorType === 'outer'">添加外部导师</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="tutorList"
    :fields="tutorType === 'inner'?innerFields:outerFields"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->

        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false" @click="showDeleteHint(props.scope.row)">移除导师</el-button>
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
        <div slot="title" style="margin-left: 20px;">
          <h3 class="dialog-title">
            {{models.title}} 
          </h3>
        </div>
        <div slot="customize-html" style="margin-left: 20px;margin-top: 20px;">
          <div class="customize-html-content">
            <search-bar
              width="464px"
              @search="searchTea"
              v-model="searchValue"
              placeholder="请输入手机号搜索" />
            <div class="fetch-result" v-if="searchType">
              <el-collapse-transition>
                <div class="transition-flex-box" v-if="searchList">
                  <div class="img-box"></div>
                  <div class="text-inner-content">
                    <p class="user-name">{{searchList.realname}}</p>
                    <p class="user-degree">{{searchList.title[0]}}</p>
                  </div>
                  <div class="phone-box">
                    {{searchList.mobile}}
                  </div>
                </div>
                <div class="transition-flex-box tutor-nodata" v-else>
                  Ops，暂时没有找到这个导师，点击右下方按钮，添加新的外部导师吧
                </div>
              </el-collapse-transition>
            </div>
          </div>
        </div>
    </modal-dialog>

    <modal-dialog
      v-model="delateModels.show"
      :title="delateModels.title"
      :show-close="delateModels.showClose"
      :confirm-text="delateModels.confirmText"
      :type="delateModels.type"
      :width="delateModels.width"
      :min-height="delateModels.minHeight"
      @confirm="deleteTea"
      >
        <div slot="title" style="margin-left: 22px;">
          <h3 class="dialog-title">
            {{delateModels.title}} 
          </h3>
        </div>
        <div slot="customize-html" style="margin-left: 40px;">
          <div class="customize-html-content">
            <p class="dialog_p">{{delateModels.txt}} </p>
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
    //margin-top: 30px;
  }
  .transition-flex-box {
    height: 48px;
    border-radius: 4px;
    display: flex;
    line-height: 48px;
    width: 464px;
    font-size:14px;
    font-weight:400;
    color:rgba(90,94,102,1);
    margin-bottom: 50px;
    .img-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(0,0,0,.1);
      margin-right: 16px;
    }
    .text-inner-content{
      flex-grow: 1;
    }
    .phone-box {
      font-size:14px;
      color:rgba(53,64,72,1);
    }
    p {
      margin: 0;
      line-height: 1;
    }
    .user-name {
      font-size:14px;
      font-weight:400;
      color:rgba(53,64,72,1);
      margin-top: 8px;
    }
    .user-degree {
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-top: 5px;
    }
  }
  .fetch-result {
    margin-top: 24px;
  }
  .tutor-nodata {
    background: #fff;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    height: 24px;
    line-height: 24px;
    position: relative;
    &:before{
      width: 0;
      height: 0;
      border-color: red;
      position: absolute;
      top: -16px;
      left: 40px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #ebeef5 transparent;
      display: block;
      content: '';
    };
    &:after{
      width: 0;
      height: 0;
      border-color: red;
      position: absolute;
      top: -15px;
      left: 40px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
      display: block;
      content: '';
    };
  }
}


.dialog_p {
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:22px;
  }
</style>
