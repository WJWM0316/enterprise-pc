<template>
  <section id="tutor">
    <div class="page-position">导师管理</div>

    <div class="tutor-tab-box">
      <div :class="{active: tutorType === 'inner'}" @click="select('inner')">内部导师</div>
      <div :class="{active: tutorType === 'outer'}" @click="select('outer')">外部导师</div>
    </div>
    
    <div class="banner" v-if="tutorType === 'outer'"></div>
<!--     <el-row class="header">
      <el-col :span="12" class="search-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="pagination.name"
          placeholder="请输入导师名称或关键字" />
      </el-col>
      <el-col :span="12" class="action-zone">
        <el-button type="primary" class="click-item" @click="openMadal" v-if="tutorType === 'outer'">添加外部导师</el-button>
      </el-col>
    </el-row> -->
    <div class="header">
      <div class="list-total">
        共<strong>{{form.total}}</strong>人
      </div>
      <div class="action-zone">
        <search-bar
          width="400px"
          @search="handleSearch"
          v-model="form.name"
          placeholder="请输入导师名称或关键字" />
          <el-button type="primary" class="click-item" @click="openMadal" v-if="tutorType === 'outer'">添加外部导师</el-button>
      </div>
    </div>
    <table-list
    :list="form.list"
    :fields="tutorType === 'inner'?innerFields:outerFields"
    :total="form.total"
    :page="form.page"
    >
      <template slot-scope="props" slot="columns">
        <!-- 操作行数据 -->

        <div class="btn-container" v-if="props.scope.column.property === 'actions'">
          <el-button type="text" :disabled="props.scope.row.isDeleted === 1 ? true : false" @click="showDeleteHint(props.scope.row)">移除导师</el-button>
        </div>
        <!-- 重新定义课程名这一列的显示 -->
        <div v-else-if="props.scope.column.property === 'realname'" class="flex-box">
          <div class="img-box" @click="viewMenberInfo(props.scope.row.id)" >
            <el-popover
              ref="popoverCover"
              placement="right"
              width="400">
              <i class="u-image auto"><img :src="props.scope.row.avatar.smallUrl"></i>
            </el-popover>
            <div class="cover-wrapper">
              <i class="cover u-image auto radius" v-popover:popoverCover>
                <img style="width: 48px;border-radius: 50%; " :src="props.scope.row.avatar.smallUrl">
              </i>
            </div>
          </div>
          <div class="content">
            <div>
                <div class="" style="color:rgba(64,128,173,1);cursor:pointer;" @click="viewMenberInfo(props.scope.row.id)"> {{ props.scope.row.realname}} </div>

                <div class="tutor-name " v-if="tutorType==='inner'">
                  <div v-if="props.scope.row.group&&props.scope.row.group[0]">
                    {{ props.scope.row.group[0].groupName}}
                  </div>
                </div>
                <div class="tutor-name " v-else  >
                  <div v-if="props.scope.row.title&&props.scope.row.title[0]">
                    {{ props.scope.row.title[0]}}
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="toUser" v-else-if="props.scope.column.property === 'communityCount'" @click="viewMenberInfo(props.scope.row.id,'course')">
          {{props.scope.row.communityCount}}
        </div>     
        <div class="toUser" v-else-if="props.scope.column.property === 'liveCount'" @click="viewMenberInfo(props.scope.row.id,'live')">
          {{props.scope.row.liveCount}}
        </div>
        <div v-else-if="props.scope.column.property === 'createdAt'">
          {{props.scope.row.createdAt.slice(0, 16)}}
        </div>    
        <!-- 其他列按后端给回的字段显示 -->
        <template v-else>{{props.scope.row[props.scope.column.property]}}</template>
      </template>
    </table-list>
    <modal-dialog
      headType= '1'
      v-model="models.show"
      :title="models.title"
      :show-close="models.showClose"
      :confirm-text="models.confirmText"
      :type="models.type"
      :width="models.width"
      :min-height="models.minHeight"
      :isHideBtn="models.isHideBtn"
      @confirm="confirm"
      @cancel="cancel"
      >
        <div slot="title">
          <h3 class="dialog-title">
            {{models.title}} 
          </h3>
        </div>
        <div slot="customize-html" style="margin-left: 16px;margin-top: 20px;">
          <div class="customize-html-content" :class="{'error':hintTxt.length>0}">
            <search-bar
              class="mode_input"
              width="464px"
              @search="searchTea"
              v-model="searchData.value"
              placeholder="请输入要添加的外部导师手机号" />
            <div class="fetch-result" v-show="searchData.type">
            <p class="model_hint" v-show="hintTxt">{{hintTxt}}</p>

            <el-collapse-transition v-if="models.isHideBtn==='2'">
              <div class="transition-flex-box" v-if="searchData.list&&searchData.list.realname">
                <div class="img-box">
                  <img :src="searchData.list.avatar.middleUrl" />
                </div>
                <div class="text-inner-content">
                  <p class="user-name" v-if="searchData.list.realname">{{searchData.list.realname}}</p>
                  <p class="user-degree" v-if="searchData.list.title">{{searchData.list.title[0]}}</p>
                </div>
                <div class="phone-box">
                  {{searchData.list.mobile}}
                </div>
              </div>
              <div class="transition-flex-box tutor-nodata" v-else>
                Ops，暂时没有找到这个导师，点击右下方按钮，添加新的外部导师吧
              </div>
            </el-collapse-transition>
            </div>
          </div>
        </div>
    </modal-dialog>

    <modal-dialog
      headType = '3'
      bottomType = '2'
      v-model="delateModels.show"
      :title="delateModels.title"
      :show-close="delateModels.showClose"
      :confirm-text="delateModels.confirmText"
      :type="delateModels.type"
      :width="delateModels.width"
      :min-height="delateModels.minHeight"
      :isHideBtn="delateModels.isHideBtn"
      @confirm="deleteTea"
      @cancel="cancel"
      >
        <div slot="title">
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
  </section>
