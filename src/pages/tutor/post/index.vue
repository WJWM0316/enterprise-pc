<template>
<div id="work-zone-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'tutor' }">导师管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'tutorPost' ? '添加外部导师' : '添加外部导师'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form class="form"
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
      <el-button class="btn" type="primary" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
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
    >
      <div slot="title" style="margin-left: 22px;">
        <h3 class="dialog-title">
          {{models.title}} 
        </h3>
      </div>
      <div slot="customize-html" style="margin-left: 40px;">
        <div class="customize-html-content">
            <p class="dialog_p">{{models.txt}} </p>
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
@import './index.scss';
.form {
  margin-top: 40px;
  .btn {
    padding: 12px 50px;
    margin-top: 30px;
  }
}
.dialog_p {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: rgba(102,102,102,1);
  line-height:22px;
}
</style>