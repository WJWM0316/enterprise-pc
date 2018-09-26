<template>
  <div id="user-post">
  	<div class="page-position">编辑成员</div>
  	<el-form :model="form" :rules="rules" ref="form" label-width="100px">
  		<el-form-item label="姓名" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="头像" prop="name">
		    <div class="upload-error-tips upload-error-tips-show" v-if="form.icon.showError">
          <div class="tips">
            <p><i class="el-icon-error"></i></p>
            <p>上传失败</p>
          </div>
        </div>
        <div class="upload-image click-item" role="button" @click="onSelectFile" :class="{'zike-btn-selected': form.icon.tem}">
          <input type="file" id="uplaod-file" ref="hiddenFile" name="file" @change="onFileChange" style="display: none;" />
          <img :src="avatarUrl" class="upload-cover">
          <div class="upload-cover-mask"></div>
        </div>
		  </el-form-item>
		  <el-form-item label="所属部门" prop="region">
		    <el-select v-model="form.region" placeholder="请选择活动区域">
		      <el-option label="区域一" value="shanghai"></el-option>
		      <el-option label="区域二" value="beijing"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="职位" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="设置密码" prop="name">
		    <el-button type="primary">点击修改</el-button>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="微信号" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
      <!-- 所属组织 -->
      <el-form-item
        label="所属组织"
        prop="check_group_id"
        class="limit-width"
        >
          <div class="selected-item" v-show="form.group_id.show">
            已选择：
            <span
              @click="removeMultipleCheck('group_id', groupIndex)"
              :key="groupIndex"
              v-for="(groupItem, groupIndex) in form.group_id.tem">
                {{groupItem.groupName}}<i class="el-icon-close"></i>
            </span>
          </div>
          <el-button
            class="click-item"
            type="primary"
            :class="{'zike-btn-selected': form.group_id.show}"
            @click="openModal('group_id')">
              {{form.group_id.show ? '重新选择' : '点击选择'}}
          </el-button>
      </el-form-item>
		  <el-form-item label="微信号" prop="name">
		    <el-button type="primary">提交</el-button>
		    <el-button>删除该账号</el-button>
		  </el-form-item>
  	</el-form>
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
            <!-- 课程分类-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'category_id'">
              <div class="group-list">
                <el-button
                  size="large"
                  v-for="(cateItem, cateIndex) in temcategoryList"
                  :key="cateIndex"
                  :class="{'zike-btn-active-selected': cateItem.active}"
                  @click="selectCategory(cateItem, 'categoryList')">
                    {{cateItem.categoryName}}
                </el-button>
                <el-popover
                  placement="top"
                  width="304"
                  trigger="click"
                  popper-class="my-popover0001"
                  v-model="categoryModal.show">
                  <div class="header">新建分类</div>
                  <div class="main">
                    <el-input v-model="categoryModal.name" placeholder="请输入分类名，限制10个字以内" :maxlength="10"></el-input>
                  </div>
                  <div class="footer-btn-box">
                    <el-button size="mini" @click="categoryModal.show = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="getCategory" :loading="categoryModal.loading">确定</el-button>
                  </div>
                  <el-button size="large" slot="reference">
                    + &nbsp;新建分类
                  </el-button>
                </el-popover>
              </div>
              <div class="tips">
                如果需要对部门组织进行修改，请点击<span>【分类设置】</span>进行修改；如无权限，请联系管理员修改。
              </div>
            </div>
            <!-- 课程分类-end -->
            <!-- 选择课程导师-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'master_uid'">
              <div style="margin: 30px 0;">
                <search-bar
                  width="464px"
                  @search="handleSearch"
                  v-model="ownerUidName"
                  placeholder="请输入导师名称" />
              </div>
              <div class="group-list">
                <el-button size="large" @click="tutorClassification('master_uid', 'outer')">外部导师</el-button>
                <el-button
                  size="large"
                  v-for="(groupItem, groupIndex) in groupLists"
                  :key="groupIndex"
                  :class="{'zike-btn-active-selected': groupItem.active}"
                  @click="tutorClassification('master_uid', groupItem)">
                    {{groupItem.groupName}}
                </el-button>
              </div>
              <div class="menber-list">
                <el-radio v-model="form.master_uid.value"
                  :label="tutorItem.uid"
                  :key="tutorIndex"
                  @change="singleSelection('master_uid', tutorItem)"
                  v-for="(tutorItem, tutorIndex) in temTutorLists">
                    {{tutorItem.realname}}
                </el-radio>
              </div>
            </div>
            <!-- 选择课程成员-end -->
            <!-- 组织-start -->
            <div class="groupList-type-list" v-if="models.currentModalName === 'group_id'">
              <el-button
                size="large"
                v-for="(groupItem, groupIndex) in tem_groupLists"
                 @click="seleteGroup(groupItem, 'groupLists')"
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
            <!-- 必修学员-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'members'">
              <div style="margin: 30px 0;">
                <search-bar
                  width="464px"
                  @search="handleSearch"
                  v-model="ownerUidName"
                  placeholder="请输入导师名称" />
              </div>
              <div class="group-list">
                <el-button size="large" @click="memberClassification('uid', 'all')">所有人</el-button>
                <el-button
                  size="large"
                  v-for="(groupItem, groupIndex) in groupLists"
                  :key="groupIndex"
                  @click="filterWorkZoneMenber('groupList', groupItem.groupId)">
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
            <!-- 必修学员-end -->
             <!-- 不可见学员-start -->
            <div class="menber-compulsory-type-list" v-if="models.currentModalName === 'hits'">
              <div style="margin: 30px 0;">
                <search-bar
                  width="464px"
                  @search="handleSearch"
                  v-model="ownerUidName"
                  placeholder="请输入导师名称" />
              </div>
              <div class="group-list">
                <el-button size="large" @click="memberClassification('uid', 'all')">所有人</el-button>
                <el-button
                  size="large"
                  v-for="(groupItem, groupIndex) in groupLists"
                  :key="groupIndex"
                  @click="filterWorkZoneMenber('groupList', groupItem.groupId)">
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
            <!-- 不可见学员-end -->
          </div>
        </div>
    </modal-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import defaultAvatar from 'IMAGES/img_normal_head.png';
