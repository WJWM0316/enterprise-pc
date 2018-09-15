<template>
<div id="broadcast-post">
  <el-breadcrumb separator=">" class="zike-breadcrumb">
    <el-breadcrumb-item :to="{ name: 'course' }">直播管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name === 'broadcastPost' ? '新建直播' : '编辑直播'}}</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    label-width="160px"
    label-suffix="："
    >

      <div class="walk-title">直播基础信息</div>

      <!-- 直播名称 -->
      <el-form-item
        label="直播名称"
        prop="name"
        class="limit-width"
        >
          <el-input v-model="form.name" :maxlength="30" style="width: 380px;" />
      </el-form-item>
      
      <!-- 直播分类 -->
      <el-form-item
        label="直播分类"
        prop="owner_uid"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.owner_uid.show">
            已选择：<span @click="removeSingleChecked('owner_uid')">{{form.owner_uid.tem.realname}}<i class="el-icon-close"></i></span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('owner_uid')"
            :class="{'zike-btn-selected': form.owner_uid.show}">
              {{form.owner_uid.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>
      
      <!-- 直播导师 -->
      <el-form-item
        label="直播导师"
        prop="members"
        class="limit-width"
        > 
          <div class="selected-item" v-show="form.members.show">
            已选择：
            <span
              @click="removeMultipleCheck('members', mIndex)"
              :key="mIndex"
              v-for="(mItem, mIndex) in form.members.tem">
                {{ mItem }}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('members')"
            :class="{'zike-btn-selected': form.members.show}">
              {{form.members.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>
      
      <!-- 直播管理员 -->
      <el-form-item
        label="直播管理员"
        prop="owner_uid"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.owner_uid.show">
            已选择：<span @click="removeSingleChecked('owner_uid')">{{form.owner_uid.tem.realname}}<i class="el-icon-close"></i></span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            @click="openModal('owner_uid')"
            :class="{'zike-btn-selected': form.owner_uid.show}">
              {{form.owner_uid.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>

      <!-- 所属组织 -->
      <el-form-item
        label="所属组织"
        prop="organizations"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.organizations.show">
            已选择：
            <span
              @click="removeMultipleCheck('organizations', oIndex)"
              :key="oIndex"
              v-for="(oItem, oIndex) in form.organizations.tem">
                {{oItem}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.organizations.show}"
            @click="openModal('organizations')">
              {{form.organizations.show ? '重新选择' : '点击选择'}}
          </el-button>
          <el-popover
            placement="top-start"
            ref="organizations"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          </el-popover>
          <i class="el-icon-question" v-popover:organizations></i>
      </el-form-item>

      <div class="walk-title">直播详细信息</div>

      <!-- 直播封面 -->
      <el-form-item
        label="直播封面"
        prop="classification"
        class="limit-width"
        >
        <div class="upload-error-tips upload-error-tips-show" v-if="form.cover_img_id.showError">
          <div class="tips">
            <p><i class="el-icon-error"></i></p>
            <p>上传失败</p>
          </div>
        </div>
        <div class="upload-image click-item" role="button" @click="onSelectFile" :class="{'zike-btn-selected': form.cover_img_id.tem}">
          <i  class="el-icon-upload"></i> {{form.cover_img_id.tem ? '重新上传' : '上传封面'}}
          <input type="file" id="uplaod-file" ref="hiddenFile" name="file" @change="onFileChange" style="display: none;" />
        </div>
        <div class="img-box" v-if="form.cover_img_id.tem">
          <img :src="form.cover_img_id.tem" class="upload-cover">
        </div>
        <div class="upload-image-tips">建议尺寸160X160px ，JPG、PNG格式，图片小于5M</div>
      </el-form-item>
      
      <el-form-item
        label="直播简介"
        prop="content"
        >
          <editor
            class="editor"
            :content="ContentEditor.content"
            v-model="form.content"
            :path="ContentEditor.path"
            :height="ContentEditor.height"
            @blur="handleContentEditorBlur" />
      </el-form-item>
      
      <!-- 参与直播学员 -->
      <el-form-item
        label="参与直播学员"
        prop="organizations"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.hits.show">
            <span
              @click="removeMultipleCheck('hits', hIndex)"
              v-for="(hItem, hIndex) in form.hits.tem"
              :key="hIndex">
                {{hItem}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.hits.show}"
            @click="openModal('hits')">
              {{form.hits.show ? '重新选择' : '点击选择'}}
          </el-button>
          <el-popover
            placement="top-start"
            ref="hits"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          </el-popover>
          <i class="el-icon-question" v-popover:hits></i>
      </el-form-item>

      <!-- 对这些人不可见 -->
      <el-form-item
        label="对这些人不可见"
        prop="organizations"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.hits.show">
            <span
              @click="removeMultipleCheck('hits', hIndex)"
              v-for="(hItem, hIndex) in form.hits.tem"
              :key="hIndex">
                {{hItem}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.hits.show}"
            @click="openModal('hits')">
              {{form.hits.show ? '重新选择' : '点击选择'}}
          </el-button>
          <el-popover
            placement="top-start"
            ref="hits1"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          </el-popover>
          <i class="el-icon-question" v-popover:hits1></i>
      </el-form-item>
      <div class="walk-title">其他设置</div>

      <!-- 设置权重 -->
      <el-form-item
        label="设置权重"
        class="limit-width"
        >
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="1" :max="1000000"
            class="click-item quanzhong"
            style="width: 240px"
            :controls="false" />
           <el-popover
            placement="top-start"
            ref="sort"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          </el-popover>
          <i class="el-icon-question" v-popover:sort></i>
      </el-form-item>

      <!-- 是否上线 -->
      <el-form-item label="是否上线">
        <el-radio v-model="form.status" :label="1">上线</el-radio>
        <el-radio v-model="form.status" :label="0">下线</el-radio>
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
import WorkZonePost from './index'
export default WorkZonePost
</script>
<style lang="scss">
@import './index.scss'
</style>