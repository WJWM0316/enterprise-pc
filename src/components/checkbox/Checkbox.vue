<template>
  <div class="u-checkbox-1">
    <input :id="id" type="checkbox" :name="name" :value="value" v-model="currentModel" @change="handleChange">
    <label :for="id">
      <slot>{{label}}</slot>
    </label>
  </div>
</template>

<script>
import Checkbox from './checkbox'
export default Checkbox
</script>

<style lang="scss" scoped>
@import '~SCSS/variables';
@import '../../styles/less/mixins';

.u-checkbox-1 {

  & > label {
    padding: 9px 10px;
    line-height: 18px;
    border-radius: 2px;
    border: solid 1px $color-light-gray;
    font-size: 13px;
    color: $color-level-two;

    transition: all 100ms;
  }

  & > input[type="checkbox"]:checked ~ label {
    background: $color-primary;
    border-color: $color-primary;
    color: $color-white;
  }
}

</style>

