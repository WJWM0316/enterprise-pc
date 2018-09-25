<template>
  <div id="user">
		<left-component />
		<right-component />
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
	}
})
export default class pageIndex extends Vue {}
</script>
<style lang="scss">
#user {
	display: flex;
}
</style>