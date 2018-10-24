<template>
  <div id="user-info" v-if="show">
  		<div id="user-info-cont"  v-if="!isDelete">
  			<left-component />
  			<right-component />
  		</div>
  		<div class="no-user-data" v-else>
		  	<div>
			  	<img src="~IMAGES/no-data.png" alt="">
			  	<p>该员工已被删除 | {{leaveTime}}秒后<span @click="routeJump">返回首页</span></p>
		  	</div>
  		</div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import LeftComponent from './left-content.vue'
import RightComponent from './right-content.vue'

@Component({
	methods: {
		...mapActions([
			'getPersonalInfoBaseApi'
		])
	},
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
  }
})
export default class pageIndex extends Vue {
	leaveTime = 5
	timer = null
	isDelete = false
	show = false
	clock() {
		console.log(this.personalInfoBase)
		this.timer = setInterval(() =>{
			this.leaveTime--
			if(this.leaveTime === 0) {
				clearInterval(this.timer)
				this.$router.push({name: 'dashboard'})
			}
		}, 1000 )
	}

	routeJump() {
		clearInterval(this.timer)
		this.$router.push({name: 'dashboard'})
	}

	created(){
		const params = {
			id: this.$route.query.id
		}
		console.log(this.personalInfoBase)
	  	this.getPersonalInfoBaseApi(params).then(()=>{
			console.log('22222',this.personalInfoBase)
  			this.show = true
	  		if(this.personalInfoBase && this.personalInfoBase.uid){

	  		}else {
	  			this.isDelete = true
	  			this.clock()
	  		}
	  	})
	}
}
</script>
<style lang="scss">
#user-info-cont {
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