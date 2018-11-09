<template>
  <section class="page-course-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.title"
          placeholder="请输入关键词" />
      </el-col>
    </el-row>
    <!-- :total="jobCircleLists.total" -->
    <table-list
    :list="bookList.list"
    :fields="fields"
    :total="bookList.total"

    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button v-if="props.scope.row.localStatus ===1"
            type="text"
            @click="todoAction('up', props.scope.row)">
              上线
            </el-button>
          <el-button v-else
            type="text"
            @click="todoAction('down', props.scope.row)">
              下线
            </el-button>
        </div>
        
        <div style="height: 40px;" v-else-if="props.scope.column.property === 'introduce'" class="content" >
              <div class="limit-row-num-2"> {{ props.scope.row.introduce}} </div>
        </div>

        <div v-else-if="props.scope.column.property === 'tags'" class="">
          {{ props.scope.row.tags.name}}
        </div>


        <div v-else-if="props.scope.column.property === 'middleUrl'" class="flex-box">
            <img class="avatar" :src="props.scope.row.middleUrl" />
        </div>

        <div v-else-if="props.scope.column.property === 'status'">
          {{ props.scope.row.localStatus === 0? '上线':'下线' }}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>

     
    </table-list>

     <modal-dialog
        bottomType = '2'
        v-model="model.show"
        :title="model.title"
        :show-close="model.showClose"
        :confirm-text="model.confirmText"
        :type="model.type"
        :width="model.width"
        :min-height="model.minHeight"
        @confirm="confirm"
        >
          <div slot="title" >
            <h3 class="dialog-title">
              {{model.title}} 
            </h3>
          </div>
          <div slot="customize-html" style="margin-left: 40px;">
            <div class="customize-html-content">
              <p class="dialog_p" v-if="model.status===0">上线后该内容前台可见</p>
              <p class="dialog_p" v-else>下线后该内容前台不可见</p>
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
@import "./index.scss"
</style>
