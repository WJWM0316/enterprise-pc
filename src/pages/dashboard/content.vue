<template>
	<div class="left-content">
		<section class="company-infos">
			<h1>深圳市腾旭科技有限公司</h1>
			<div class="menber-zone">
				<button class="time-button">有限期 7 天</button>
				<button class="">前往开通正式版</button>
			</div>
			<div class="statistics-flex-box">
				<div>
					<strong>55</strong>
					<p>昨日学习人数</p>
					<el-popover
			    placement="top-start"
			    title="标题"
			    width="200"
			    trigger="hover"
			    content="昨日0时-24时有访问【员工移动端】的用户总数">
			    <i class="el-icon-question" slot="reference"></i>
			  </el-popover>
				</div>
				<div>
					<strong>55</strong>
					<p>昨日学习时长</p>
					<el-popover
			    placement="top-start"
			    title="标题"
			    width="200"
			    trigger="hover"
			    content="昨日0时-24时有访问【员工移动端】的用户总数">
			    <i class="el-icon-question" slot="reference"></i>
			  </el-popover>
				</div>
				<div>
					<strong>55</strong>
					<p>昨日学习人数</p>
					<el-popover
			    placement="top-start"
			    title="标题"
			    width="200"
			    trigger="hover"
			    content="昨日0时-24时有访问【员工移动端】的用户总数">
			    <i class="el-icon-question" slot="reference"></i>
			  </el-popover>
				</div>
				<div>
					<strong>55</strong>
					<p>昨日学习人数</p>
					<el-popover
			    placement="top-start"
			    title="标题"
			    width="200"
			    trigger="hover"
			    content="昨日0时-24时有访问【员工移动端】的用户总数">
			    <i class="el-icon-question" slot="reference"></i>
			  </el-popover>
				</div>
				<div>
					<strong>55</strong>
					<p>昨日学习人数</p>
					<el-popover
			    placement="top-start"
			    title="标题"
			    width="200"
			    trigger="hover"
			    content="昨日0时-24时有访问【员工移动端】的用户总数">
			    <i class="el-icon-question" slot="reference"></i>
			  </el-popover>
				</div>
			</div>
		</section>
		<section class="actions-flex-box">
			<div>
				<i class="icon-zike"></i>
				<p>昨日学习人数</p>
			</div>
			<div>
				<i class="icon-zike"></i>
				<p>昨日学习人数</p>
			</div>
			<div>
				<i class="icon-zike"></i>
				<p>昨日学习人数</p>
			</div>
			<div>
				<i class="icon-zike"></i>
				<p>昨日学习人数</p>
			</div>
			<div>
				<i class="icon-zike"></i>
				<p>昨日学习人数</p>
			</div>
		</section>
		<section class="notice-flex-box">
			<div>
				<div class="card-header">
					最新课程
				</div>
				<div class="card-content">
					<div class="img-box"></div>
					<div class="text-content">
						<h2>金牌主持人亲带：公众演说时训营...</h2>
						<p>学习人数：188</p>
						<p>完成打卡：188</p>
					</div>
				</div>
			</div>
			<div>
				<div class="card-header">
					最新课程
				</div>
				<div class="card-content">
					<div class="img-box"></div>
					<div class="text-content">
						<h2>金牌主持人亲带：公众演说时训营...</h2>
						<p>学习人数：188</p>
						<p>完成打卡：188</p>
					</div>
				</div>
			</div>
		</section>
		<section class="member-dynamics">
			<header class="member-dynamics-header">
				成员动态
				<button>
					<i class="el-icon-refresh" style="color: #4080AD;"></i>
					有新的动态，点击刷新
				</button>
			</header>
			<ul>
				<li v-for="item in 10" :key="item">
					<div class="img-box"></div>
					<div class="content">
						<div class="ceil">
							<span class="username">吊炸天</span>
							<span class="degree">产品组|产品经理</span>
							<time>2018-08-02 18:00</time>
						</div>
						<div class="floor">
							完成了课程《课程名字课程名字课程名字课程名字课程名字课》打卡
						</div>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class pageDashboard extends Vue {}
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
	button {
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
			font-weight:300;
			color:#354048;
			line-height: 1;
			margin: 0;
			padding: 0;
			display: inline-block;
			vertical-align: middle;
		}
		i {
			width: 45px;
			height: 45px;
			background: rgba(0,0,0,.1);
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			margin-right: 20px;
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
		.card-content{
			overflow: hidden;
			display: flex;
		}
		.img-box {
			width: 64px;
			height: 64px;
			background: pink;
			margin-right: 16px;
		}
		.text-content {
			flex-grow: 1;
		}
		h2 {
			font-size:16px;
			font-weight:400;
			color:rgba(53,64,72,1);
			margin: 0;
			line-height: 1;
			margin-bottom: 12px;
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
			background: pink;
			margin-right: 16px;
			border-radius: 50%;
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
}
</style>