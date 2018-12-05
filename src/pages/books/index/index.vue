<template>
  <section class="page-book-list">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="500px"
          @search="handleSearch"
          v-model="form.title"
          placeholder="请填写书籍名称或关键词" />
      </el-col>
    </el-row>
    <!-- :total="jobCircleLists.total" -->
    <table-list
    :list="bookList.list"
    :fields="fields"
    :total="bookList.total"
    :page="bookList.page"

    >
      <template slot-scope="props" slot="columns">
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
        
        <div  v-else-if="props.scope.column.property === 'wordIntro'" class="content cont_txt" >
              <div class="limit-row-num-2" v-html="props.scope.row.wordIntro"></div>
        </div>

        <div  v-else-if="props.scope.column.property === 'title'" class="content cont_txt" >
              <div class="limit-row-num-2" v-html="props.scope.row.title"></div>
        </div>

        <div v-else-if="props.scope.column.property === 'tags'" class="">
          {{ props.scope.row.tags.name}}
        </div>

        <div v-else-if="props.scope.column.property === 'readCount'" style="padding-left:10px;" class="">
          {{ props.scope.row.readCount ?props.scope.row.readCount : 0}}
        </div>

        <div v-else-if="props.scope.column.property === 'middleUrl'" class="flex-box">
            <img class="avatar" :src="props.scope.row.middleUrl" />
        </div>

        <div style="margin-right: 30px;" v-else-if="props.scope.column.property === 'status'">
          {{ props.scope.row.localStatus === 0? '上线':'下线' }}
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>

     
    </table-list>
    <modal-dialog
        headType = '3'
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
              <p class="dialog_p" v-if="model.status===0">本书籍上线后将在（员工端）职场好书展示。</p>
              <p class="dialog_p" v-else>本书籍下线后（员工端）将不可见，您确定下线吗？</p>
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
.page-book-list {
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
    height: 36px;
    .limit-row-num-2 {
      height: 36px;
      p {
        margin: 0 0;
        text-align: left;
      }
    }
  }
  .avatar {
    width: 40px;
    height: 100px;
    
  }

  .cont_txt {
    height: 36px; margin-right: 20px;
  }
}
</style>
