<template>
  <section class="page-course-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'courseList' }">课程管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/lesson/index?course_id=${course_id}`">课节管理</el-breadcrumb-item>
      <el-breadcrumb-item>打卡管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入关键词" />
      </el-col>
    </el-row>
    
    <table-list
    :list="cardList.list"
    :fields="fields"
    :total="cardList.total"
    :page="cardList.page"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
            <div v-if="props.scope.row.punchCardStatus==1">
              <el-button
                type="text"
                :disabled="props.scope.row.isDeleted === 1 ? true : false"
                @click="todoAction('delete', props.scope.row)">
                  删除
                </el-button>
              <el-button
                type="text"
                :disabled="props.scope.row.isDeleted === 1 ? true : false"
                @click="todoAction('comment', props.scope.row)">
                  评论
                </el-button>

               <el-button
              type="text"
              v-if="props.scope.row.isExcellentCard==1"
              @click="todoAction('cancelExcellent', props.scope.row)">
                取消优秀
              </el-button>
               <el-button
              type="text" v-else
              @click="todoAction('excellent', props.scope.row)">
                优秀打卡
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
        <div v-else-if="props.scope.column.property === 'cardContent'" class="flex-box">
          <div class="limit-row-num-2" :class="{'delet': props.scope.row.punchCardStatus != 1}">
            {{ props.scope.row.cardContent}}
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'releaseUser'" class="flex-box" :class="{'delet': props.scope.row.punchCardStatus != 1}">
             {{props.scope.row.releaseUser.nickname}}
          </div>
        </div>
        <div v-else-if="props.scope.column.property === 'punchCardStatus'" :class="{'delet': props.scope.row.punchCardStatus != 1}">
          {{ props.scope.row.punchCardStatus == 1? '正常':'已删除' }}
        </div>
        <div v-else-if="props.scope.column.property === 'punchCardTime'" :class="{'delet': props.scope.row.punchCardStatus != 1}">
          {{props.scope.row.punchCardTime}}
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
