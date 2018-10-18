<template>
  <div id="user-info" v-if="personalInfoBase.avatar.smallUrl">
		<left-component />
		<right-component />
  </div>
  <div v-else class="no-user-data">
  	<h2>该员工已经被删除</h2>
  	<el-button type="primary" @click="routeJump">{{leaveTime}}秒后返回首页</el-button>
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
				this.$router.push({name: 'dashboard'})
			}
		}, 1000 )
	}
	mounted() {
		this.clock()
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
	text-align: center
}
</style>