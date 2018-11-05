<template>
	<div id="statistics">
		<div class="statistics-box-box">
			<div>课程</div>
			<div>直播</div>
			<div>成员</div>
			<div>导师</div>
			<div>工作圈</div>
		</div>
	  <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class pageStatistics extends Vue {}
</script>
<style lang="scss">
.statistics-box-box {
	height:52px;
	background:rgba(255,255,255,1);
	border-radius:4px;
}
</style>