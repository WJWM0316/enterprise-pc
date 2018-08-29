<template>
  <div class="m-price-group" :class="[`type-${type}`]">
    <div class="input-group">
      <input type="number" v-model="price" @focus="handleFocus" @blur="handleBlur" :placeholder="placeholer">
      <span class="unit" v-if="type === 0">￥</span>
    </div>
    <template v-if="type === 1">
      <span class="unit">元</span>
      <div class="btn-container">
        <button type="button" class="confirm u-btn-operate" @click="handleConfirm">确定</button>
        <button type="button" class="cancel u-btn-operate" @click="handleCancel">取消</button>
      </div>
    </template>
  </div>
</template>

<script>
import PriceInput from './priceInput'
export default PriceInput
</script>

<style lang="scss" scoped>
@import '../../styles/less/variables';

.m-price-group {
  display: inline-block;
  position: relative;

  .input-group {
    display: inline-block;
    position: relative;

    & > input  {
      padding: {
        left: 20px;
        right: 5px;
      };
      width: 70px;
      height: 34px;
      font-size: 12px;
      text-align: right;
    }

    .unit {
      position: absolute;
      left: 5px;
      top: 0;
      color: #bcbcbc;
    }
  }

  .unit {
    display: inline-block;
    font-size: 12px;
    line-height: 34px;
    color: $color-level-three;
  }

  &.type-1 {
    .input-group {
      & > input  {
        padding: {
          left: 10px;
          right: 10px;
        };
        width: 100px;
        text-align: left;
      }
    }

    .btn-container {
      display: inline-block;
      margin-left: 10px;

      .u-btn-operate {
        padding: 7px 3px;
        line-height: 20px;
        font-size: 12px;

        &.cancel {
          color: $color-level-three;
        }
      }
    }
  }
}
</style>

