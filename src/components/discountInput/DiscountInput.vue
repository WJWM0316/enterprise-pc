<template>
  <div class="m-discount-group" :class="[`type-${type}`]">
    <div class="input-group">
      <input type="number" v-model="discount" @focus="handleFocus" @blur="handleBlur" :placeholder="placeholer">
      <span class="unit" v-if="type === 0">折</span>
      <button type="button" class="add u-btn-step" @click="handleAdd"><i class="u-icon-angle-up"></i></button>
      <button type="button" class="minus u-btn-step" @click="handleMinus"><i class="u-icon-angle-down"></i></button>
    </div>
    <template v-if="type === 1">
      <span class="unit">折</span>
      <div class="btn-container">
        <button type="button" class="confirm u-btn-operate" @click="handleConfirm">确定</button>
        <button type="button" class="cancel u-btn-operate" @click="handleCancel">取消</button>
      </div>
    </template>
  </div>
</template>

<script>
import DiscountInput from './discountInput'
export default DiscountInput
</script>

<style lang="scss" scoped>
@import '../../styles/less/variables';

.m-discount-group {
  display: inline-block;

  .input-group {
    display: inline-block;
    vertical-align: middle;
    font-size: 0;
    line-height: 1;
    position: relative;

    & > input  {
      padding: {
        left: 5px;
        right: 35px;
      };
      width: 70px;
      height: 34px;
      font-size: 12px;
    }

    .unit {
      position: absolute;
      right: 20px;
      top: 0;
      color: #bcbcbc;
    }

    .u-btn-step {
      position: absolute;
      right: 3px;
      top: 0;
      line-height: 16px;

      &:hover {
        background-color: rgba($color-light-gray, .3);
      }

      &.minus {
        top: auto;
        bottom: 0;
      }
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
          right: 20px;
        };
        width: 100px;
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

