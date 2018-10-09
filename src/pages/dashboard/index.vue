<template>
  <section id="dashboard">
		<main-content></main-content>
		<asider-bar></asider-bar>
  </section>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import AsiderBar from './asider.vue'
import MainContent from './content.vue'

@Component({
	components: {
		AsiderBar,
		MainContent
	},
	methods: {
		...mapActions([
			'getDesktopInfosApi',
			'getMemberDynamicsListApi'
		])
	},
	computed: {
    ...mapGetters([
      'companyInfo',
      'desktopInfos'
    ])
  }
})
export default class pageDashboard extends Vue {
	created() {
		this.getDesktopInfosApi()
		this.getMemberDynamicsListApi({page: 1, count: 20})
	}
}
</script>
<style lang="scss" scoped>
#dashboard {
	background: transparent;
	padding: 0;
	display: flex;
	.left-content {
		flex-grow: 1;
		margin-right: 22px;
	}
}
</style>