<template>
<div id="work-zone-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'tutor' }">导师管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'tutorPost' ? '添加外部导师' : '添加外部导师'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="160px"
    label-suffix="："
    >
    <!-- 请填写导师名称-->
    <el-form-item
      label="导师名称"
      prop="name"
      class="limit-width"
      >
        <el-input v-model="form.name" :maxlength="30" style="width: 380px;" />
    </el-form-item>
    
    <!-- 导师头衔 -->
    <el-form-item
      label="导师头衔"
      prop="title"
      class="limit-width"
      >
        <el-input v-model="form.title" :maxlength="30" style="width: 380px;" />
    </el-form-item>
    
    <!-- 手机号 -->
    <el-form-item
      label="手机号"
      prop="mobile"
      class="limit-width"
      >
        <el-input v-model="form.mobile" :maxlength="30" style="width: 380px;" />
    </el-form-item>

    <!-- 设置密码 -->
    <el-form-item
      label="设置密码"
      prop="password"
      class="limit-width"
      >
        <el-input v-model="form.password" :maxlength="30" style="width: 380px;" />
    </el-form-item>

    <!-- 确认提交 -->
    <el-form-item>
      <el-button type="primary" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
    </el-form-item>
  </el-form>
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
          <!-- 选择圈主-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'owner_uid'">
            <div class="search-bar">
              <input type="text" name="" class="search" placeholder="请输入搜索名称">
              <span><i class="el-icon-search"></i></span>
            </div>
            <div class="group-list">
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="filterWorkZoneMenber(groupItem)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-radio v-model="form.owner_uid.value"
                :label="menberItem.uid"
                :key="menberIndex"
                @change="singleSelection('owner_uid', menberItem)"
                v-for="(menberItem, menberIndex) in temMenberLists">
                  {{menberItem.realname}}
              </el-radio>
            </div>
          </div>
          <!-- 选择圈主-end -->
          <!-- 选择工作圈成员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'members'">
            <div class="search-bar">
              <input type="text" name="" class="search" placeholder="请输入搜索名称">
              <span><i class="el-icon-search"></i></span>
            </div>
            <div class="group-list">
              <el-button size="large" @click="memberClassification('members', 'all')">所有人</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="memberClassification('members', groupItem.id)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-checkbox-group v-model="form.members.tem">
                <el-checkbox
                  :label="menberItem.realname"
                  :key="menberIndex"
                  @change="multipleSelection('members', menberItem)"
                  v-for="(menberItem, menberIndex) in temMenberLists" />
              </el-checkbox-group>
            </div>
          </div>
          <!-- 选择工作圈成员-end -->
          <!-- 组织-start -->
          <div class="organizations-type-list" v-if="models.currentModalName === 'organizations'">
            <el-checkbox-group v-model="form.organizations.tem">
              <el-checkbox
                :label="groupItem.groupName"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @change="seleteGroup('organizations', groupItem)" />
            </el-checkbox-group>
            <p class="tips">如果需要对部门组织进行修改，请点击左侧的<a class="set">【组织】</a>进行修改；如无权限，请联系管理员修改。</p>
          </div>
          <!-- 组织-end -->
          <!-- 选择不可见学员-start -->
          <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'hits'">
            <div class="search-bar">
              <input type="text" name="" class="search" placeholder="请输入搜索名称">
              <span><i class="el-icon-search"></i></span>
            </div>
            <div class="group-list">
              <el-button size="large" @click="memberClassification('members', 'all')">所有人</el-button>
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupLists"
                :key="groupIndex"
                @click="memberClassification('organizations', groupItem.id)">
                  {{groupItem.groupName}}
              </el-button>
            </div>
            <div class="menber-list">
              <el-checkbox-group v-model="form.hits.tem">
                <el-checkbox
                  :label="menberItem.realname"
                  :key="menberIndex"
                  @change="multipleSelection('hits', menberItem)"
                  v-for="(menberItem, menberIndex) in temMenberLists" />
              </el-checkbox-group>
            </div>
          </div>
          <!-- 选择不可见学员-end -->
        </div>
      </div>
  </modal-dialog>
</div>
</template>
<script>
import WorkZonePost from './index'
export default WorkZonePost
</script>
<style lang="scss">
@import './index.scss'
</style>