<template>
<div id="work-zone-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <!-- <el-breadcrumb-item :to="{ name: 'tutor' }">导师管理</el-breadcrumb-item> -->
    <el-breadcrumb-item>添加新外部导师</el-breadcrumb-item>
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
      label="导师姓名"
      prop="name"
      class="limit-width"
      >
        <el-input v-model="form.name" :maxlength="10" style="width: 380px; " placeholder="限制10个字以内" />
    </el-form-item>

    <!-- 性别 -->
    <el-form-item
      label="选择性别"
      prop="gender"
      class="limit-width"
      >
        <el-radio v-model="form.gender" label="1">男</el-radio>
        <el-radio v-model="form.gender" label="2">女</el-radio>
    </el-form-item>
    
    <!-- 导师头衔 -->
    <el-form-item
      label="导师头衔"
      prop="title"
      class="limit-width"
      >
        <el-input v-model="form.title" :maxlength="25" style="width: 380px;" placeholder="限制25个字以内"/>
    </el-form-item>
    
    <!-- 手机号 -->
    <el-form-item
      label="手机号码"
      prop="mobile"
      class="limit-width"
      >
        <el-input type=number v-model="form.mobile" :maxlength="11" style="width: 380px;" placeholder="限制11个字以内，纯数字"/>
    </el-form-item>

    

    <!-- 设置密码 -->
    <el-form-item
      label="设置密码"
      prop="password"
      class="limit-width"
      >
        <el-input type=text v-model="form.password" :maxlength="20" style="width: 380px;" placeholder="限制6-20个字" />
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
      <div slot="title" >
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
import tutorPost from './index'
export default tutorPost
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