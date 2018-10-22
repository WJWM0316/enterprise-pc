<template>
  <div class="user-left-content">
		<div class="base-infos">
			<div class="base-infos-header">
				<h2>{{personalInfoBase.realname}}</h2>
				<div class="user-avatar">
					<img :src="personalInfoBase.avatar.smallUrl" alt="" v-if="personalInfoBase.avatar">
				</div>
			</div>
			<ul class="user-his-infos" v-if="!personalInfoBase.isExternalTutor">
				<li v-if="personalInfoBase.occupation">
					<i class="icon iconfont icon-post"></i>
					<span>{{personalInfoBase.occupation}}</span>
				</li>
				<li v-if="personalInfoBase.groupName">
					<i class="icon iconfont icon-organization"></i>
					<span>{{personalInfoBase.groupName}}</span>
				</li>
				<li v-if="personalInfoBase.mobile">
					<i class="icon iconfont icon-phone"></i>
					<span>{{personalInfoBase.mobile}}</span>
				</li>
				<li v-if="personalInfoBase.email">
					<i class="icon iconfont icon-email"></i>
					<span>{{personalInfoBase.email}}</span>
				</li>
				<li v-if="personalInfoBase.wechat">
					<i class="icon iconfont icon-WeChat"></i>
					<span>{{personalInfoBase.wechat}}</span>
				</li>
			</ul>
			<ul class="user-his-infos" v-else></ul>
			<div class="edit-enter" v-if="isShowEdit">
				<router-link :to="{name: 'editMember',query: {user_id: userInfo.uid } }" class="set">编辑</router-link>
			</div>
		</div>
		<div class="his-dynamics">
			<div class="his-dynamics-businiss-flex">
				<div>
					<strong>{{personalInfoStudy.studyTimeCount}}</strong>
					<p>学习时长</p>
				</div>
				<div>
					<strong>{{personalInfoStudy.lessonCount}}</strong>
					<p>完成课程数</p>
				</div>
				<div>
					<strong>{{personalInfoStudy.sessionCardCount}}</strong>
					<p>打卡数</p>
				</div>
			</div>
			<div class="his-learn-tips"> <i class="icon iconfont icon-achievement"></i>你的学习时长已超越 <span>{{ personalInfoStudy.surpass }}% </span> 的同事 ~ </div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getMemberInfosApi } from 'STORE/api/user.js'

@Component({
	methods: {
		...mapActions([
			'getPersonalInfoLessonsApi',
			'getPersonalInfoStudyApi',
			'getPersonalInfoBaseApi'
		])
	},
	computed: {
    ...mapGetters([
      'personalInfoLessons',
      'personalInfoStudy',
      'personalInfoBase',
      'userInfos'
    ])
  },
  watch: {
  	personalInfoBase(res){
  		this.getUserInfo()
  	}
  }
})
export default class ComponentLeft extends Vue {

	loginInfo = {} //登陆用户
	userInfo = {} //当前用户
	isShowEdit = false //是否显示编辑
	created() {
		const params = this.$route.params
		this.getPersonalInfoStudyApi(params)
  	this.getPersonalInfoBaseApi(params)
    this.getPersonalInfoLessonsApi(params)
	}

	//编辑权限判断
	isJurisdiction() {

		getMemberInfosApi({id: this.userInfos.id }).then(res=>{
			this.loginInfo = res.data.data
			if(this.loginInfo.roleName === '超级管理员'){
				if(this.userInfo.roleName !== '超级管理员'){
					this.isShowEdit = true
				}
			}else if(this.loginInfo.roleName === '后台管理员'){
				if(this.userInfo.roleName !== '后台管理员' && this.userInfo.roleName !== '超级管理员'){
					this.isShowEdit = true
				}
			}else if(this.loginInfo.roleName === '内容管理员'){
				if(this.userInfo.roleName !== '内容管理员' && this.userInfo.roleName !== '超级管理员'  && this.userInfo.roleName !== '后台管理员'){
					this.isShowEdit = true
				}
			}
		})
	}
	
	//当前用户信息
	getUserInfo() {
		getMemberInfosApi({id: this.personalInfoBase.uid }).then(res=>{
			this.userInfo = res.data.data
			this.isJurisdiction()
		})
	}
}
</script>
<style lang="scss">
#user-info {
	.user-left-content {
		width: 388px;
		margin-right: 22px;
	}
	.base-infos{
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:4px;
		padding: 20px;
		box-sizing: border-box;
		overflow: hidden;
	}
	.base-infos-header {
		height: 108px;
		line-height: 108px;
		position: relative;
		text-align: right;
		h2 {
			font-size:38px;
			color:rgba(53,64,72,1);
			margin: 0;
			color: #354048;
	    margin: 0;
	    font-weight: 500;
	    line-height: 1.4;
	    width: 210px;
	    display: inline-block;
	    vertical-align: middle;
	    position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	    left: 0;
	    text-align: left;
		}
		.user-avatar {
			background: rgba(0,0,0,.05);
	    border-radius: 66px;
	    height: 108px;
	    overflow: hidden;
	    width: 108px;
	    display: inline-block;
	    vertical-align: middle;
	    margin-left: 30px;
			img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.user-his-infos{
		margin-top: 30px;
		li {
			margin: 14px 0;
			font-size: 14px;
			color: #666666;
		}
		.icon {
			margin-right: 15px;
			font-size: 14px;
		}
	}
	.edit-enter{
		text-align: right;
		margin-top: -10px;
		a {
			font-size:14px;
			font-weight:400;
			color:rgba(64,128,173,1);
		}
	}
	.his-dynamics{
		height:226px;
		background:rgba(255,255,255,1);
		border-radius:4px;
		margin-top: 16px;
		padding: 54px 0;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
	}
	.his-dynamics-businiss-flex{
		display: flex;
		div{
			flex-grow: 1;
			text-align: center;
			position: relative;
			&:before{
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
				&:before{
					display: none;
				};
			};
		}
		strong {
			font-size:38px;
			font-weight:600;
			color:rgba(53,64,72,1);
			margin: 0;
			line-height: 1;
		}
		p {
			font-size:14px;
			font-weight:300;
			color:rgba(102,102,102,1);
			margin: 0;
			line-height: 1;
			margin-top: 4px;
		}
	}
	.his-learn-tips {
		height:48px;
		line-height: 48px;
		text-align: center;
		background:rgba(255,249,217,0.4);
		border-radius:0px 0px 4px 4px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		font-size: 16px;
		span{
			color: #D7AB70;
		}
		i{
			margin-right: 8px;
			font-size: 16px;
			color: #FFE266;
		}
	}
}
</style>