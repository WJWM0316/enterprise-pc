<template>
  <div id="statistics">
  	<tab-bar></tab-bar>
  	<div>
  		<div id="container" style="height: 100%"></div>
  	</div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TabBar from '../tabBar.vue'
const echarts = require('echarts')

@Component({
	components: {
    TabBar
  }
})
export default class pageStatisticsCourse extends Vue {
	init() {
		myChart = echarts.init(document.getElementById('container'))
		option = {
	    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    yAxis: {
	      type: 'value'
	    },
	    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
	    }]
		}
		myChart.setOption(this.option, true)
	}
	mounted() {
		this.init()
	}
}
</script>
<style lang="scss">
#statistics{
	padding: 0;
}
</style>