<template>
  <div id="help">
    <page-header />
    <section class="help-section">
			<page-asider />
			<page-content />
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import PageHeader from './pageHeader/index.vue'
import PageContent from './content/index.vue'
import PageAsider from './asider/index.vue'

@Component({
	components: {
    PageHeader,
    PageContent,
    PageAsider
  }
})
export default class pageHelp extends Vue {}
</script>
<style lang="scss">
#help {
  margin: -60px 0 0 0;
  padding: 0;
  border-radius: 0;
  .help-section {
    background: #fff;
    margin: 20px 150px;
  }
}
</style>