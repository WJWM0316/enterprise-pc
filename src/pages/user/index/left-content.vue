<template>
  <div class="user-left-content">
		<div class="base-infos">
			<div class="base-infos-header">
				<h2>李天一</h2>
				<div class="user-avatar"></div>
			</div>
			<ul class="user-his-infos">
				<li>
					<i class="icon iconfont icon-post"></i>
					<span>UI设计师</span>
				</li>
				<li>
					<i class="icon iconfont icon-organization"></i>
					<span>某某某事业群 | 某某平台部 | 某某技术部 | UED</span>
				</li>
				<li>
					<i class="icon iconfont icon-phone"></i>
					<span>155 3063 2317</span>
				</li>
				<li>
					<i class="icon iconfont icon-email"></i>
					<span>rashawn.breitenberg@yahoo.com</span>
				</li>
				<li>
					<i class="icon iconfont icon-WeChat"></i>
					<span>WeChat1234</span>
				</li>
			</ul>
			<div class="edit-enter">
				<router-link :to="{name: 'organization'}" class="set">编辑</router-link>
			</div>
		</div>
		<div class="his-dynamics">
			<div class="his-dynamics-businiss-flex">
				<div>
					<strong>55</strong>
					<p>学习时长</p>
				</div>
				<div>
					<strong>55</strong>
					<p>学习时长</p>
				</div>
				<div>
					<strong>55</strong>
					<p>学习时长</p>
				</div>
			</div>
			<div class="his-learn-tips"> <i class="icon iconfont icon-achievement"></i>你的学习时长已超越 <span>22.3% </span> 的同事 ~ </div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ComponentLeft extends Vue {}
</script>
<style lang="scss">
#user {
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
		h2 {
			font-size:38px;
			font-weight:bold;
			color:rgba(53,64,72,1);
			float: left;
			margin: 0;
		}
		.user-avatar {
			width:108px;
			height:108px;
			border-radius:66px;
			float: right;
			background: rgba(0,0,0,.05)
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