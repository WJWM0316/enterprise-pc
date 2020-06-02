<template>
  <div id="statistics-work-zone">
      <tab-bar></tab-bar>
      <div class="online-course-situation">
        <button class="btn" @click="exportData">导出数据</button>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TabBar from '../tabBar.vue'
import { getTutorTypeStatistiClockApi } from 'STORE/api/statistics.js'
import { API_ROOT } from 'STORE/api/index.js'
import util from 'UTIL/util.js' 
import { getAccessToken } from '@/store/cacheService'
@Component({
	components: {
    TabBar
  }
})
export default class pageStatisticsClock extends Vue {
 created () {
 }
 exportData () {
  const url = `${API_ROOT}/sta/card/export/today`
  const newBlank = window.open(url, '_blank')
 }
}
</script>
<style scoped>
 .btn {
  display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFE266;
    border: 1px solid #FFE266;
    color: #666666;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 124px;
 }
</style>