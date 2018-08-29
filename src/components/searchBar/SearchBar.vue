<template>
  <div class="m-search-bar">
    <div class="f-flex">
      <input
        type="search"
        class="control"
        ref="control"
        :placeholder="placeholder"
        v-model="keyword"
        @input="handleInput"
        @keypress.enter="handleSearch" />
      <!-- <button type="button" class="search u-btn" @click="handleSearch"  icon="el-icon-search"></button> -->
      <el-button type="primary" @click="handleSearch"  icon="el-icon-search"></el-button>
    </div>
  </div>
</template>

<script>
import SearchBar from './searchBar'
export default SearchBar
</script>

<style lang="scss" scoped>
@import '~SCSS/variables';
.m-search-bar {
  display: inline-block;
  width: 465px;
  font-size: 0;
  vertical-align: middle;
  .el-button--primary {
    border-radius: 0 1px 1px 0;
  }
  .el-button--primary {
    background: $color-primary;
    border-color: $color-primary;
    font-size: 14px;
  }
  .control {
    flex: 1 1 auto;
    padding: 0 10px;
    height: 40px;
    border: solid 1px $color-primary;
    border-right: none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    font-size: 14px;
    outline: unset;
  }

  .search {
    flex: 0 0 auto;
    padding: 9px;
    background: $color-primary;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    font-size: 0;
    line-height: 1;
    width: 50px;
    border: unset;
    outline: none;
    &:hover {
      background-color: rgb(81, 204, 154);
    }
  }
  .f-flex {
    display: flex;
    box-orient: horizontal;
    flex-flow: row nowrap;
  }
}
</style>

