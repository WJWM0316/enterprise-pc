<template>
  <section class="zike-table-list">
    <el-table
      ref="table"
      :data="list"
      style="width: 100%"
      :total="total"
      :header-row-class-name="'zikebackend-table-header'"
      :row-class-name="tableRowClassName"
      >
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
        <template slot-scope="scope">
          <slot name="columns" :scope="scope">{{ scope.row[scope.column.property] }}</slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, slot"
      :total="total"
      :page-size="20"
      prev-text="上一页"
      next-text="下一页"
      v-if="total > 20"
      @current-change="handleCurrentPageChange">
      <span class="total">共{{ Math.ceil(total/20) }}页, {{total}}条记录</span>
    </el-pagination>
  </section>
</template>

<script>
import ComponentTableList from './index'
export default ComponentTableList
</script>

<style lang="scss">
@import "~COLORS/variables.scss";
.zike-table-list {
  .zikebackend-table-header {
    th {
      background: #f4f4f4;
      font-size: 14px;
      padding: 0;
    }
  }
  .el-table__body {
    img {
      width: 84px;
      display: block;
    }
  }
  .img-box {
    margin-right: 20px;
  }
  .flex-box {
    display: flex;
    position: relative;
    margin-left: 40px;
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
    li.active{
      background-color: transparent !important;
      color: #666666 !important;
      border-color: transparent !important;
    }
    .number{
      box-sizing: border-box;
      background-color: transparent !important;
      border-radius:2px;
      border:1px solid rgba(219,219,219,1);
      color:rgba(215,171,112,1) !important;
    }
    .btn-prev,.btn-next{
      padding: 0 10px;
      border-radius:4px;
      color: #D7AB70 !important;
      background-color: transparent !important;
      border-radius:4px;
      border:1px solid rgba(219,219,219,1);
    }
    .total {
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-left: 5px;
    }
  }
  .zike-dropdown {
    display: inline;
    .el-dropdown-link,
    .el-icon-question {
      color: #909399;
    }
  }
  .el-table td {
    padding: 23px 0;
  }
  .el-button--text {
    color: #4080AD;
    margin: 0 8px;
  }
}
</style>
