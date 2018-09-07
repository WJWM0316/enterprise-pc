<template>
	<header id="page-header">
		<section>
			<ul class="navigation">
				<li><i class="el-icon-warning"></i></li>
				<li><img src="http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg" alt=""></li>
				<li>欢迎登陆,
					<el-dropdown trigger="click">
					  <span class="el-dropdown-link">
					    管理员<i class="el-icon-caret-bottom el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item>黄金糕</el-dropdown-item>
					    <el-dropdown-item>狮子头</el-dropdown-item>
					    <el-dropdown-item>螺蛳粉</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</li>
			</ul>
		</section>
	</header>
</template>
<style lang="scss">
#page-header{
	height: 60px;
	background: #fff;
	text-align: right;
	font-size: 14px;
	box-shadow: 0px 2px 8px 0px rgba(29,45,53,0.06);
	position: fixed;
	top: 0;
	left: 200px;
	right: 0;
	z-index: 2;
	section {
		position: fixed;
		height: 60px;
		left: 200px;
		right: 0;
	}
	.navigation {
		margin-right: 40px;
		li{
			display: inline-block;
			line-height: 60px;
			margin-left: 16px;
		}
		img {
			width: 34px;
			height: 34px;
			background: rgba(0,0,0,.1);
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			cursor: pointer;
		}
	}
}
</style>