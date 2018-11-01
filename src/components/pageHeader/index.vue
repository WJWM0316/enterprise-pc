<template>
	<header id="page-header">
		<section>
			<ul class="navigation">
<!-- 				<li>
					<i class="el-icon-bell"></i>
				</li> -->
				<li>
					<el-dropdown trigger="hover" @command="logout" placement="bottom">
					  <div class="el-dropdown-link" style="color:#354048">
					  	<img :src="userInfos.avatarInfo.middleUrl" alt="" v-if="userInfos.avatarInfo">
					    <span style="margin-left: 10px;">欢迎登陆，&nbsp;&nbsp;{{userInfos.realname}}</span>
					    <i class="el-icon-caret-bottom el-icon--right"></i>
					  </div>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item command="out">退出登陆</el-dropdown-item>
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
	.el-icon-bell{
		font-size: 18px;
	}
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

@Component({
	methods: {
    ...mapActions(['logoutApi'])
  },
  computed: {
    ...mapGetters([
      'userInfos'
    ])
  }
})
export default class ComponentHeader extends Vue {
	logout(command) {
		this.logoutApi({code : this.getcookie('code')})
	}
}
</script>