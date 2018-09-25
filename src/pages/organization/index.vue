<template>
  <router-view />
</template>
<script>
export default {}
</script>
<style lang="scss">
.page-position {
	margin-bottom: 32px;
}
#organization {
	background: #fff;
	.organization-base {
		line-height: 35px;
		margin-bottom: 25px;
		h1{
			margin: 0;
			padding: 0;
			float: left;
			line-height: 40px;
			vertical-align: middle;
			font-size:30px;
			font-weight:500;
			color:rgba(53,64,72,1);
		}
		h2 {
			margin: 0;
			line-height: 40px;
		}
		.number {
			font-size:16px;
			font-weight:400;
			color:rgba(146,146,146,1);
			margin-left: 10px;
		}
		.left-content {
			text-align: left;
		}
		.right-content {
			text-align: right;
		}
		.click-item {
			color:rgba(53,64,72,1);
		}
	}
	.group-type-list {
		.el-button{
			width: 128px;
			padding: 10px 20px;
			margin: 0px 16px 16px 0px;
		}
		.border {
			width:100%;
			height:3px;
			border-bottom:1px dashed rgba(235,238,245,1);
			margin-bottom: 30px;
		}
	}
	.dropdown-select {
		margin: 24px 0 16px 0;
	}
}
</style>