</template>

<script>
import tutorList from './index'
export default tutorList
</script>

<style lang="scss">
@import "~COLORS/variables";
#tutor {
  background: #fff;
  .action-zone {
    float: right;
    display: inline-block;
    .zike-common-search-bar {
      display: inline-block;
      vertical-align: middle;
      margin-right: 16px;
    }
    .el-button--primary{
      display: inline-block;
      vertical-align: middle;
    }
  }
  .header {
    margin: 36px 0 24px 0;
  }
  .list-total {
    font-size:16px;
    font-weight:400;
    color:rgba(53,64,72,1);
    line-height: 40px;
    vertical-align: middle;
    display: inline-block;
    strong {
      color: #D7AB70;
      font-weight: 500;
      margin: 0 2px;
    }
  }
  .tutor-name {
    color: #929292;
  }
  .click-item {
    color: #354048;
    margin-right: 8px;
  }
  .tutor-tab-box {
    border-bottom: 1px solid #f8f8f8;
    position: relative;
    > div {
      transition: all ease .4s;
      color: #929292;
      position: relative;
      height: 46px;
      line-height: 46px;
      display: inline-block;
      margin-right: 50px;
      cursor: pointer;
      font-size: 14px;
      &:before{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        background: #D7AB70;
        content: '';
        display: block;
        width: 100%;
        opacity: 0;
        visibility: hidden;
      };
    }
    .active {
      color: #354048;
      font-weight: 500;
      &:before{
        opacity: 1;
        visibility: visible;
      };
    }
  }
  .banner {
    height:136px;
    background: rgba(0,0,0,.1);
    margin: 30px 0;
    display: none;
  }
  .zike-common-search-bar {
    //margin-top: 30px;
  }
  .transition-flex-box {
    height: 48px;
    border-radius: 4px;
    display: flex;
    line-height: 48px;
    width: 464px;
    font-size:14px;
    font-weight:400;
    color:rgba(90,94,102,1);
    margin-bottom: 50px;
    .img-box {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(0,0,0,.1);
      margin-right: 16px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .text-inner-content{
      flex-grow: 1;
    }
    .phone-box {
      font-size:14px;
      color:rgba(53,64,72,1);
    }
    p {
      margin: 0;
      line-height: 1;
    }
    .user-name {
      font-size:14px;
      font-weight:400;
      color:rgba(53,64,72,1);
      margin-top: 8px;
    }
    .user-degree {
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-top: 5px;
    }
  }
  .fetch-result {
    margin-top: 24px;
  }
  .tutor-nodata {
    background: #fff;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    height: 24px;
    line-height: 24px;
    position: relative;
    &:before{
      width: 0;
      height: 0;
      border-color: red;
      position: absolute;
      top: -16px;
      left: 40px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #ebeef5 transparent;
      display: block;
      content: '';
    };
    &:after{
      width: 0;
      height: 0;
      border-color: red;
      position: absolute;
      top: -15px;
      left: 40px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
      display: block;
      content: '';
    };
  }
  .cell {
    overflow: inherit;
  }

  .customize-html-content {
    &.error {
      .zike-common-search-bar {
        border: 1px solid #ff3434;
      }
    }
  }
}

.el-radio {
  margin: 10px 32px 10px 0px;
  &.is-checked {
    .el-radio__inner {
      border-color: rgba(215,171,112,1);
      background:rgba(215,171,112,1);
    }
    .el-radio__label {
      color:rgba(215,171,112,1);
    }
  }

  color:rgba(188,188,188,1);
}

.mode_input {
  position: relative;
  
}
.model_hint {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,52,52,1);
  margin-left: 20px;
  position: relative;
  margin-left:0;
  margin-top: -12px;
}

.dialog_p {
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:22px;
  }

.radius {
  img {
  border-radius: 50%;
    
  }
}
.toUser {
  font-size:14px;
  font-family:HelveticaNeue;
  color:rgba(64,128,173,1);
  cursor: pointer;
  font-weight: 300;
}
</style>
