<template>
	<div class="left-content">
		<section class="company-infos">
			<h1>{{desktopInfos.company}}</h1>
			<div class="menber-zone">
				<!-- 试用中的状态 -->
				<el-popover
			    placement="bottom-end"
			    width="158"
			    content=""
			    trigger="hover">
			    <div class="my-popover123456">
			    	<h2>{{desktopVerInfo.name}}</h2>
			    	<div class="walk">
			    		<span>可用员工数：</span>
			    		<strong>{{desktopVerInfo.enable.staffCount}}</strong>
			    	</div>
			    	<div class="walk">
			    		<span>可创建课程数：</span>
			    		<strong>{{desktopVerInfo.enable.courseCount}}</strong>
			    	</div>
			    	<div class="walk">
			    		<span>可创建直播数：</span>
			    		<strong>{{desktopVerInfo.enable.liveCount}}</strong>
			    	</div>
			    	<div class="walk">
			    		<span>可创建工作圈数：</span>
			    		<strong>{{desktopVerInfo.enable.jobCircleCount}}</strong>
			    	</div>
			    	<div class="walk">
			    		<span>可存储文件量：</span>
			    		<strong>{{desktopVerInfo.enable.storageSpaceCount.sizeM}}</strong>
			    	</div>
			    </div>
			    <button class="click-item time-button" slot="reference">
			    	{{!desktopVerInfo.isOfficial ? `试用期：${desktopVerInfo.remainDay} 天` : `${desktopVerInfo.name}，${desktopVerInfo.remainDay}天后过期`}}
			    </button>
			  </el-popover>
				<button class="click-item todo-action" @click="openModal">{{desktopVerInfo.tip}}</button>
				<button class="click-item todo-action" @click="openModal" v-if="desktopVerInfo.isOfficial">续费</button>
				<!-- <button class="click-item todo-action" @click="openModal" v-if="!desktopVerInfo.isOfficial">开通正式版</button> -->
			</div>
			<div class="statistics-flex-box">
				<div>
					<strong>{{desktopStudyInfo.yesterdayStudyPersonCount}}</strong>
					<p>昨日学习人数</p>
					<el-popover
				    placement="top-start"
				    width="122"
				    popper-class="dashboard-popper"
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
				    width="122"
				    popper-class="dashboard-popper"
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
				<div class="card-content" v-if="desktopNewestCourseInfo.coverImg" @click="routeJump('course')">
					<div class="img-box">
						<img :src="desktopNewestCourseInfo.coverImg" alt="">
					</div>
					<div class="text-content">
						<h2>{{desktopNewestCourseInfo.title}}</h2>
						<p class="number">学习人数：{{desktopNewestCourseInfo.peopleCount}}</p>
						<p>完成打卡：{{desktopNewestCourseInfo.sessionCardCount}}</p>
					</div>
				</div>
				<div class="text-content" v-else>
					<p class="no-data">还没有新建的课程~</p>
					<div class="btn-box">
						<el-button type="primary" size="mini" @click="routeJump('coursePost')">去新建</el-button>
					</div>
				</div>
			</div>
			<div>
				<div class="card-header">
					最新直播
				</div>
				<div class="card-content" v-if="desktopNewestLiveInfo.name" @click="routeJump('broadcast')">
					<div class="img-box">
						<img :src="desktopNewestLiveInfo.coverImg.smallUrl" alt="" v-if="desktopNewestLiveInfo.coverImg">
					</div>
					<div class="text-content">
						<h2>{{desktopNewestLiveInfo.name}}</h2>
						<p class="number">学习人数：{{desktopNewestLiveInfo.peopleCount}}</p>
						<p class="punch" v-if="desktopNewestLiveInfo.status === 1">开始时间：{{desktopNewestLiveInfo.expectedStartTime * 1000 | date}}</p>
						<p class="doing" v-if="desktopNewestLiveInfo.status === 2">正在直播</p>
						<p class="end" v-if="desktopNewestLiveInfo.status === 3">直播已结束</p>
					</div>
				</div>
				<div class="text-content" v-else>
					<p class="no-data">还没有新建的直播~</p>
					<div class="btn-box">
						<el-button type="primary" size="mini" @click="routeJump('broadcastPost')">去新建</el-button>
					</div>
				</div>
			</div>
		</section>
		<section class="member-dynamics">
			<header class="member-dynamics-header">
				成员动态
				<button class="click-item" @click="reflesh" v-if="isHaveNew">
					<i class="el-icon-refresh" style="color: #4080AD;"></i>
					有新的动态，点击刷新
				</button>
			</header>
			<ul v-if="memberDynamics.length > 0">
				<li v-for="(memberItem, memberIndex) in memberDynamics" :key="memberIndex">
					<div class="img-box" @click="viewMenberInfo(memberItem.uid)">
						<img :src="memberItem.avatarInfo.smallUrl">
					</div>
					<div class="content">
						<div class="ceil">
							<span class="username" @click="viewMenberInfo(memberItem.uid)">{{memberItem.realname}}</span>
							<span class="degree">{{memberItem.groupName}} | {{memberItem.occupation}}</span>
							<time>{{memberItem.createdAt}}</time>
						</div>
						<div class="floor">
							{{memberItem.content}}
						</div>
					</div>
				</li>
			</ul>
			<div class="no-member-dynamics-data" v-else>
				<img src="~IMAGES/no-data.png" alt="">
				<p>还没有成员动态哦，成员参加的<br/> 课程、直播、工作圈相关动态将会在这里记录~</p>
			</div>
		</section>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import ModalDialog from 'COMPONENTS/dialog/index.vue'
