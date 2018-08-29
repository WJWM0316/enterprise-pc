<template>
  <div class="m-list">
    <slot name="list-top"></slot>
    <div class="list-main">
      <!-- 可默认插入整个表格内容，也可单独指定columns插槽插入自定义列表内容 -->
      <slot>
        <el-table stripe
                  ref="table"
                  :height="height || undefined"
                  :data="list"
                  :empty-text="emptyText"
                  :default-sort="defaultSort"
                  :row-class-name="tableRowClassName"
                  :show-header="showHeader"
                  tooltip-effect="dark"
                  @sort-change="handleSortChange"
                  @filter-change="handleFilterChange"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="49" align="center" v-if="selectable"></el-table-column>
          <el-table-column
            :key="field.prop"
            :prop="field.prop"
            :column-key="field.prop"
            :label="field.label"
            :align="field.align || 'center'"
            :width="field.width"
            :fixed="field.fixed"
            :sortable="field.sortable"
            :filters="field.filters && field.filters.length > 0 ? field.filters : undefined"
            :filter-multiple="field.filterMiltiple || false"
            :show-overflow-tooltip="field.singleLine || undefined"
            v-for="field in fields">
            <template scope="scope">
              <slot name="columns" :scope="scope">{{scope.row[scope.column.property]}}</slot>
            </template>
          </el-table-column>
        </el-table>
      </slot>
    </div>
    <slot name="list-bottom">
      <footer class="list-footer" v-if="hasPagination" v-show="total > 0">
        <el-pagination :layout="paginationLayout" :current-page="page" :page-size="pageSize" :total="total" @current-change="handlePageChange">
          <span class="total">共 {{pageCount}} 页，{{total}} 条记录</span>
        </el-pagination>
      </footer>
    </slot>

    <slot name="extend"></slot>
  </div>
</template>

<script>
import List from './list'
export default List
</script>

<style lang="scss">
@import '~SCSS/variables';

.el-table .warning-row {
  background: oldlace;
}

.m-list {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100%;

  .list-footer {
    position: absolute;
    left: 0;
    bottom: 20px;
    margin: 0 -5px;
    padding: 0 20px;
    width: 100%;
  }
  .el-table{
    th {
      background: #f4f4f4;
    }
  }
}
</style>