import ModalDialog from 'COMPONENTS/dialog/index.vue'

@Component({
  components: {
    ModalDialog
  },
	computed: {
    avatarUrl() {
      return this.form.icon.tem || defaultAvatar
    }
  }
})
export default class pageUser extends Vue {
	form = {
		name: '',
		icon: {
      value: '',
      tem: '',
      showError: false
    },
    group_id: {
      tem: [],
      value: '',
      show: false
    }
	}
	rules = {
		name: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
      { required: true, message: '请选择所属部门', trigger: 'change' }
    ]
	}

	// 初始化裁剪对象
  cropper = null
  // 裁剪设置
  flag = {
    imgHasLoad: false,
    cropperHasInit: false,
    btnTips: {
      disable: false,
      value: '裁剪完成，立即上传'
    }
  }

  // 确认信息弹窗
  models = {
    show: false,
    title: '提示',
    showClose: true,
    confirmText: '提交',
    currentModalName: '',
    type: 'confirm'
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   打开弹窗model
   */
  openModal(type) {
    switch(type) {
      case 'category_id':
        this.models.title = '选择分类'
        break
      case 'master_uid':
        this.models.title = '选择导师'
        break
      case 'group_id':
        this.models.title = '选择组织'
        break
      case 'members':
        this.models.title = '参与课程学员'
        break
      case 'hits':
        this.models.title = '对这些人不可见'
        break
      default:
        break
    }
    this.models.currentModalName = type
    this.models.width = '860px'
    this.models.minHeight = '284px'
    this.temMenberLists = [...this.menberLists]
    this.models.show = true
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗确定按钮
   * @return   {[type]}   [description]
   */
  confirm() {
    const type = this.models.currentModalName
    this.form[type].show = this.form[type].value ? true : false
    this.models.show = false
    this.ownerUidName = ''
    this.form[`check_${type}`] = this.form[type].value
    this.$refs.form.validateField(`check_${type}`)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   弹窗关闭按钮
   */
  cancel() {
    const type = this.models.currentModalName
    // this.form[type].value = ''
    // this.form[type].tem = []
    this.models.show = false
    this.ownerUidName = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   移除多选
   */
  removeMultipleCheck(type, index) {
    const value = this.form[type].value.split(',').splice(index, 1)
    this.form[type].tem.splice(index, 1)
    this.form[type].value = value.join(',')
    this.form[type].show = this.form[type].tem <= 0 ? false : true
  }

	/**
   * 用户点击头像
   */
  onSelectFile() {
    const el = this.$refs.hiddenFile
    if (!el) return
    el.click()
    el.value = ''
  }

  /**
   * 用户选择好文件了
   * @param  {Event} e  文件改变事件
   */
  onFileChange(e) {
    const files = e.target.files
    const len = files.length
    const fileName = files[0].name
    const ext = this.getFileExt(fileName)
    this.flag.file = files[0]

    // 允许上传文件尺寸上限 1M
    const ALLOW_MAX_SIZE = 1024 * 1024

    // 允许文件格式 jpg\png
    const ALLOW_FILE_TYPE = [
      'png',
      'jpeg',
      'jpg'
    ]

    // 文件数量一定要判断
    if (len > 0) {
      const file = files.item(0)
      if (ALLOW_FILE_TYPE.indexOf(ext) === -1) {
        this.$message.error('选择的文件格式不对~')
      } else if (file.size > ALLOW_MAX_SIZE) {
        this.$message.error('选择的文件太大啦~')
      } else {
        let inputImage = document.querySelector('#uplaod-file')
        let URL = window.URL || window.webkitURL
        let blobURL
        blobURL = URL.createObjectURL(file)
        this.flag.imgHasLoad = true

        if (!this.flag.cropperHasInit) {
          this.loadCropper()
          this.cropper.replace(blobURL)
          return
        }
        this.cropper.reset().replace(blobURL)
        inputImage.value = null
      }
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   加载裁剪工具
   * @return   {[type]}   [description]
   */
  loadCropper() {
    const image = document.querySelector('#cropperBox > img')
    // const preview = document.querySelector('#cropperRes')
    // const previewImage = preview.getElementsByTagName('img').item(0)
    const options = {
      aspectRatio: 1 / 1,
      preview: '#cropperRes'
    }
    this.cropper = new Cropper(image, options)
    this.flag.cropperHasInit = true
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-11
   * @detail   完成裁剪，并输出裁剪结果，然后上传
   * @return   {[type]}   [description]
   */
  finishCropImage() {
    this.flag.btnTips.value = '正在上传，请稍等'
    this.flag.btnTips.disable = true
    const croppedCanvas = this.cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL()
    const blob = this.dataURLtoFile(croppedDataUrl)
    const formData = new FormData()
    formData.append('attach_type', 'img')
    formData.append('img1', blob)
    this.uploadApi(formData)
      .then((res) => {
        const infos = res.data.data[0]
        this.cropper.destroy()
        this.flag.imgHasLoad = false
        this.flag.imgHasLoad = false
        this.flag.btnTips.value = '裁剪完成，立即上传'
        this.flag.btnTips.disable = false
        this.form.icon.value = infos.id
        this.form.icon.tem = infos.url
        this.form.check_icon = infos.id
        this.$refs.form.validateField('check_icon')
      })
      .catch(err => {
        this.$message.error(`${err.msg}~`)
      })
  }

  // dataUrl 转 blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-13
   * @detail   将base64转换成file对象
   * @return   {[type]}            [description]
   */
  dataURLtoFile (dataurl, filename = 'file') {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let suffix = mime.split('/')[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {type: mime})
  }

  // 获取文件后缀名
  getFileExt(filename) {
    const tem = filename.split('.')
    return tem[tem.length-1]
  }
}
</script>
<style lang="scss">
#user-post {
	background: white;
}
#user-post {
  .upload-image {
    cursor: pointer;
    transition: .1s;
		display: inline-block;
		vertical-align: middle;
		width:96px;
		height: 96px;
		border-radius: 50%;
    &:hover{
      .upload-cover-mask{
        opacity: .3;
        visibility: visible;
      }
    };
	}
	.upload-image-tips {
		font-size:12px;
		font-weight:400;
		color:rgba(188,188,188,1);
		line-height:1;
		margin-top: 10px;
	}
	.click-item {
    margin-right: 8px;
    color:rgba(53,64,72,1);
  }
  .btn-done {
  	background: rgba(237,237,237,1);
  	border-color: rgba(237,237,237,1);
  	color:rgba(146,146,146,1);
  }
  .quanzhong {
  	.el-input__inner {
  		text-align: left;
  	}
  }
  .upload-cover {
    width:96px;
    height:96px;
    border-radius:50%;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .upload-cover-mask {
    width:96px;
    height:96px;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: black;
    border-radius:50%;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    transition: all ease .4s;
  }
  .upload-error-tips {
  	width:96px;
		height:96px;
		background:rgba(237,237,237,1);
		border-radius:4px;
		display: inline-block;
		vertical-align: middle;
		margin-right: 16px;
		opacity: 0;
		visibility: 0;
		transition: all ease .4s;
		position: relative;
		.tips {
			position: absolute;
			left: 0;
			top: 50%;
			width: 100%;
			transform: translateY(-50%);
			font-size: 12px;
			color:rgba(146,146,146,1);
		}
		p {
			line-height: 1.5;
			margin: 0;
			text-align: center;
			width: 100%;
		}
  }
  .upload-error-tips-show {
  	opacity: 1;
  	visibility: visible;
  }
}
#user-post {
  .cropper-alert-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 90;
    background: rgba(black, .5);
    visibility: hidden;
    height: 0;
    transition: all .3s ease;
  }
  .cropper-alert-mask.show {
    visibility: visible;
    height: 100%;
  }
  .cropper-alert {
    opacity: 0;
    transition: all .3s ease;
    visibility: hidden;
    transform: scale(2);
    padding: 30px;
    position: fixed;
    z-index: 90;
    top: 50px;
    left: 50%;
    margin-left: -300px;
    background-color: white;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
  .cropper {
    position: relative;
    width: 400px;
    height: 300px;
    padding: 80px 150px;
    background-color: #f8f8f8;
  }
  .cropper-box {
    width: 300px;
    height: 300px;
  }
  .cropper-res-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    padding: 15px;
    background-color: #f8f8f8;
    box-sizing: content-box;
  }
  .cropper-res {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #e1e1e1;
    background-color: white;
  }
  #cropper-btn{
    width: 100%;
    height: 30px;
    background: white;
    border: 1px solid #e1e1e1;
    color: #646464;
  }
  .head-pic {
    width: 80px;
    height: 80px;
    position: relative;
    background: rgba(0,0,0,.1);
    overflow: hidden;
    line-height: 80px;
    text-align: center;
    border-radius: 100%;
    font-size: 20px;
  }
}
</style>