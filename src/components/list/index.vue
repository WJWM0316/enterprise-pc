<template>
  <section class="zike-table-list">
    <el-table
      ref="table"
      :data="list"
      style="width: 100%"
      :total="total"
      :header-row-class-name="'zikebackend-table-header'"
      :row-class-name="tableRowClassName"
      :class="{'table-no-data123': list.length < 1}"
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
      <div slot="empty" class="table-list-no-data">
        <img src="~IMAGES/no-data.png" alt="">
        <p :style="{'marginTop': '23px'}">暂无相关内容</p>
      </div>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, slot"
      :total="total"
      :page-size="20"
      prev-text="上一页"
      next-text="下一页"
      :current-page="page"
      v-if="total > 20"
      @current-change="handleCurrentPageChange">
      <span class="total">{{page}}共{{ Math.ceil(total/20) }}页, {{total}}条记录</span>
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
    color:#909399;
    height: 48px;
    line-height: 48px;
    th {
      background: #F5F7FA;
      font-size: 14px;
      padding: 0;
      .cell{
        padding: 0;
        > div {
          line-height: 46px;
          vertical-align: middle;
          padding: 0;
        }
      }
      &:first-child{
        padding-left: 40px;
      }
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
    border-radius: 2px;
    overflow: hidden;
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
      font-weight: 300;
    }
    .btn-prev,.btn-next{
      padding: 0 10px;
      border-radius:4px;
      color: #D7AB70 !important;
      background-color: transparent !important;
      border-radius:4px;
      border:1px solid rgba(219,219,219,1);
      height: 30px;
      line-height: 30px;
    }
    .total {
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-left: 7px;
    }
  }
  .zike-dropdown {
    display: inline;
    padding: 0;
    padding-right: 8px;
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
    margin-right: 15px;
  }
  .table-list-no-data {
    text-align: center;
    margin: 160px auto 200px auto;
    img{
      width: 120px;
    }
    p {
      font-size:20px;
      font-weight:400;
      color:rgba(188,193,204,1);
    }
  }
  .table-no-data123{
    &:before{
      display: none;
    };
  }
  .cell {
    padding-left: 0;
    padding-right: 0;
  }
  .el-pager {
    li{
      height: 30px;
      font-weight: 300;
    }
  }
}


</style>
