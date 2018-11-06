<template>
  <div id="statistics">
  	<tab-bar></tab-bar>
  	<div><editor-bar v-model="editor.info" :isClear="editor.isClear" @change="handleContentEditorBlur"></editor-bar></div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TabBar from '../tabBar.vue'
import EditorBar from 'COMPONENTS/editor2/index.vue'

@Component({
	components: {
    TabBar,
    EditorBar
  }
})
export default class pageStatisticsCourse extends Vue {
	editor = {
    info: '13213235454343453',
    isClear: false
  }
  handleContentEditorBlur (val) {
    this.editor.info1 = val
  }
}
</script>
<style lang="scss">
#statistics{
	padding: 0;
}
</style>