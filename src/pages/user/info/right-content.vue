<template>
  <div class="user-right-content">
  	<div class="his-dynamics-tab-box">
			<div :class="{active: 	currentType === 'getPersonalInfoLessonsApi'}" @click="tabClick('getPersonalInfoLessonsApi')">
				<div class="cell">参与的课程</div>
				<div class="num">({{personalInfoBase.listItemCounts.lessonCount}})</div>
			</div>
			<div :class="{active: 	currentType === 'getPersonalInfoLivesApi'}" @click="tabClick('getPersonalInfoLivesApi')">
				<div class="cell">参与的直播</div>
				<div class="num">({{personalInfoBase.listItemCounts.liveCount}})</div>
			</div>
			<div :class="{active: 	currentType === 'getPersonalInfoJobCirclesApi'}" @click="tabClick('getPersonalInfoJobCirclesApi')">
				<div class="cell">参与的工作圈</div>
				<div class="num">({{personalInfoBase.listItemCounts.jobcircleCount}})</div>
			</div>
  	</div>
  	<ul class="his-dynamics-ul-list">
  		<template v-if="currentType === 'getPersonalInfoLessonsApi'">
				<li v-for="(courseItem, courseIndex) in personalInfoLessons" :key="courseIndex" class="course-item">
					<div class="img-box">
						<img :src="courseItem.courseCoverImg.smallUrl" alt="">
					</div>
					<div class="text-content">
						<h2>{{courseItem.courseTitle}}</h2>
						<div class="u-info">
							<span class="group-name">{{courseItem.masterTitle}}</span>
							<span class="user-name">{{courseItem.masterName}}</span>
						</div>
						<div class="progress">
							<div class="learn-rate-text">已学习<span> {{courseItem.selfProcess}}% </span></div>
							<div class="line">
								<div class="doing" :style="`width: ${courseItem.selfProcess}%`"></div>
							</div>
						</div>
					</div>
				</li>
			</template>
			<template v-if="currentType === 'getPersonalInfoLivesApi'">
				<li v-for="(liveItem, liveIndex) in personalInfoLives" :key="liveIndex" class="live-item">
					<div class="img-box">
						<img :src="liveItem.cover.smallUrl" alt="">
					</div>
					<div class="text-content">
						<h2>{{liveItem.liveName}}</h2>
						<div class="u-info">
							<span class="group-name">{{liveItem.masterTitle}}</span>
							<span class="user-name">{{liveItem.masterName}}</span>
						</div>
					</div>
				</li>
			</template>
			<template v-if="currentType === 'getPersonalInfoJobCirclesApi'">
				<li v-for="(circleItem, circleIndex) in personalInfoJobCircles" :key="circleIndex" class="circle-item">
					<div class="img-box">
						<img :src="circleItem.coverImg.smallUrl" alt="">
					</div>
					<div class="text-content">
						<h2>{{circleItem.name}}</h2>
						<div class="u-info">
							<span class="group-name">{{circleItem.groupName}}</span>
							<span class="user-name">{{circleItem.realname}}</span>
						</div>
					</div>
				</li>
			</template>
  	</ul>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
	methods: {
		...mapActions([
			'getPersonalInfoLessonsApi',
			'getPersonalInfoLivesApi',
			'getPersonalInfoJobCirclesApi'
		])
	},
	computed: {
    ...mapGetters([
      'personalInfoLessons',
      'personalInfoStudy',
      'personalInfoBase',
      'personalInfoLives',
      'personalInfoJobCircles'
    ])
  }
})
export default class ComponentRight extends Vue {
	currentType = 'getPersonalInfoLessonsApi'
	tabClick(api) {
		const params = this.$route.query
		this[api](params)
		this.currentType = api
	}
}
</script>
<style lang="scss">
#user-info {
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
			pointer-events: none;
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
			img{
				width: 100%;
				height: 100%;
			}
		}
		.text-content {
			flex-grow: 1;
		}
		h2{
			font-size:16px;
			font-weight:bold;
			color:rgba(53,64,72,1);
			margin: 10px 0;
			overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #354048;
      font-size: 14px;
      line-height: 1.4;
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
			span{
				color: #D7AB70;
			}
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
			}
			.doing{
				height:6px;
				background:rgba(255,226,102,1);
				border-radius:8px;
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