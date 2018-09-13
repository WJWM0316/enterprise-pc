<template>
  <section class="broadcast-list">
    <div class="page-position">直播管理</div>
    <el-row class="header">
      <el-col :span="12" class="search-zone">
        <el-input placeholder="请输入内容" v-model="form.name" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" @click="addBroadcast" class="click-item">新建直播</el-button>
      </el-col>
    </el-row>
    <table-list
    :list="jobCircleLists.list"
    :fields="fields"
    :total="jobCircleLists.total"
    >
      <template scope="props" slot="columns">
        <!-- 操作行数据 -->
        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('edit', props.scope.row)">
              编辑
            </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('note', props.scope.row)">
              问答区
            </el-button>
          <el-button
            type="text"
            :disabled="props.scope.row.isDeleted === 1 ? true : false"
            @click="todoAction('menber', props.scope.row)">
              直播回顾
            </el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'name'" class="flex-box">
          <div class="img-box">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.img"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto" v-popover:popoverCover>
                <img src="http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg">
              </i>
            </div>
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
        <div v-else-if="props.scope.column.property === 'zhuangtai'">
          不知道
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
  </section>
</template>

<script>
import BroadcastList from './index'
export default BroadcastList
</script>

<style lang="scss">
@import "./index.scss"
</style>
