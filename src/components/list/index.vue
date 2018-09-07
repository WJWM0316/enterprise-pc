<template>
  <section class="zike-table-list">
    <el-table
      ref="table"
      :data="list"
      style="width: 100%"
      :total="total"
      :header-row-class-name="'zikebackend-table-header'"
      :row-class-name="tableRowClassName"
      border>
      <el-table-column type="selection" width="49" align="center" v-if="selectable"></el-table-column>
      <el-table-column
        :key="field.prop"
        :prop="field.prop"
        :label="field.label"
        :align="field.align || 'center'"
        :min-width="field.width"
        :filtered-value="field.filteredValue"
        :filter-placement="field.filterPlacement"
        :render-header="renderHeader"
        :class-name="field.showTips"
        v-for="field in fields">
        <template scope="scope">
          <slot name="columns" :scope="scope">{{ scope.row[scope.column.property] }}</slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="20"
      v-if="total > 20"
      @current-change="handleCurrentPageChange" />
  </section>
</template>

<script>
import ComponentTableList from './index'
export default ComponentTableList
</script>

<style lang="scss">
@import "~SCSS/variables";
@import "~SCSS/mixins";
.zike-table-list {
  .zikebackend-table-header {
    th {
      background: #f4f4f4;
    }
  }
  .el-table__body {
    img {
      width: 74px;
      display: block;
    }
  }
  .img-box {
    margin-right: 20px;
  }
  .flex-box {
    display: flex;
    position: relative;
  }
  .content {
    flex-grow: 1;
    text-align: left;
    position: relative;
    > div {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .limit-row-num-1 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: #354048;
      font-size: 14px;
      line-height: 1.4;
    }
    .limit-row-num-2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #354048;
      font-size: 14px;
      line-height: 1.4;
    }
    .limit-row-num-3 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      color: #354048;
      font-size: 14px;
      line-height: 1.4;
    }
  }
  .el-table {
    .deleted-row {
      background:rgba(248,250,251,1);
    }
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-pagination {
    margin: 30px 0;
  }
  .zike-dropdown {
    display: inline;
    .el-dropdown-link,
    .el-icon-question {
      color: #909399;
    }
  }
}
</style>
