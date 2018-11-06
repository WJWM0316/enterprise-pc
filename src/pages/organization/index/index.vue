<template>
  <div id="organization">
    <div class="page-position">组织管理</div>
    <div class="group-type-list">
        <el-row class="organization-base " style="margin-top: 14px">
         <el-col :span="24" class="right-content">
          <el-button type="primary" class="click-item button_base margin_0" @click="todoAction('set')">分组管理</el-button>
          <el-button style="margin-left: 20px" type="primary" class="click-item button_base margin_0" @click="todoAction('addGroup')">新建分组</el-button>
         </el-col>
        </el-row>
        <el-button 
              class="group_btn"
              size="large"
              :class="{'btn-active-selected': groupItem.active}"
              v-for="(groupItem, groupIndex) in groupList"
              :key="groupIndex"
              @click="selectGroup(groupItem)">
            {{groupItem.groupName}}
        </el-button>
        <div class="border"></div>
    </div>

    <el-row class="organization-base">
      <el-col :span="12" class="left-content">
        <h2 class="">
          全部成员<span class="number">({{courseList.total}}人)</span>
        </h2>
      </el-col>
      <el-col :span="12" class="right-content">
        
        <el-button type="primary" class="click-item button_base" @click="todoAction('upload')">批量导入成员</el-button>

        <el-button style="margin-left: 20px" type="primary" class="click-item button_base" @click="todoAction('addMember')">添加新成员</el-button>
      </el-col>
    </el-row>
  

  
  <div class="dropdown-select">
        
    <el-select v-model="rolevalue" placeholder="选择权限" @change="changeRule">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
      </el-option>
    </el-select>
  </div>
    <table-list
      :list="courseList.list"
      :fields="fields"
      :total="courseList.total"
      >
      <template scope="props" slot="columns">

        <!-- 操作行数据 -->
        <div class="btn-container flex-box" v-if="props.scope.column.property === 'groupName'" >
          <div class="img-box" @click="viewMenberInfo(props.scope.row.uid)" style="cursor:pointer;">
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.avatar.smallUrl"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto radius" v-popover:popoverCover>
                <img style="width: 34px;border-radius: 50%; " :src="props.scope.row.avatar.smallUrl">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="limit-row-num-2" style="color:rgba(64,128,173,1);cursor:pointer;" @click="viewMenberInfo(props.scope.row.uid)"> {{ props.scope.row.realname}} </div>
                <div class="tutor-name limit-row-num-1" >
                  <span v-if="props.scope.row.group[0]" >{{ props.scope.row.group[0].groupName}} </span>
                </div>
            </div>
          </div>
        </div>
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{typeof props.scope.row[props.scope.column.property] === 'string'? (props.scope.row[props.scope.column.property].length>0?props.scope.row[props.scope.column.property]:'-' ): props.scope.row[props.scope.column.property]}}
        </template>
      </template>
    </table-list>
    <modal-dialog
      headType= '2'
      v-model="models.show"
      :title="models.title"
      :show-close="models.showClose"
      :confirm-text="models.confirmText"
      :type="models.type"
      :width="models.width"
      :isHideBtn="models.isHideBtn"
      @confirm="confirm"
      @cancel="cancel"
      class="modal_organ"
      >
        <div slot="title">
          <h3 class="dialog-title">
            {{models.title}} 
          </h3>
        </div>
        <div slot="customize-html" style="margin-top: 20px;">
          <div class="customize-html-content">
              <p class="pop_cont" style="font-size:  12px;">批量导入成员表格模版<a style="margin-left: 20px;" :href="downUrl" >下载</a></p>
              <h4 class="pop_tit">第二步：上传填写好的表格文件</h4>
              <div class="pop_cont">
                <!--  -->
                <el-upload
                  class="upload-demo"
                  ref="file"
                  multiple
                  name="file"
                  :action="fileUpload.action"
                  :on-remove="handleRemove"
                  :on-error="handleFileError"
                  :accept="fileUpload.accept"
                  :data="fileUpload.params"
                  :on-success="handleFileSuccess"
                  :before-upload="beforeFileUpload"
                  :on-progress="uploadFileProcess"
                  :on-exceed="handleExceed"
                  :limit="1">
                  <el-button size="small" type="primary" :class="{
                    'loading': fileUpload.btnTxt==='正在上传..',
                    'err': fileUpload.btnTxt==='导入失败'}">{{fileUpload.btnTxt}}</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传文件，且不超过500kb</div> -->
                </el-upload>
              </div>
          </div>
        </div>
    </modal-dialog>
  </div>
</template>

<style lang="scss">
@import "~COLORS/variables";
.modal_organ {
  .pop_tit {
    font-size: 14px;
    color: #354048;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    position: relative;
  }
  .pop_cont {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .upload-demo {
    margin-top: 20px;
    .loading {
      background: #cccccc;
      color: #666666;
      border-color: #cccccc;
    }
    .err {
      background: rgba(255, 52, 52, 0.05);
      border: 1px solid #ff3434;
      color: #ff3434 !important;
    }
  }
}
.page-position {
  margin-bottom: 32px;
}

#organization {
  background: #fff;
  .organization-base {
    line-height: 35px;
    margin-bottom: 25px;
    h1{
      margin: 0;
      padding: 0;
      float: left;
      line-height: 40px;
      vertical-align: middle;
      font-size:30px;
      font-weight:500;
      color:rgba(53,64,72,1);
    }
    h2 {
      margin: 0;
      line-height: 40px;
    }
    .number {
      font-size:16px;
      font-weight:400;
      color:rgba(146,146,146,1);
      margin-left: 12px;
    }
    .left-content {
      text-align: left;
    }
    .right-content {
      text-align: right;
    }
    .click-item {
      color:rgba(53,64,72,1);
    }
  }
  .group-type-list {
    .el-button{
      //width: 128px;
      padding: 10px 20px;
      margin: 0px 16px 16px 0px;
      &.margin_0 {
        margin-right: 0;
      }
    }
    .border {
      width:100%;
      height:3px;
      border-bottom:1px dashed rgba(235,238,245,1);
      margin-bottom: 30px;
    }
    .group_btn {
      width: auto;
      padding: 10px 36px;
    }
  }
  .dropdown-select {
    margin: 24px 0 16px 0;
  }
  .cell {
    overflow: inherit;
  }

  .btn-active-selected {
    background:rgba(255,226,102,0.2);
    border-radius:4px;
    font-size:14px;
    font-weight:400;
    color:#D7AB70;
    border-color: #f7e9c9;
  }
  

  .button_base {
    width:128px;
    height:40px;
    background:rgba(255,226,102,1);
  }
}
.el-scrollbar {
  }
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: rgba(255,226,102,0.12);
    font-size:14px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(215,171,112,1);
}

.el-select-dropdown__item.selected {
  font-weight: 400;
  color: rgba(215,171,112,1);
}
</style>

<script>
import memberList from './index'
export default memberList
</script>

