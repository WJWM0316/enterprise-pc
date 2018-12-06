<template>
  <section class="page-classify-list">

    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="header">
      <el-col :span="12" class="left-content">
        <p style="color:rgba(188,188,188,1);font-size:12px;">* 这里的排序会影响员工端的分类排序。</p>
      </el-col>
      <el-col :span="12" class="right-content">
        <el-button type="primary" @click="todoAction('add')" class="click-item btn-limit-width" style="float: right;">添加内容类型</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="classifyList.list"
    :fields="fields"
    :total="classifyList.total"
    >
      <template slot-scope="props" slot="columns">

        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('edit', props.scope.row)"
            >
              重命名
          </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('delete', props.scope.row)"
            >
              删除类型
          </el-button>
        </div>
        <!-- 排序 -->
        <div v-else-if="props.scope.column.property === 'sort'" class="sort">
          <span class="triangle_up disabled" v-if="form.page === 1 && props.scope.row.index==0"></span>
          <span class="triangle_up"  @click="setSort('up', props.scope.row)" v-else></span>
          <span class="triangle_down disabled" v-if="pageNum == form.page && props.scope.row.index-0+1 === classifyList.list.length"></span>
          <span class="triangle_down" @click="setSort('down', props.scope.row)" v-else ></span>
        </div>
         <div v-else-if="props.scope.column.property === 'categoryName'">
          <div class="categoryName">{{props.scope.row.categoryName}} <span v-if="!props.scope.row.categoryId">系统</span></div>
          <div class="categoryCount">
            <span>{{props.scope.row.courseCount}}个课程</span>&nbsp;|&nbsp;<span>{{props.scope.row.liveCount}}个直播</span>
          </div>
        </div>
        <div v-else style="margin-left: 40px;">{{props.scope.row[props.scope.column.property]}}</div>
      </template>
    </table-list>

    <modal-dialog
      v-model="model.show"
      :title="model.title"
      :show-close="model.showClose"
      :confirm-text="model.confirmText"
      :type="model.type"
      :width="model.width"
      :min-height="model.minHeight"
      @confirm="confirm"
      >
        <div slot="title">
          <h3 class="dialog-title">
            {{model.title}} 
          </h3>
        </div>
        <div slot="customize-html"  :class="{'txt': model.txt.length>0}">
          <div class="customize-html-content">
            <p class="dialog_p" v-if="model.txt.length>0">{{model.txt}} </p>
            <div class="mode_input" v-else >
              <el-input v-model="form.name" placeholder="请输入分类名，限制10个字以内" :maxlength="10" style="width: 348px;margin-top: 10px;margin-left: 20px;" />
              <p class="model_hint" v-show="form.hintTXt.length>0">
                {{form.hintTXt}}
              </p>
            </div>
            
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
.page-classify-list {
  background: white;

  .triangle_up {
  margin-left: 20px;
  width:0;
  height:0;
  border-width:0 7px 10px;
  border-style:solid;
  border-color:transparent transparent rgba(188,188,188,1);
  margin:40px auto;
  position:relative;
  top: -20px;
  &.disabled{
    border-color:transparent transparent #DCDCDC;
    &:hover{
      border-color:transparent transparent #DCDCDC;
      cursor: inherit;
    }
  }
  &:hover{
    border-color:transparent transparent #FFE266;
    cursor:pointer;
  }
}
.categoryName {
  padding-left: 40px;
  color: #666;
  font-weight: 400;
  font-size: 14px;
  span {
    width:40px;
    background:rgba(255,249,217,1);
    border-radius:10px;
    border:1px solid rgba(215,171,112,1);
    font-size: 12px;
    font-weight: 400;
    display: inline-block;
    text-align: center;
    line-height: 18px;
    color: #D7AB70;
    vertical-align: middle;
    box-sizing: border-box;
  }
}
.categoryCount {
  padding-left: 40px;
  color: #929292;
  font-weight: 400;
  font-size: 14px;
}
.sort {
  height: 30px;
  position: relative;
}
.triangle_down{
  display:block;
  width:0;
  height:0;
  border-width:10px 7px 0;
  border-style:solid;
  border-color:rgba(188,188,188,1) transparent transparent;
  position:absolute;
  bottom:0px;
  left:0px;

  &.disabled{
    border-color:#DCDCDC transparent transparent;
    &:hover{
      border-color:#DCDCDC transparent transparent ;
      cursor: inherit;
    }
  }
  &:hover{
    border-color: #FFE266 transparent transparent ;
    cursor:pointer;
  }
}
  .action-zone {
    text-align: right;
  }
  .header {
    margin: 20px 0;
  }
  .search-zone {
    display: flex;
  }
  .search-bar {
    border-radius: 4px;
    border: 1px solid rgba(220,223,230,1);
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    position: relative;
    overflow: hidden;
    input {
      width: 100%;
      height: calc(100% - 2px);
      position: absolute;
      left: 0;
      top: 0;
      outline: none;
      border: none;
      display: block;
      box-sizing: border-box;
      padding: 0 10px;
    }
    span {
      width: 40px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      outline: none;
      border: none;
      display: block;
      box-sizing: border-box;
      padding: 0 10px;
      text-align: center;
      cursor: pointer;
    }
  }
  .tutor-name {
    color: #929292;
  }

  .sort {
    .sort_blo {
      width:14px;
      height:10px;
      display: block;
      &.up {
        margin-bottom: 8px;
      }
      &.forbid {
      }

      &.blo_hover {
        backgroud: red;
        &:hover{
          backgroud: red;
        }
      }
    }
  }
  .txt {
    margin-left: 40px;
  }
  .mode_input {
    position: relative;
    .model_hint {
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,52,52,1);
      margin-left: 20px;
      position: absolute;
      left: 0;
      bottom: -40px;
    }
  }
  
}
</style>
