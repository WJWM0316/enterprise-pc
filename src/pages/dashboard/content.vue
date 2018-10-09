<template>
	<div class="left-content">
		<section class="company-infos">
			<h1>{{desktopInfos.company}}</h1>
			<div class="menber-zone">
				<!-- 试用中的状态 -->
				<button class="click-item time-button" v-if="!desktopVerInfo.isOfficial">试用期：{{desktopVerInfo.remainDay}} 天</button>
				<button class="click-item todo-action" @click="openModal" v-if="!desktopVerInfo.isOfficial">{{desktopVerInfo.tip}}</button>

				<!-- 已付费，显示对应版本标识，目前有VIP和SVIP -->
				<button class="time-button" v-if="desktopVerInfo.isOfficial">VIP</button>

				<!-- 离会员有效期还剩30天时，显示剩余天数和【续费】按钮 -->
				<button class="time-button" v-if="desktopVerInfo.isOfficial">VIP,60天后过期</button>
				<button class="todo-action" @click="openModal" v-if="desktopVerInfo.isOfficial">续费</button>
			</div>
			<div class="statistics-flex-box">
				<div>
					<strong>{{desktopStudyInfo.yesterdayStudyPersonCount}}</strong>
					<p>昨日学习人数</p>
					<el-popover
				    placement="top-start"
				    width="200"
				    trigger="hover"
				    content="昨日0时-24时有访问【小灯塔PLUS员工移动端】的用户数">
				    <i class="el-icon-question" slot="reference"></i>
				  </el-popover>
				</div>
				<div>
					<strong>{{desktopStudyInfo.yesterdayStudyTimeCount}}</strong>
					<p>昨日学习时长</p>
					<el-popover
				    placement="top-start"
				    width="200"
				    trigger="hover"
				    content="昨日有访问【员工移动端】用户的昨日访问时长总和">
				    <i class="el-icon-question" slot="reference"></i>
				  </el-popover>
				</div>
				<div>
					<strong>{{desktopStudyInfo.onlineCourseCount}}</strong>
					<p>在线课程数</p>
				</div>
				<div>
					<strong>{{desktopStudyInfo.onlineLiveCount}}</strong>
					<p>在线直播数</p>
				</div>
				<div>
					<strong>{{desktopStudyInfo.onlineJobCircleCount}}</strong>
					<p>在线工作圈</p>
				</div>
			</div>
		</section>
		<section class="actions-flex-box">
			<div @click="routeJump('addMember')">
				<i class="icon-zike icon-add-menber"></i>
				<p>添加成员</p>
			</div>
			<div @click="routeJump('coursePost')">
				<i class="icon-zike icon-add-notice"></i>
				<p>新建课程</p>
			</div>
			<div @click="routeJump('broadcastPost')">
				<i class="icon-zike icon-add-course"></i>
				<p>新建直播</p>
			</div>
			<div @click="routeJump('workZonePost')">
				<i class="icon-zike icon-add-broadcast"></i>
				<p>新建工作圈</p>
			</div>
		</section>
		<section class="notice-flex-box">
			<div>
				<div class="card-header">
					最新课程
				</div>
				<div class="card-content">
					<div class="img-box">
						<img :src="desktopNewestCourseInfo.coverImg" alt="">
					</div>
					<div class="text-content">
						<h2>{{desktopNewestCourseInfo.title}}</h2>
						<p>学习人数：{{desktopNewestCourseInfo.peopleCount}}</p>
						<p>完成打卡：{{desktopNewestCourseInfo.sessionCardCount}}</p>
					</div>
				</div>
			</div>
			<div>
				<div class="card-header">
					最新直播
				</div>
				<div class="card-content">
					<div class="img-box">
						<img :src="desktopNewestLiveInfo.cover.smallUrl" alt="">
					</div>
					<div class="text-content">
						<h2>{{desktopNewestLiveInfo.liveName}}</h2>
						<p>学习人数：{{desktopNewestLiveInfo.peopleCount}}</p>
						<p class="punch" v-if="desktopNewestLiveInfo.status === 1">开始时间：{{desktopNewestLiveInfo.expectedStartTime}}</p>
						<p class="doing" v-if="desktopNewestLiveInfo.status === 2">正在直播</p>
						<p class="end" v-if="desktopNewestLiveInfo.status === 3">直播已结束</p>
					</div>
				</div>
			</div>
		</section>
		<section class="member-dynamics">
			<header class="member-dynamics-header">
				成员动态
				<button class="click-item" @click="reflesh">
					<i class="el-icon-refresh" style="color: #4080AD;"></i>
					有新的动态，点击刷新
				</button>
			</header>
			<ul>
				<li v-for="(memberItem, memberIndex) in memberDynamics" :key="memberIndex" @click="viewMenberInfo(memberItem.uid)">
					<div class="img-box">
						<img :src="memberItem.avatarInfo.smallUrl">
					</div>
					<div class="content">
						<div class="ceil">
							<span class="username">{{memberItem.realname}}</span>
							<span class="degree">{{memberItem.groupName}} | {{memberItem.occupation}}</span>
							<time>{{memberItem.createdAt}}</time>
						</div>
						<div class="floor">
							{{memberItem.content}}
						</div>
					</div>
				</li>
			</ul>
		</section>
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
          <h3 class="dialog-title" v-if="models.title"></h3>
        </div>
        <div slot="customize-html">
          <div class="customize-html-content">
          	<h2 class="dashboard-open-business">开通、续费请联系客服开通</h2>
          	<p class="dashboard-open-business-phone">客服电话：{{desktopInfos.customerServicePhone}}</p>
          </div>
        </div>
    </modal-dialog>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'

