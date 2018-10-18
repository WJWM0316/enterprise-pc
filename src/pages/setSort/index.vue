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
        <el-button type="primary" @click="todoAction('add')" class="click-item " style="float: right">新建分类</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="classifyList.list"
    :fields="fields"
    :total="classifyList.total"
    >
      <template scope="props" slot="columns">

        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('edit', props.scope.row)"
            >
              编辑
          </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('delete', props.scope.row)"
            >
              删除
          </el-button>
        </div>
        <!-- 排序 -->
        <div v-else-if="props.scope.column.property === 'sort'" class="sort">
          <img src="~IMAGES/icon_up_dis.png" class="sort_blo up forbid" v-if="form.page === 1 && props.scope.row.index==0"></img>
          <img src="~IMAGES/icon_up.png" class="sort_blo up" @click="setSort('up', props.scope.row)" v-else />

          <img src="~IMAGES/icon_down_dis.png" class="sort_blo up forbid" v-if="pageNum == form.page && props.scope.row.index-0+1 === classifyList.list.length"></img>
          <img src="~IMAGES/icon_down.png" class="sort_blo down" @click="setSort('down', props.scope.row)" v-else />
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
      //background:rgba(188,188,188,1);
      &.up {
        margin-bottom: 8px;
      }
      &.forbid {
        //background:rgba(237,237,237,1);
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
