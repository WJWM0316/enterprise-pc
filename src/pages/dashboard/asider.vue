<template>
	<div class="asider-bar">
		<section class="contact-box">
			<header class="contact-box-header">客服电话</header>
			<section class="company-phone-box"><i class="icon iconfont icon-phone"></i>{{desktopInfos.customerServicePhone}}</section>
		</section>
		<section class="using-help-box" v-if="false">
			<header class="using-help-box-header">使用帮助<button class="view click-item">查看更多</button></header>
			<ul>
				<li v-for="(helpItem, helpIndex) in desktopInfos.helpList" :key="helpIndex">{{helpItem.title}}</li>
			</ul>
		</section>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
	computed: {
    ...mapGetters([
      'desktopInfos'
    ])
  }
})
export default class pageDashboard extends Vue {}
</script>
<style lang="scss">
#dashboard{
	.asider-bar {
		width:300px;
	}
	.contact-box{
		height:140px;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:2px;
	}
	.contact-box-header,
	.using-help-box-header {
		font-size:20px;
		font-weight:500;
		color:rgba(102,102,102,1);
		position: relative;
		text-indent: 22px;
		height: 60px;
		line-height: 58px;
		border-bottom:1px solid #ebeef5;
		&:before {
	    content: '';
	    height: 100%;
	    width:6px;
	    height:24px;
	    background:rgba(255,226,102,1);
	    display: inline-block;
	    position: absolute;
	    top: 50%;
	    transform: translateY(-50%);
	    left: 0;
	  };
	}
	.company-phone-box {
		font-size:24px;
		font-weight:300;
		color:#354048;
		height: 80px;
		line-height: 80px;
		text-align: left;
		i{	
			margin-left: 36px;
			margin-right: 14px;
			font-size: 24px;
			color: #BCBCBC;
		}
	}
	.using-help-box {
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 8px 0px rgba(29,45,53,0.06);
		border-radius:2px;
		margin-top: 22px;
		overflow: hidden;
		.view{
			float: right;
			margin: 21px 12px;
			color:#4080ad;
		}
		ul {
			margin: 10px 0;
		}
		li{
			font-size:14px;
			font-weight:300;
			padding: 10px 20px;
			transition: all ease .4s;
			cursor: pointer;
			line-height: 1;
			color: #666666;
			&:hover{
				color:#d7ab70;
			};
		}
	}
}
</style>