<template>
  <div id="notice">
    <div class="column" draggable="true">1</div>
    <div class="column" draggable="true">2</div>
    <div class="column" draggable="true">3</div>
  </div>
</template>
<script>
import pageNotice from './index'
export default pageNotice
</script>
<style lang="scss">
.column{
  height: 200px;
  cursor: move;
  background: red;
  margin-bottom: 30px;
  text-align: center;
  line-height: 200px;
  font-size: 30px;
}
.column.over {
  background: pink;
}
</style>