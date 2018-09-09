<template>
  <div id="course-post">
    <el-breadcrumb separator=">" class="page-navigation">
      <el-breadcrumb-item :to="{ name: 'course' }">课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name === 'coursePost' ? '新建课程' : '更新课程'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px">

        <div class="walk-title">课程基础信息</div>

        <!-- 请填写课程名称 -->
        <el-form-item
          label="课程名称"
          prop="courseName"
          class="limit-width"
          >
            <el-input v-model="form.courseName" :maxlength="30" style="width: 380px;" />
        </el-form-item>
        
        <!-- 课程分类 -->
        <el-form-item
          label="课程分类"
          prop="courseType"
          class="limit-width"
          >
            <div class="selected-item">
              已选择：<span @click="removeCheck">产品<i class="el-icon-close"></i></span>
            </div>
            <el-button class="click-item" type="primary" @click="openModal('courseType')">点击选择</el-button>
        </el-form-item>
        
        <!-- 选择导师 -->
        <el-form-item
          label="选择导师"
          prop="tutor"
          class="limit-width"
          >
            <div class="selected-item">
              已选择：<span @click="removeCheck">产品<i class="el-icon-close"></i></span>
            </div>
            <el-button class="click-item" type="primary" @click="openModal('tutor')">点击选择</el-button>
        </el-form-item>

        <!-- 所属组织 -->
        <el-form-item
          label="所属组织"
          prop="organization"
          class="limit-width"
          > 
            <div class="selected-item">
              已选择：<span @click="removeCheck">产品<i class="el-icon-close"></i></span>
            </div>
            <el-button class="click-item" type="primary" @click="openModal('organizations')">点击选择</el-button>
            <el-tooltip
              effect="dark"
              content="这是所属组织的提示文案哦~"
              placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
        </el-form-item>

        <div class="walk-title">课程详细信息</div>

        <!-- 课程封面 -->
        <el-form-item
          label="课程封面"
          prop="classification"
          class="limit-width"
          >
          <div class="upload-error-tips upload-error-tips-show">
            <div class="tips">
              <p><i class="el-icon-error"></i></p>
              <p>上传失败</p>
            </div>
          </div>
          <div class="upload-image click-item" role="button" @click="onSelectFile">
            <i  class="el-icon-upload"></i> 上传封面
            <input type="file" id="uplaod-file" ref="hiddenFile" @change="onFileChange" style="display: none;" />
          </div>
          <div class="img-box">
            <img :src="companyLogoUrl" class="upload-cover">
          </div>
          <div class="upload-image-tips">建议尺寸160X160px ，JPG、PNG格式，图片小于5M</div>
        </el-form-item>
        
        <el-form-item
          label="课程介绍"
          prop="introduction"
          class="zike-edit"
          >
            <editor
              class="editor"
              :content="ContentEditor.content"
              v-model="form.introduction"
              :path="ContentEditor.path"
              :height="ContentEditor.height"
              @blur="handleContentEditorBlur" />
        </el-form-item>
        
        <!-- 选择必修学员 -->
        <el-form-item
          label="选择必修学员"
          class="limit-width"
          >
            <div class="selected-item">
              <span @click="removeCheck" v-for="item in 4" :key="item">学员{{item}}<i class="el-icon-close"></i></span>
            </div>
            <el-button class="click-item" type="primary" @click="openModal('menberCompulsory')">点击选择</el-button>
        </el-form-item>

        <!-- 选择不可见学员 -->
        <el-form-item
          label="选择不可见学员"
          class="limit-width"
          >
            <div class="selected-item">
              <span @click="removeCheck" v-for="item in 4" :key="item">学员{{item}}<i class="el-icon-close"></i></span>
            </div>
            <el-button class="click-item" type="primary" @click="openModal('menberInvisible')">点击选择</el-button>
            <el-tooltip
              effect="dark"
              content="这是选择不可见学员的提示文案哦~"
              placement="top-start"
              >
                <i class="el-icon-question"></i>
            </el-tooltip>
        </el-form-item>

        <div class="walk-title">其他设置</div>
        <!-- 权重 -->
        <el-form-item
          label="设置权重"
          class="limit-width"
          >
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              :min="1" :max="1000000"
              class="click-item quanzhong"
              style="width: 240px;"
              :controls="false" />
            <el-tooltip
              effect="dark"
              content="这是权重的提示文案哦~"
              placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
        </el-form-item>

        <!-- 是否上线 -->
        <el-form-item label="是否上线">
          <el-radio v-model="form.online" :label="1">上线</el-radio>
          <el-radio v-model="form.online" :label="0">下线</el-radio>
        </el-form-item>

        <!-- 确认提交 -->
        <el-form-item>
          <el-button type="primary" class="click-item" @click="checkSubmit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
        </el-form-item>
    </el-form>
    <modal-dialog
      v-model="models.show"
      :title="models.title"
      :width="models.width"
      :min-height="models.minHeight"
      :show-close="models.showClose"
      :type="models.type"
      :confirm-text="models.confirmText"
      @confirm="confirm"
      >
        <div slot="title">
          <h3 class="dialog-title">{{models.title}}</h3>
        </div>
        <div slot="customize-html">
          <div class="customize-html-content">
            <!-- 选择分类 -start -->
            <div class="course-type-list" v-if="models.currentModalName === 'courseType'">
              <el-radio
                v-model="selectedModal.courseType"
                :label="courseItem.value"
                v-for="(courseItem, courseIndex) in courseTypeList"
                :key="courseIndex">
                  {{courseItem.label}}
                </el-radio>
              <el-popover
                placement="bottom"
                width="280"
                trigger="click"
                :popper-class="'course-popper'"
                v-model="showCreateCourseTypeBox">
                <div id="create-box">
                  <header class="create-type-header">新建分类</header>
                  <main class="create-type-main">
                    <el-input v-model="courseType" placeholder="分类名称最多10个字"></el-input>
                  </main>
                  <footer class="create-type-footer">
                    <el-button @click="showCreateCourseTypeBox = false">取消</el-button>
                    <el-button type="primary" @click="addCourseType">确定</el-button>
                  </footer>
                </div>
                <span slot="reference" class="add-type"><i class="el-icon-plus"></i> 新建分类</span>
              </el-popover>
              <p class="tips">如果需要对分类进行修改，请点击<a class="set" @click="setType">【分类设置】</a>中进行修改；如无权限，请联系管理员修改。</p>
            </div>
            <!-- 选择分类 -end -->
            <!-- 组织-start -->
            <div class="organizations-type-list" v-if="models.currentModalName === 'organizations'">
              <el-checkbox-group v-model="selectedModal.organizations">
                <el-checkbox
                  :label="organizationsItem.label"
                  v-for="(organizationsItem, organizationsIndex) in organizationsList"
                  :key="organizationsIndex" />
              </el-checkbox-group>
              <p class="tips">如果需要对部门组织进行修改，请点击左侧的<a class="set" @click="setType">【组织】</a>进行修改；如无权限，请联系管理员修改。</p>
            </div>
            <!-- 组织-end -->
            <!-- 必修学员-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'menberCompulsory'">
              <div class="search-bar">
                <input type="text" name="" class="search" placeholder="请输入搜索名称">
                <span><i class="el-icon-search"></i></span>
              </div>
              <div class="group-list">
                <el-button size="large" v-for="(organizationsItem, organizationsIndex) in organizationsList" :key="organizationsIndex">
                  {{organizationsItem.label}}
                </el-button>
              </div>
              <div class="menber-list">
                <el-checkbox-group v-model="selectedModal.organizations">
                  <el-checkbox
                    :label="organizationsItem.label"
                    v-for="(organizationsItem, organizationsIndex) in organizationsList"
                    :key="organizationsIndex" />
                </el-checkbox-group>
              </div>
            </div>
            <!-- 必修学员-end -->
            <!-- 选择导师-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'tutor'">
              <div class="search-bar">
                <input type="text" name="" class="search" placeholder="请输入搜索名称">
                <span><i class="el-icon-search"></i></span>
              </div>
              <div class="group-list">
                <el-button size="large" v-for="(organizationsItem, organizationsIndex) in organizationsList" :key="organizationsIndex">
                  {{organizationsItem.label}}
                </el-button>
              </div>
              <div class="menber-list">
                <el-checkbox-group v-model="selectedModal.organizations">
                  <el-checkbox
                    :label="organizationsItem.label"
                    v-for="(organizationsItem, organizationsIndex) in organizationsList"
                    :key="organizationsIndex" />
                </el-checkbox-group>
              </div>
            </div>
            <!-- 选择导师-end -->
            <!-- 选择不可见学员-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'menberInvisible'">
              <div class="search-bar">
                <input type="text" name="" class="search" placeholder="请输入搜索名称">
                <span><i class="el-icon-search"></i></span>
              </div>
              <div class="group-list">
                <el-button size="large" v-for="(organizationsItem, organizationsIndex) in organizationsList" :key="organizationsIndex">
                  {{organizationsItem.label}}
                </el-button>
              </div>
              <div class="menber-list">
                <el-checkbox-group v-model="selectedModal.organizations">
                  <el-checkbox
                    :label="organizationsItem.label"
                    v-for="(organizationsItem, organizationsIndex) in organizationsList"
                    :key="organizationsIndex" />
                </el-checkbox-group>
              </div>
            </div>
            <!-- 选择不可见学员-end -->
          </div>
        </div>
    </modal-dialog>
    <div class="cropper-alert-mask" :class="{show: flag.imgHasLoad}">
      <div class="cropper-alert" :class="{show: flag.imgHasLoad}">
        <i class="el-icon-circle-close" @click="flag.imgHasLoad=false"></i>
        <div class="cropper">
          <div class="cropper-box" id="cropperBox">
            <img id="uploadPreview" style="width:100px;height:100px;"/>
          </div>
          <div class="cropper-res-wrap">
            <div class="cropper-res" id="cropperRes">
              <img style="width:100px;height:100px;"/>
            </div>
          </div>
        </div>
        <div class="cropper-btns-wrap">
          <button id="cropper-btn" @click="finishCropImage" :disabled="flag.btnTips.disable">{{ flag.btnTips.value }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import coursePost from './index'
export default coursePost
</script>
<style lang="scss">
@import './index.scss'
</style>