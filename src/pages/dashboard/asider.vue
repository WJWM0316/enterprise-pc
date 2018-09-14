<template>
	<div class="asider-bar">
		<section class="contact-box">
			<header class="contact-box-header">客服电话</header>
			<section class="company-phone-box"><i class="el-icon-phone"></i>020-2816-3063 </section>
		</section>
		<section class="using-help-box">
			<header class="using-help-box-header">使用帮助<button class="view">查看更多</button></header>
			<ul>
				<li v-for="item in 10" :key="item">如何新建课程</li>
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
		text-indent: 15px;
		height: 60px;
		line-height: 60px;
		border-bottom:1px solid rgba(237,237,237,1);
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
	.company-phone-box {
		font-size:24px;
		font-weight:300;
		color:#354048;
		height: 80px;
		line-height: 80px;
		text-align: center;
		i{
			margin-right: 10px;
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
		}
		ul {
			margin: 10px 0;
		}
		li{
			font-size:14px;
			font-weight:300;
			color:rgba(102,102,102,1);
			padding: 10px 20px;
			transition: all ease .4s;
			cursor: pointer;
			line-height: 1;
			&:hover{
				background: rgba(0,0,0,.1);
				color: #409eff;
			};
		}
	}
}
</style>