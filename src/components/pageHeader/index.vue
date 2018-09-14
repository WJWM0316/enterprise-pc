<template>
	<header id="page-header">
		<section>
			<ul class="navigation">
				<li><i class="el-icon-bell"></i></li>
				<li>
					<img src="http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg" alt="">
					<span style="color:#354048;margin-left: 16px;">欢迎登陆，</span>
					<el-dropdown trigger="click" @command="todoAction">
					  <span class="el-dropdown-link" style="color:#354048">
					    七芊<i class="el-icon-caret-bottom el-icon--right"></i>
					  </span>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item command="user">个人中心</el-dropdown-item>
					    <el-dropdown-item command="tutor">导师空间</el-dropdown-item>
					    <el-dropdown-item command="out">退出</el-dropdown-item>
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
			margin-left: 35px;
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
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { removeAccessToken } from '@/store/cacheService'

@Component({
	methods: {
    ...mapActions(['logoutApi'])
  }
})
export default class ComponentHeader extends Vue {
	todoAction(command) {
		switch(command) {
			case 'out':
				this.logoutApi()
					.then(() => {
						removeAccessToken()
						this.$router.push({name: 'login'})
					})
				break
			default:
				break
		}
	}
}
</script>