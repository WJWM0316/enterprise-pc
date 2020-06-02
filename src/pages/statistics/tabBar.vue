<template>
	<ul class="statistics-box-box">
		<router-link :to="{name: 'statisticsCourse'}" tag="li">课程</router-link>
		<router-link :to="{name: 'statisticsLive'}" tag="li">直播</router-link>
		<router-link :to="{name: 'statisticsMember'}" tag="li">成员</router-link>
		<router-link :to="{name: 'statisticsTutor'}" tag="li">导师</router-link>
		<router-link :to="{name: 'statisticsZone'}" tag="li">工作圈</router-link>
		<router-link :to="{name: 'statisticsClock'}" tag="li">打卡</router-link>
	</ul>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class ComponentTabBar extends Vue {}
</script>
<style lang="scss">
.statistics-box-box {
	height:52px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	line-height: 52px;
	box-sizing: border-box;
	padding: 0 20px;
	> li {
		min-width: 120px;
		display: inline-block;
		font-size:16px;
		font-weight:300;
		color:rgba(102,102,102,1);
		position: relative;
		text-align: center;
		cursor: pointer;
	  &:before{
      position: absolute;
	    left: 0;
	    bottom: 0;
	    height: 2px;
	    background: #D7AB70;
	    content: '';
	    display: block;
	    width: 78%;
	    opacity: 0;
	    visibility: hidden;
	    transform: translateX(-50%);
	    left: 50%;
    };
	}
	.router-link-exact-active {
    color: #354048;
    font-weight: 500;
    pointer-events: none;
    &:before{
      opacity: 1;
      visibility: visible;
    };
  }
}
</style>