<template>
  <div class="zike-common-search-bar" :style="{width: width}">
    <div class="f-flex">
      <input
        type="text"
        class="control"
        ref="control"
        :placeholder="placeholder" 
        v-model="keyword"
        @input="handleInput"
        @keypress.enter="handleSearch">
      <button 
        type="button" 
        class="search" 
        @click="handleSearch">
          <!-- <i class="el-icon-search"></i> -->
          <i class="icon iconfont icon-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
import SearchBar from './index'
export default SearchBar
</script>

<style lang="scss">
@import "~COLORS/variables";
.zike-common-search-bar {
  height:40px;
  border-radius:4px;
  border:1px solid #DCDCDC;
  position: relative;
  box-sizing: border-box;
  input{
    background: red;
    border: unset;
    outline: unset;
    height: 40px;
    line-height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding-right: 40px;
    padding-left: 10px;
    position: absolute;
    left: 0;
    top: 0;
    background: transparent;
    font-size: 14px;
  }
  input::-webkit-input-placeholder {
    color: #DCDCDC;
  }
  input:-moz-placeholder {
    color: #DCDCDC;
  }
  input:-ms-input-placeholder {
    color: #DCDCDC;
  }
  input:input-placeholder {
    color: #DCDCDC;
  }
  .icon-search{
    color: #BCBCBC;
  }
  button {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: pink;
    outline: none;
    border: unset;
    background: transparent;
    cursor: pointer;
    position: relative;
    float: right;
  }
}
</style>

