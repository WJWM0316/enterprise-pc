<template>
  <section class="zike-table-list">
    <el-table
      ref="table"
      :data="list"
      style="width: 100%"
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
        v-for="field in fields">
        <template scope="scope">
          <slot name="columns" :scope="scope">{{ scope.row[scope.column.property] }}</slot>
        </template>
      </el-table-column>
     <!--  <el-table-column
        align="center"
        prop="course"
        label="课 程"
        min-width="20%">
        <template slot-scope="scope">
          <div class="flex-box">
            <div class="img-box"> <img :src="scope.row.img" alt="图片加载中..."> </div>
            <div class="content">
              <div>
                <div class="limit-row-num"> {{scope.row.course}} </div>
                <div>导师名称-组织架构</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="online"
        label="是否上线"
        min-width="10%"
        :filtered-value="[{label: '全部', value: 'online-全部'}, {label: '上线', value: 'online-上线'}, {label: '下线', value: 'online-下线'}]"
        filter-placement="上线：在员工端显示，下线：不在员工端显示"
        :render-header="renderHeader">
        <template slot-scope="scope">
          {{scope.row.online === 1 ? '上线' : '下线'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="type"
        label="类 型"
        min-width="10%"
        :filtered-value="[{label: '全部', value: 'type-全部'}, {label: '产品', value: 'type-产品'}, {label: '技术', value: 'type-技术'}]"
        filter-placement="类型提示"
        :render-header="renderHeader">
        <template slot-scope="scope">
          {{scope.row.type === 1 ? '未定义' : scope.row.type === 2 ? '产品' : scope.row.type === 3 ? '设计' : scope.row.type === 4 ? '大佬' : ''}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="range"
        label="排 序"
        min-width="10%"
        :filtered-value="[{label: '全部', value: 'range-全部'}, {label: '升序', value: 'range-升序'}, {label: '降序', value: 'range-降序'}]"
        filter-placement="排序提示"
        :render-header="renderHeader">
        <template slot-scope="scope">
          {{scope.row.range}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="action"
        min-width="20%"
        label="操 作">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.isDeleted === 1 ? true : false">编辑</el-button>
          <el-button type="primary" :disabled="scope.row.isDeleted === 1 ? true : false">课节</el-button>
          <el-button type="primary" :disabled="scope.row.isDeleted === 1 ? true : false">成员交流</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
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
  .action-zone {
    text-align: right;
  }
  .el-table__body {
    img {
      width: 74px;
      display: block;
    }
  }
  .img-box {
    margin-right: 15px;
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
    .limit-row-num {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
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
  .deleted {
    background:rgba(248,250,251,1);
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .header {
    margin: 30px 0;
  }
  .el-pagination {
    margin: 30px 0;
  }
  .zike-popper {
    > .el-icon-question {
      display: inline-block;
      position: absolute;
      top: 44%;
      right: 30%;
      transform: translateY(-50%);
      color: #909399 !important;
    }
    input {
      background: unset;
      border: unset;
    }
    .el-input__suffix {
      right: 20px;
      padding: 0;
    }
  }
  .zike-table-header-select {
    padding: 0;
    .el-input--suffix {
      padding: 0;
    }
    input {
      text-align: center;
    }
  }
}
</style>
