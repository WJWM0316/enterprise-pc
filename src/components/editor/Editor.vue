<template>
  <div class="m-editor">
    <div v-html="content" ref="editor" :style="{height: height + 'px'}"></div>
  </div>
</template>

<script>
import Editor from './editor'
export default Editor
</script>
<style lang="scss" scoped></style>