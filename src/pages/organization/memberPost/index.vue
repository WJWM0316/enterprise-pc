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

          <div class="img-box" v-if="form.icon.tem && !imageUpload.showError">
            <img :src="form.icon.tem" class="upload-cover avatar_blo">
          </div>
          <my-cropper
            :hasUploaded="imageUpload.hasUploaded"
            :btnTxt="imageUpload.btnTxt"
            :accept="imageUpload.accept"
            picShape="radiu"
            @success="imageUploadSuccess"
            @fail="handleImageError"
            ></my-cropper>

          <div class="upload-error-tips" :class="{'upload-error-tips-show': imageUpload.showError}">
            <div class="tips">
              <p><i class="el-icon-error"></i></p>
              <p>上传失败</p>
            </div>
          </div>
        </el-form-item>

        <!-- 所属部门 -->
        <el-form-item
          label="所属部门"
          prop="groupId"
          class="limit-width"
          >
          <el-select style="width: 224px;" v-model="form.groupId" placeholder="请选择所属部门">
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

        <!-- 性别 -->
        <el-form-item
          label="性别"
          prop="gender"
          class="limit-width"
          >
            <el-radio v-model="form.gender" label="1">男</el-radio>
            <el-radio v-model="form.gender" label="2">女</el-radio>
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
          v-if="pageStatus === 'add'">
            <el-input style="width: 300px;" v-model="form.password" :maxlength="20"  placeholder="请填写密码" v-if="pageStatus==='add'"/>

            <el-button v-else size="small" type="primary" class="" @click="openModel2">点击修改</el-button>
        </el-form-item>
        <el-form-item
          label="设置密码"
          class="limit-width"
          v-else>
            <el-input style="width: 300px;" v-model="form.password" :maxlength="20"  placeholder="请填写密码" v-if="pageStatus==='add'"/>

            <el-button v-else size="small" type="primary" class="" @click="openModel2">点击修改</el-button>
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

        <!-- 选择管理分组 -->
        <el-form-item
          label="选择管理分组"
          prop="roleId"
          class="limit-width"
          v-if="form.roleId === 3">
            <div class="selected-item" v-show="form.group_management.show"
            >
              <span 
                v-for="(groupItem, groupIndex) in form.group_management.tem" 
                :key="groupIndex"
                @click="removeGroupCheck(groupIndex)">
                {{ groupItem.groupName }}<i class="el-icon-close"></i>
              </span>
            </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal()"
            :class="{'zike-btn-selected': form.group_management.show}">
              {{form.group_management.show ? '重新选择' : '点击选择'}}
          </el-button>
        </el-form-item>
        
        <!-- 确认提交 -->
        <el-form-item class="footer-button">
          <el-button type="primary" class="click-item" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
          <el-button type="info" class="click-item deleteBtn" @click="delateModels.show=true" v-if="pageStatus==='edit' && isDelete" >删除该账号</el-button>
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
        <div slot="title" >
          <h3 class="dialog-title">
            {{models.title}} 
          </h3>
        </div>
        <div slot="customize-html">
          <div class="customize-html-content">
            <!-- 组织-start -->
            <div class="groupList-type-list" >
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in groupList"
                 @click="seleteGroup(groupIndex, 'groupLists')"
                :class="{'zike-btn-active-selected': groupItem.active}"
                :key="groupIndex">
                  {{groupItem.groupName}}
              </el-button>
              <p class="tips">
                如果需要对部门组织进行修改，请点击左侧的
                <router-link :to="{name: 'organization'}" class="set">【组织】</router-link>
                进行修改；如无权限，请联系管理员修改。
              </p>
            </div>
            <!-- 组织-end -->
          </div>
        </div>
    </modal-dialog>

    <modal-dialog
      bottomType="2"
      headType="2"
      v-model="passWordModel.show"
      :title="passWordModel.title"
      :show-close="passWordModel.showClose"
      :confirm-text="passWordModel.confirmText"
      :type="passWordModel.type"
      :width="passWordModel.width"
      :min-height="passWordModel.minHeight"
      @confirm="confirm2"
      >
        <div slot="title">
          <h3 class="dialog-title">
            {{passWordModel.title}} 
          </h3>
        </div>
        <div slot="customize-html" >
          <div class="customize-html-content" style="margin-top: 8px;">
            <el-input :class="{'pw_input': passWordModel.isHintShow}" v-model="form.password" :maxlength="20"  placeholder="请输入密码，限制6-20个字"/>
          </div>
          <p class="pw_hint" v-if="passWordModel.isHintShow">{{passWordModel.hintMsg}}</p>
        </div>
    </modal-dialog>

    <modal-dialog
      bottomType="2"
      headType="3"
      v-model="delateModels.show"
      :title="delateModels.title"
      :show-close="delateModels.showClose"
      :confirm-text="delateModels.confirmText"
      :type="delateModels.type"
      :width="delateModels.width"
      :min-height="delateModels.minHeight"
      @confirm="deleteMember"
      >
        <div slot="title" >
          <h3 class="dialog-title">
            {{delateModels.title}} 
          </h3>
        </div>
        <div slot="customize-html" style="margin-left: 40px;">
          <div class="customize-html-content">
            <p class="dialog_p">{{delateModels.txt}} </p>
          </div>
        </div>
    </modal-dialog>
  </div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script>
<style lang="scss">
@import './index.scss'
</style>