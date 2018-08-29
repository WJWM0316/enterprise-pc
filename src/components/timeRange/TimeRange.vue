<template>
  <div class="m-time-range">
    <el-date-picker
      class="start"
      v-model="start"
      :disabled="disabled"
      :format="format"
      type="datetime"
      :placeholder="startPlaceholder"
      @change="handleChangeStart" />
    <span class="addon-text">至</span>
    <el-date-picker
      class="end"
      v-model="end"
      :disabled="disabled || endDisabled"
      :format="format"
      :picker-options="endOptions"
      type="datetime"
      :placeholder="endPlaceholder"
      @change="handleChangeEnd" />
  </div>
</template>

<script>
import TimeRange from './timeRange'
export default TimeRange
</script>

<style lang="scss" scoped>
.m-time-range {
  font-size: 0;

  .start,
  .end {
    width: 183px;
  }

  .addon-text {
    margin: 0 10px;
    font-size: 14px;
  }
}
</style>