import Cookies from 'js-cookie'
// import websocket from 'UTIL/websocket'
// import { WEBSOKET_API } from 'API/index.js'
@Component({
	methods: {
		...mapActions([
			'getUserListsApi',
			'getCompanyInfoApi',
			'getMemberCheckNewDynamicsApi',
			'getMemberDynamicsListApi',
			'loginApi',
			'getDesktopInfosApi'
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
	timer = null
	timestamp = null

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   调起【联系客服弹窗】
   * @return   {[type]}   [description]
   */
  openModal() {
  	this.$alert(`客服电话：${this.desktopInfos.customerServicePhone}`, '开通正式版、升级和续费请联系客服', {
      confirmButtonText: '我知道了',
      callback: action => {}
    })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   刷新成员动态
   * @return   {[type]}   [description]
   */
  reflesh() {
  	this.isHaveNew = 0
  	this.getMemberDynamicsListApi({count: 20})
  			.then(() => {
  				this.timestamp = this.memberDynamics.length === 0 ? Date.parse(new Date()) / 1000 : Date.parse(new Date(this.memberDynamics[0].createdAt)) / 1000
  			})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   页面跳转
   * @return   {[type]}        [description]
   */
  routeJump(name) {
  	const desktopVerInfo = this.desktopVerInfo
  	switch(name) {
  		case 'addMember':
  			if(desktopVerInfo.created.jobCircleCount >= desktopVerInfo.enable.jobCircleCount) {
  				this.$alert('成员创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '成员创建上限已满提醒', {
	          confirmButtonText: '我知道了',
	          callback: action => {}
	        })
	        return
  			}
  			break
  		case 'coursePost':
  			if(desktopVerInfo.created.courseCount >= desktopVerInfo.enable.courseCount) {
  				this.$alert('课程创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '创建课程上限已满提醒', {
	          confirmButtonText: '我知道了',
	          callback: action => {}
	        })
	        return
  			}
  			break
  		case 'broadcastPost':
  			if(desktopVerInfo.created.liveCount >= desktopVerInfo.enable.liveCount) {
  				this.$alert('直播创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '创建直播上限已满提醒', {
	          confirmButtonText: '我知道了',
	          callback: action => {}
	        })
	        return
  			}
  			break
  		case 'workZonePost':
  			if(desktopVerInfo.created.jobCircleCount >= desktopVerInfo.enable.jobCircleCount) {
  				this.$alert('工作圈创建上限已满啦~ 如果你要升级你的XPLUS套装、请咨询你的专属客户经理。', '创建工作圈上限已满提醒', {
	          confirmButtonText: '我知道了',
	          callback: action => {}
	        })
	        return
  			}
  			break
  		default:
  			break
  	}
  	this.$router.push({ name })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-09-15
   * @detail   查看个人信息
   * @return   {[type]}        [description]
   */
  viewMenberInfo(id) {
		this.$router.push({ name: 'userInfos', query: { id }})
	}

	clock() {
		this.timer = setInterval(() =>{
			this.getMemberCheckNewDynamicsApi({ timestamp: this.timestamp })
		  		.then(res => {
		  			this.isHaveNew = res.data.data.isHaveNew
		  		})
		}, 1000 * 60 * 5)
	}
  
  init() {
  	this.getDesktopInfosApi()
  			.then(() => {
  				if(this.desktopVerInfo.remainDay <= 0) {
  					Cookies.remove('Authorization-Sso', { domain: process.env.VUE_APP__COOKIE_DOMAIN })
          	Cookies.remove('code', { domain: process.env.VUE_APP__COOKIE_DOMAIN })
  					window.location.href = process.env.VUE_APP__LOGIN_URL
  				}
  			})
		this.getMemberDynamicsListApi({count: 20})
				.then(() => {
					this.timestamp = this.memberDynamics.length === 0 ? Date.parse(new Date()) / 1000 : Date.parse(new Date(this.memberDynamics[0].createdAt)) / 1000
					this.getMemberCheckNewDynamicsApi({timestamp: this.timestamp})
				  		.then(res => {
				  			this.isHaveNew = res.data.data.isHaveNew
				  			this.clock()
				  		})
				})
  }

	created() {
    const code  = Cookies.get('code') ? Cookies.get('code') : process.env.VUE_APP__TEST_COMPANY
		this.loginApi({code, 'Authorization-Sso': Cookies.get('Authorization-Sso')})
        .then(() => {
          this.init()
					this.$once('hook:beforeDestroy', () => { clearInterval(this.timer) })
					// websocket.create(`${WEBSOKET_API}`)
        })
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
			font-weight:700;
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
		height:24px;
		background:rgba(53,64,72,1);
		border-radius:12px;
		margin-right: 20px;
		font-size:12px;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:20px;
		padding: 0 14px;
	}
	.todo-action{
		margin-top: 2px;
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
			line-height: 60px;
			margin: 0;
			padding: 0;
			display: block;
			font-weight: 700;
		}
		p{
			font-size:14px;
			font-weight:300;
			color:rgba(102,102,102,1);
			line-height: 20px;
			display: inline-block;
			margin: 0;
			margin-right: 8px;
		}
		i {
			vertical-align: middle;
			color: rgba(188,188,188,1);
		}
	}
	.actions-flex-box{
		display: flex;
		margin-top: 16px;
		overflow: hidden;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:2px;
		padding: 12px 0px 12px 12px;
		> div {
			flex-grow: 1;
			position: relative;
			box-sizing: border-box;
			padding: 0 0px;
			line-height: 56px;
			cursor: pointer;
			text-align: left;
			&:after{
				content: '';
				display: block;
				height: 44px;
				position: absolute;
				top: 9.5px;
				bottom: 0;
				right: 0;
				width: 1px;
				background: #ebeef5;
			};
			&:first-child{
				i {
					margin-left: 15px;
				}
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
			margin-right: 8px;
			margin-left: 30px;
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
		margin-top: 16px;
		overflow: hidden;
		border-radius:2px;
		> div {
			flex-grow: 1;
			background:rgba(255,255,255,1);
			box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
			border-radius:2px;
			padding: 25px 20px;
			height: 150px;
			width: calc(50% - 7px);
			box-sizing: border-box;
			float: left;
			&:first-child{
				margin-right:7px;
			};
			&:last-child{
				margin-left:7px;
			};
		}
		.card-header {
			font-size:16px;
			font-weight:500;
			color:rgba(102,102,102,1);
			position: relative;
			text-indent: 15px;
			margin-bottom: 20px;
			line-height: 1;
			cursor: pointer;
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
			margin-right: 16px;
			position: relative;
			cursor: pointer;
			float: left;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.text-content {
			position: relative;
			margin-left: 80px;
			h2 {
				margin-bottom: 6px;
			}
			p {
				margin-top: 9px;
			}
			.number {
				margin-top: 6px;
			}
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
      /*font-size: 14px;*/
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
		
		.no-data {
			font-size:16px;
			font-weight:400;
			color:rgba(53,64,72,1);
			margin-left: -80px;
		}
		.btn-box {
			text-align: right;
			margin-top: 22px;
		}
	}
	.member-dynamics {
		background: #fff;
		padding: 25px 20px;
		margin-top: 16px;
		border-radius: 2px;
		overflow: hidden;
		.member-dynamics-header {
			font-size:16px;
			font-weight:500;
			color:rgba(102,102,102,1);
			position: relative;
			text-indent: 19px;
			margin-bottom: 20px;
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
			border-bottom: 1px solid #ebeef5;
			overflow: hidden;
			padding: 20px 0;
			display: flex;
			margin-right: 24px;
			transition: all ease .4s;
			&:last-child{
				border-bottom: unset;
			};
			/*&:hover{
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
			font-weight: 400;
		}
		.username {
			color: #4080AD;
			margin-right: 20px;
			font-size: 14px;
			line-height: 1;
			font-weight: 500;
			cursor: pointer;
		}
		.degree {
			color: #666666;
			font-size: 14px;
			line-height: 1;
			font-weight: 400;
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
	.no-member-dynamics-data {
		text-align: center;
		margin: 50px 0;
		img {
			width: 120px;
		}
		p{
			font-size:12px;
			font-weight:400;
			color:rgba(188,193,204,1);
			text-align: center;
			line-height: 1.5;
		}
	}
	.el-button--mini{
		width: 92px;
		height: 32px;
		color: #354048;
		border-radius: 2px;
		font-size: 14px;
	}
}
.menber-zone {
	display: flex;
}
.my-popover123456 {
	h2{
		font-size:16px;
		font-weight: 500;
		color:rgba(53,64,72,1);
		margin: 0;
		line-height: 1;
		margin-bottom: 15px;
	}
	.walk {
		font-size:14px;
		font-weight:300;
		color:rgba(53,64,72,1);
		margin-bottom: 5px;
	}
	strong{
		font-size:14px;
		font-weight:500;
		color:rgba(215,171,112,1);
	}
}
.my-popover1234571000 {
	position: absolute;
  background: #fff;
  min-width: 150px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>