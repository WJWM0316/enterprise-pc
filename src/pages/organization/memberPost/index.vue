<template>
  <div id="member-post">
    <el-breadcrumb separator=">" class="zike-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'memberList' }">组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name === 'addMember' ? '添加成员' : '编辑成员'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px">
        <!-- 姓名 -->
        <el-form-item
          label="姓名"
          prop="name"
          class="limit-width"
          >
            <el-input style="width: 300px;" v-model="form.name" :maxlength="30" placeholder="请填写姓名"/>
        </el-form-item>

        <el-form-item
          label="头像"
          prop="avatarId"
          class="limit-width">
            <div  
              @mouseover="imgOp (imgIndex,'over') "
              @mouseout="imgOp(imgIndex,'out')" 
             v-show="imageUpload.list.length>0">
              <!-- <img class="" :src="imageUpload.list[0].url" alt="" >
              <span class="deleteImg" v-if="imageUpload.list[0].show"
                @click="imgOp(imgIndex,'delete')"
              >删除图片</span> -->
            </div>
          <el-upload
            ref="image"
            name="image"
            :accept="imageUpload.accept"
            :data="imageUpload.params"
            :action="imageUpload.action"
            :before-upload="beforeImageUpload"
            :on-success="handleImageSuccess"
            :show-file-list="false"
            :limit="imageUpload.limit" v-if="imageUpload.list.length<9">
            <el-button slot="trigger" size="small" type="primary">{{imageUpload.btnTxt}}</el-button>
            <div slot="tip" class="el-upload__tip">{{imageUpload.tips}}</div>
          </el-upload>

        </el-form-item>

        <!-- 所属部门 -->
        <el-form-item
          label="所属部门"
          prop="groupId"
          class="limit-width"
          >
          <el-select v-model="form.groupId" placeholder="请选择所属部门">
            <el-option
              v-for="item in groupList"
              :key="item.groupId"
              :label="item.groupName"
              :value="item.groupId"
              >
            </el-option>
          </el-select>
        </el-form-item>
        
        <!-- 职位 -->
        <el-form-item
          label="职位"
          prop="occupation"
          class="limit-width"
          >
            <el-input style="width: 300px;" v-model="form.occupation" :maxlength="30" placeholder="请填写职位信息"/>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item
          label="邮箱"
          prop="email"
          class="limit-width"
          >
            <el-input style="width: 300px;" v-model="form.email" :maxlength="30" placeholder="请填写邮箱" />
        </el-form-item>

        <!-- 设置密码 -->
        <el-form-item
          label="设置密码"
          prop="password"
          class="limit-width"
          >
            <el-input style="width: 300px;" v-model="form.password" :maxlength="30"  placeholder="请填写密码"/>
        </el-form-item>

        <!-- 手机号码 -->
        <el-form-item
          label="手机号码"
          prop="mobile"
          class="limit-width"
          >
            <el-input style="width: 300px;" v-model="form.mobile" :maxlength="30"  placeholder="请填写手机号码"/>
        </el-form-item>


        <!-- 微信号 -->
        <el-form-item
          label="微信号"
          prop="wechat"
          class="limit-width"
          >
            <el-input style="width: 300px;" v-model="form.wechat" :maxlength="30"  placeholder="请填写微信号"/>
        </el-form-item>

        <!-- 权限管理 -->
        <el-form-item
          label="权限管理"
          prop="roleId"
          class="limit-width"
          >
            <el-select v-model="form.roleId" placeholder="请选择权限">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
        </el-form-item>
        
        <!-- 确认提交 -->
        <el-form-item class="footer-button">
          <el-button type="primary" class="click-item" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script>
<style lang="scss">
@import './index.scss'
</style>