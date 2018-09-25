<template>
  <div class="user-right-content">
  	<div class="his-dynamics-tab-box">
			<div :class="{active: 	currentType === 0}" @click="tabClick(0)">
				<div class="cell">参与的课程</div>
				<div class="num">(10)</div>
			</div>
			<div :class="{active: 	currentType === 1}" @click="tabClick(1)">
				<div class="cell">参与的课程</div>
				<div class="num">(10)</div>
			</div>
			<div :class="{active: 	currentType === 2}" @click="tabClick(2)">
				<div class="cell">参与的课程</div>
				<div class="num">(10)</div>
			</div>
  	</div>
  	<ul class="his-dynamics-ul-list">
			<li v-for="item in 8" :key="item">
				<div class="img-box"></div>
				<div class="text-content">
					<h2>零基础成为月销十万的电商达人</h2>
					<div class="u-info">
						<span class="group-name">头像最长显示…</span>
						<span class="user-name">名称最长显示…</span>
					</div>
					<div class="progress">
						<div class="learn-rate-text">已学习<span>12%</span></div>
						<div class="line">
							<div class="doing" :style="`width: ${item}0%`"></div>
						</div>
					</div>
				</div>
			</li>
  	</ul>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ComponentRight extends Vue {
	currentType = 0
	tabClick(num) {
		this.currentType = num
	}
}
</script>
<style lang="scss">
#user {
	padding: 0;
	.user-right-content{
		flex-grow: 1;
	}
	.his-dynamics-tab-box {
		background: #fff;
		line-height: 46px;
		padding: 0 22px;
		font-size: 14px;
		> div{
			display: inline-block;
			margin-right: 40px;
			color: #666666;
			cursor: pointer;
			.cell {
				display: inline-block;
				position: relative;
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
	        transition: all ease .4s;
	      };
			}
		}
		.num {
			display: inline-block;
			margin-left: 10px;
		}
		.active{
			color: #000;
			.cell{
				&:before{
	        opacity: 1;
	        visibility: visible;
	      };
			}
		}
	}
	.his-dynamics-ul-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content:space-between;
		li{
			width: calc(50% - 10px);
			display: flex;
			background: white;
			margin-top: 14px;
			border-radius: 4px;
			overflow: hidden;
			box-sizing: border-box;
			padding: 15px;
		}
		.img-box {
			width:108px;
			height:108px;
			border-radius:4px;
			background: rgba(0,0,0,.05);
			margin-right: 16px;
		}
		.text-content {
			flex-grow: 1;
		}
		h2{
			font-size:16px;
			font-weight:bold;
			color:rgba(53,64,72,1);
			margin: 10px 0;
			line-height: 1;
		}
		.group-name{
			background:rgba(53,64,72,1);
			display: inline-block;
			font-size: 12px;
			padding: 4px 5px;
			color: white;
			line-height: 1;
			float: left;
		}
		.user-name{
			background:rgba(255,249,217,1);
			display: inline-block;
			font-size: 12px;
			padding: 4px 5px;
			color: #D7AB70;
			line-height: 1;
			float: left;
		}
		.learn-rate {
			font-size:12px;
			font-weight:400;
			color:rgba(146,146,146,1);
			line-height: 1;
			margin-top: 10px;
			span{
				color: #D7AB70;
				margin-left: 5px;
			}
		}
		.progress {
			.learn-rate-text {
				overflow: hidden;
				margin-bottom: 8px;
				font-size:12px;
				font-weight:400;
				color:rgba(146,146,146,1);
				line-height: 1;
			}
			.line{
				height:6px;
				background:rgba(237,237,237,1);
				border-radius:8px;
				overflow: hidden;
				position: relative;
				.doing{
					height:6px;
					background:rgba(255,226,102,1);
					border-radius:8px;
				}
			}
		}
		.u-info{
			overflow: hidden;
			line-height: 1;
			margin: 13px 0;
		}
	}
}
</style>