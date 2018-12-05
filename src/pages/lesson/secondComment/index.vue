<template>
  <section class="page-lesson-secondComment-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'courseList' }">课程管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'lessonList' , query:{'course_id': pageData.course_id}}">课节管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'punchCard' , query:{
        'course_id': pageData.course_id,
        'course_section_id': pageData.course_section_id
      }}">打卡管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'comment' , query:{
        'course_id': pageData.course_id,
        'course_section_id': pageData.course_section_id,
        'postId': postId
      }}">评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
    </el-row>
    <table-list
    :list="commentData.list"
    :fields="fields"
    :page="commentData.page"
    :total="commentData.total"
    >
      <template slot-scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
            <div v-if="props.scope.row.status==1">
              <el-button
                type="text"
                :disabled="props.scope.row.isDeleted === 1 ? true : false"
                @click="todoAction('delete', props.scope.row)">
                  删除
                </el-button>
            </div>
            <div v-else>
              <el-button
                type="text"
                @click="todoAction('recover', props.scope.row)">
                  恢复
                </el-button>
            </div>
        </div>
        <div v-else-if="props.scope.column.property === 'content'" :class="{'delet': props.scope.row.status != 1}" class="flex-box">
            <div class="limit-row-num-2"> {{ props.scope.row.content}} </div>
        </div>
        <div v-else-if="props.scope.column.property === 'userName'" :class="{'delet': props.scope.row.status != 1}" class="flex-box">
             {{props.scope.row.userName}}
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'updatedAt'" :class="{'delet': props.scope.row.status != 1}">
          {{props.scope.row.updatedAt}}
        </div>
        <div v-else-if="props.scope.column.property === 'status'" :class="{'delet': props.scope.row.status != 1}">
          {{ props.scope.row.status == 1? '正常':'已删除' }}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
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
        <div slot="title" style="margin-left: 22px;">
          <h3 class="dialog-title">
            {{model.title}} 
          </h3>
        </div>
        <div slot="customize-html" style="margin-left: 40px;">
          <div class="customize-html-content">
            <p class="dialog_p">{{model.txt}} </p>
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
