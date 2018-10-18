<template>
  <div id="user-info" v-if="personalInfoBase.avatar.smallUrl">
		<left-component />
		<right-component />
  </div>
  <div v-else class="no-user-data">
  	<div>
	  	<img src="~IMAGES/no-data.png" alt="">
	  	<p>该员工已被删除 | {{leaveTime}}秒后<span @click="routeJump">返回首页</span></p>
  	</div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import LeftComponent from './left-content.vue'
import RightComponent from './right-content.vue'

@Component({
	components: {
		LeftComponent,
		RightComponent
	},
	computed: {
    ...mapGetters([
      'personalInfoBase'
    ])
  },
  watch: {
  	'personalInfoBase': {
      handler(val) {
      	if(!val) {
      		this.clock()
      	}
      },
      immediate: true
    }
  }
})
export default class pageIndex extends Vue {
	leaveTime = 5
	timer = null
	clock() {
		this.timer = setInterval(() =>{
			this.leaveTime--
			if(this.leaveTime === 0) {
				clearInterval(this.timer)
				console.log(111)
				this.$router.push({name: 'dashboard'})
			}
		}, 1000 )
	}

	routeJump() {
		clearInterval(this.timer)
		this.$router.push({name: 'dashboard'})
	}
}
</script>
<style lang="scss">
#user-info {
	display: -webkit-box;
}
.no-user-data {
	text-align: center;
	font-size:20px;
	font-weight:400;
	color:rgba(188,193,204,1);
	img{
		width: 170px;
	}
	> div{
		display: inline-block;
		width: 290px;
		height: 242px;
		line-height: 1;
		position: absolute;
		left: 50%;
		margin-left: -145px;
		top: 50%;
		margin-top: -121px;
		/*line-height: calc(100vh - 104px);*/
	}
}
</style>