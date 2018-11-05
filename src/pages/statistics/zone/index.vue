<template>
  <div id="statistics">
  	<tab-bar></tab-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TabBar from '../tabBar.vue'

@Component({
	components: {
    TabBar
  }
})
export default class pageStatisticsCourse extends Vue {}
</script>
<style lang="scss">
#statistics{
	padding: 0;
}
</style>