@Component({
	methods: {
		...mapActions([
			'showMsg',
			'getUserListsApi',
			'getCompanyInfoApi',
			'getMemberCheckNewDynamicsApi'
		])
	},
	components: {
		ModalDialog
	},
	computed: {
    ...mapGetters([
      'dashboardUserLists',
      'companyInfo',
      'desktopInfos',
      'desktopStudyInfo',
      'desktopNewestCourseInfo',
      'desktopNewestLiveInfo',
      'desktopVerInfo',
      'memberDynamics'
    ])
  }
})
export default class pageDashboard extends Vue {

	// 是否有新的成员动态
	isHaveNew = 0
	// 确认信息弹窗
  models = {
    show: false,
    title: '',
    showClose: true,
    confirmText: '提交',
    type: 'confirm',
    width: '432px',
    minHeight: '90px'
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   modal中的确认按钮
   * @return   {[type]}   [description]
   */
  confirm() {
  	this.models.show = !this.models.show
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   modal中的取消按钮
   * @return   {[type]}   [description]
   */
  cancel() {}
  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   调起【联系客服弹窗】
   * @return   {[type]}   [description]
   */
  openModal() {
  	this.models.show = !this.models.show
  	this.models.type = 'alert'
  	this.models.confirmText = '我知道了'
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   刷新成员动态
   * @return   {[type]}   [description]
   */
  reflesh() {
  	console.log(111)
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   页面跳转
   * @return   {[type]}        [description]
   */
  routeJump(name) {
  	this.$router.push({ name })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   查看个人信息
   * @return   {[type]}        [description]
   */
  viewMenberInfo(id) {
		this.$router.push({ name: 'userInfos', params: { id }})
	}

	mounted() {
		const timer = setInterval(() =>{                    
		  this.getMemberCheckNewDynamicsApi({timestamp: Date.parse(new Date())})
		  		.then(res => {
		  			this.isHaveNew = res.data.data.isHaveNew
		  		})
		}, 1000 * 60 * 5)
		this.$once('hook:beforeDestroy', () => { clearInterval(timer) })
	}
}
</script>
<style lang="scss">
#dashboard {
	.company-infos{
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:2px;
		padding: 40px 30px;
		box-sizing: border-box;
		h1 {
			font-size:30px;
			font-weight:500;
			color:rgba(53,64,72,1);
			line-height:1;
			margin: 0;
			margin-bottom: 12px;
		}
	}
	.click-item {
		display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
    border-color: transparent;
    color: #409eff;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
	}
	.time-button {
		width:91px;
		height:24px;
		background:rgba(53,64,72,1);
		border-radius:12px;
		margin-right: 20px;
		font-size:12px;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:20px;
	}
	.todo-action{
		color: #4080AD;
	}
	.statistics-flex-box{
		display: flex;
		margin-top: 40px;
		overflow: hidden;
		> div {
			flex-grow: 1;
		}
		strong {
			font-size:52px;
			color:rgba(53,64,72,1);
			line-height: 1;
			margin: 0;
			padding: 0;
			display: block;
			font-weight: 500;
		}
		p{
			font-size:14px;
			font-weight:300;
			color:rgba(102,102,102,1);
			line-height: 1;
			display: inline-block;
			margin: 0;
			margin-right: 10px;
		}
		i {
			vertical-align: middle;
			color: rgba(188,188,188,1);
		}
	}
	.actions-flex-box{
		display: flex;
		margin-top: 22px;
		overflow: hidden;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:2px;
		padding: 12px;
		> div {
			flex-grow: 1;
			position: relative;
			box-sizing: border-box;
			padding: 0 30px;
			line-height: 56px;
			&:after{
				content: '';
				display: block;
				height: 100%;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				width: 1px;
				background: rgba(220,220,220,1);
			};
			&:last-child{
				&:after{
					display: none;
				};
			};
		}
		p{
			font-size:16px;
			font-weight:400;
			color:#354048;
			line-height: 1;
			margin: 0;
			padding: 0;
			display: inline-block;
			vertical-align: middle;
		}
		i {
			width: 58px;
			height: 58px;
			background: rgba(0,0,0,.1);
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			margin-right: 10px;
		}
		.icon-add-menber {
			background: url('~IMAGES/pc_home_btn_add@3x.png') no-repeat center center;
			background-size: 100%;
		}
		.icon-add-notice {
			background: url('~IMAGES/pc_home_btn_newclass@3x.png') no-repeat center center;
			background-size: 100%;
		}
		.icon-add-course {
			background: url('~IMAGES/pc_home_btn_newlive@3x.png') no-repeat center center;
			background-size: 100%;
		}
		.icon-add-broadcast {
			background: url('~IMAGES/pc_home_btn_newgroup@3x.png') no-repeat center center;
			background-size: 100%;
		}
	}
	.notice-flex-box{
		display: flex;
		margin-top: 22px;
		overflow: hidden;
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:2px;
		> div {
			flex-grow: 1;
			height:150px;
			background:rgba(255,255,255,1);
			box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
			border-radius:2px;
			padding: 0 20px;
			&:first-child{
				margin-right:10px;
			};
			&:last-child{
				margin-left:11px;
			};
		}
		.card-header {
			font-size:16px;
			font-weight:500;
			color:rgba(102,102,102,1);
			position: relative;
			text-indent: 15px;
			margin: 20px 0;
			line-height: 1;
			&:before {
		    content: '';
		    height: 100%;
		    width:5px;
		    height:16px;
		    background:rgba(255,226,102,1);
		    display: inline-block;
		    position: absolute;
		    top: 50%;
		    transform: translateY(-50%);
		    left: 0;
		  };
		}
		.card-content{
			overflow: hidden;
			display: flex;
			.end {
				color: #666;
			}
			.doing{
				color: #D7AB70;
			}
			.punch{
				color: #666;
			}
		}
		.img-box {
			width: 64px;
			height: 64px;
			background: rgba(0,0,0,.03);
			margin-right: 16px;
			position: relative;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.text-content {
			flex-grow: 1;
			position: relative;
		}
		h2 {
			font-size:16px;
			font-weight:400;
			color:rgba(53,64,72,1);
			margin: 0;
			line-height: 1.2;
			margin-bottom: 12px;
			overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #354048;
      font-size: 14px;
      width: 100%;
		}
		p {
			line-height: 1;
			margin: 0;
			font-size:12px;
			font-weight:400;
			color:rgba(102,102,102,1);
			margin-top: 10px;
		}
	}
	.member-dynamics {
		background: #fff;
		padding: 20px;
		margin-top: 22px;
		.member-dynamics-header {
			font-size:16px;
			font-weight:500;
			color:rgba(102,102,102,1);
			position: relative;
			text-indent: 15px;
			margin: 20px 0;
			line-height: 1;
			&:before {
		    content: '';
		    height: 100%;
		    width:6px;
		    height:16px;
		    background:rgba(255,226,102,1);
		    display: inline-block;
		    position: absolute;
		    top: 50%;
		    transform: translateY(-50%);
		    left: 0;
		  };
		}
		li{
			border-bottom: 1px solid rgba(237,237,237,1);
			overflow: hidden;
			padding: 20px 0;
			display: flex;
			margin-right: 24px;
			transition: all ease .4s;
			&:last-child{
				border-bottom: unset;
			};
/*			&:hover{
				background: #f5f7fa;
			};*/
		}
		.img-box {
			width: 50px;
			height: 50px;
			background: rgba(0,0,0,.05);
			margin-right: 16px;
			border-radius: 50%;
			position: relative;
			overflow: hidden;
			img{
				width: 100%;
			}
		}
		.content {
			flex-grow: 1;
			line-height: 1;
			position: relative;
		}
		.ceil {
			margin-bottom: 10px;
			overflow: hidden;
			margin-top: 5px;
		}
		.floor{
			font-size: 14px;
			color:rgba(53,64,72,1);
		}
		.username {
			color: #4080AD;
			margin-right: 20px;
			font-size: 14px;
			line-height: 1;
		}
		.degree {
			color: #666666;
			font-size: 14px;
			line-height: 1;
		}
		time {
			font-size:12px;
			font-weight:300;
			color:rgba(102,102,102,1);
			line-height: 1.4;
			float: right;
		}
		button {
			background:rgba(248,248,248,1);
			border-radius:11px;
			padding: 5px 12px;
			margin-left: 20px;
			color:rgba(102,102,102,1);
			font-size: 12px;
		}
	}
	.dashboard-open-business {
		font-size:16px;
		color:#354048;
		margin: 0;
		line-height: 1;
		margin-bottom: 15px;
	}
	.dashboard-open-business-phone {
		font-size:14px;
		color:rgba(102,102,102,1);
		margin: 0;
		line-height: 1;
	}
}
</style>