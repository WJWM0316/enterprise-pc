<template>
  <div id="statistics-course">
  	<tab-bar></tab-bar>
  	<div class="online-course-situation">
      <div class="page-header">在线直播总数<strong>{{liveStatisticsList.currentOnlineLive}}</strong></div>
      <ul class="button-tab-box">
        <li
          class="item button-li"
          @click="tabCateLineGetList('last_month')"
          :class="{'active-button': tabLineCateIndex === 'last_month'}">最近30天</li>
        <li
          class="item button-li"
          @click="tabCateLineGetList('last_seven_days')"
          :class="{'active-button': tabLineCateIndex === 'last_seven_days'}">最近7天</li>
        <li
          class="item button-li"
          @click="tabCateLineGetList('last_day')"
          :class="{'active-button': tabLineCateIndex === 'last_day'}">昨天</li>
        <li
          :class="{'active-picker-date': tabLineCateIndex === ''}"
          class="item"
          @click="unsetTabCateLineGetList">
          <el-date-picker
            v-model="getLineDataByDate"
            :picker-options="pickerOptions"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </li>
        <li class="item item-box"><button class="button-export" @click="exportExcel">导出数据</button></li>
      </ul>
      <ul class="echart-tab-box">
        <li :class="{'active-button': tabType === 'newLiveRegistrations'}" @click="changeTabType('newLiveRegistrations')">新增在线直播数</li>
        <li :class="{'active-button': tabType === 'newLives'}" @click="changeTabType('newLives')">直播学习人次</li>
      </ul>
  		<div id="echart-line" style="height: 310px"></div>
  	</div>
    <div class="course-kind-cate">
      <div>
        <div class="section-header">直播类型分布</div>
        <div id="echart-pink1" class="echart-pink"></div>
      </div>
      <div>
        <div class="section-header">直播来源分布</div>
        <div id="echart-pink2" class="echart-pink"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TabBar from '../tabBar.vue'
const echarts = require('echarts')
import { API_ROOT } from 'STORE/api/index.js'
import { getAccessToken } from '@/store/cacheService'

@Component({
	components: {
    TabBar
  },
  watch: {
    getLineDataByDate: {
      handler(list) {
        if(list) {
          this.getLists({start_date: list[0], end_date: list[1]})
        }
      },
      immediate: true
    },
    '$route': {
      handler() {
        this.getLists({last_time: 'last_month'})
        this.getLiveDistributionStatisticsList()
        this.getLiveCateDistributionStatisticsList()
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getLiveStatisticsListApi',
      'getLiveDistributionStatisticsListApi',
      'getLiveCateDistributionStatisticsListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'liveStatisticsList',
      'liveDistributionStatisticsList',
      'liveCateDistributionStatisticsList'
    ])
  }
})
export default class pageStatisticsCourse extends Vue {
  getLineDataByDate = null
  tabLineCateIndex = 'last_month'
  tabType = 'newLiveRegistrations'
  // 时间限制
  pickerOptions = {
    disabledDate(time) {
      let curDate = (new Date()).getTime()
      let two = 60 * 24 * 3600 * 1000
      let twoMonths = curDate - two
      return time.getTime() > Date.now() || time.getTime() < twoMonths
    }
  }
	initEchartLine(key, value) {
    const option = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: key
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: value,
        type: 'line'
      }]
    }
		const myChart = echarts.init(document.getElementById('echart-line'))
		myChart.setOption(option, true)
	}
  initEcharPieLiveType(key, value) {
    const option = {
      grid: {
        width: '5000px'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: '50%',
        itemWidth: 10,
        itemHeight: 10,
        data: key
      },
      series : [
        {
          name: '类型分布',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const myChart = echarts.init(document.getElementById('echart-pink1'))
    myChart.setOption(option, true)
  }
  initEcharPieLiveSourse(key, value) {
    const option = {
      grid: {
        width: '50%'
      },
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 0,
        align: 'auto',
        data: key,
        itemWidth: 10,
        itemHeight: 10
      },
      series : [
        {
          name: '直播来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const myChart = echarts.init(document.getElementById('echart-pink2'))
    myChart.setOption(option, true)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   通过周期hui'u
   * @return   {[type]}          [description]
   */
  getLists(params) {
    this.getLiveStatisticsListApi(params)
        .then(() => {
          const key = []
          const value = []
          this.liveStatisticsList.list.map(field => {
            key.push(field.date)
            value.push(field.newLiveRegistrations)
          })
          this.initEchartLine(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   获取直播来源分布
   * @return   {[type]}          [description]
   */
  getLiveDistributionStatisticsList() {
    this.getLiveDistributionStatisticsListApi()
        .then(() => {
          const key = []
          const value = []
          if(this.liveDistributionStatisticsList.outerPercent) {
            key.push('外部导师')
            value.push({value: this.liveDistributionStatisticsList.outerPercent, name: '外部导师'})
          }
          if(this.liveDistributionStatisticsList.innerPercent) {
            key.push('内部导师')
            value.push({value: this.liveDistributionStatisticsList.innerPercent, name: '内部导师'})
          }
          this.initEcharPieLiveSourse(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   获取直播类型分布
   * @return   {[type]}          [description]
   */
  getLiveCateDistributionStatisticsList() {
    this.getLiveCateDistributionStatisticsListApi()
        .then(() => {
          const key = []
          const value = []
          this.liveCateDistributionStatisticsList.list.map(field => {
            key.push(field.categoryName)
            value.push({value: field.percent, name: field.categoryName})
          })
          this.initEcharPieLiveType(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   按周期获取数据
   * @param    {[type]}   attr [description]
   * @return   {[type]}        [description]
   */
  tabCateLineGetList(attr) {
    this.tabLineCateIndex = attr
    this.getLists({last_time: attr})
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   通过时间范围获取数据
   * @return   {[type]}   [description]
   */
  unsetTabCateLineGetList() {
    this.tabLineCateIndex = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   tab切换
   * @return   {[type]}       [description]
   */
  changeTabType(attr) {
    this.tabType = attr
    const key = []
    const value = []
    this.liveStatisticsList.list.map(field => {
      key.push(field.date)
      value.push(field[attr])
    })
    this.initEchartLine(key, value)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   导出excel数据
   * @return   {[type]}   [description]
   */
  exportExcel() {
    const url = `${API_ROOT}/sta/live/livePeople?token=${getAccessToken()}export=1&${this.tabLineCateIndex ? `last_time=${this.tabLineCateIndex}` : `start_date=${this.getLineDataByDate[0]}&end_date=${this.getLineDataByDate[1]}`}`
    const newBlank = window.open(url, '_blank')
    const params = {type: this.tabType, export: 1}
    if(this.tabLineCateIndex) {
      params.last_time = this.tabLineCateIndex
    } else {
      params.start_date = this.getLineDataByDate[0]
      params.end_date = this.getLineDataByDate[1]
    }
    this.getLiveStatisticsListApi(params).then(() => {newBlank.close()})
  }
}
</script>
<style lang="scss">
#statistics-course{
	padding: 0;
	.online-course-situation {
		padding: 40px 50px 65px 50px;
		background: white;
		margin-top: 16px;
    border-radius: 4px;
    .page-header{
      font-size:16px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height: 1;
    }
    strong{
      font-size:34px;
      font-weight:500;
      color:rgba(215,171,112,1);
      padding-left: 10px;
    }
	}
  .button-tab-box{
    margin: 35px 0 25px 0;
    overflow: hidden;
    .button-li{
      background:rgba(255,255,255,1);
      border-radius:3px;
      border:1px solid #E2E3E5;
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
      padding: 10px;
      margin-right: 8px;
      cursor: pointer;
    }
    .active-button{
      background:rgba(255,226,102,0.26);
      border-color: #FFE266;
      color: #354048;
    }
    .item{
      display: inline-block;
      .el-input__inner{
        height: 36px;
        line-height: 36px;
        vertical-align: middle;
        margin-top: -1px;
        width: 240px !important;
      }
    }
    .active-picker-date {
      .el-date-editor{
        border-color: #FFE266 !important;
      }
    }
    .item-box{
      float: right;
      .button-export{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #FFE266;
        border: 1px solid #FFE266;
        color: #666666;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;
        width: 124px;
      }
    }
  }
  .echart-tab-box{
    border-bottom: 1px solid #EDEDED;
    line-height: 45px;
    margin-bottom: 60px;
    li{
      display: inline-block;
      margin-right: 70px;
      font-size: 14px;
      color: #666666;
      font-weight: 400;
      cursor: pointer;
      position: relative;
      &:before{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        background: #D7AB70;
        content: '';
        display: block;
        width: 100%;
        opacity: 0;
        visibility: hidden;
      };
    }
    .active-button{
      font-size:14px;
      font-weight:500;
      color:#354048;
      pointer-events: none;
      &:before{
        opacity: 1;
        visibility: visible;
      };
    }
  }
  .course-kind-cate{
    margin-top: 16px;
    display: flex;
    > div {
      background: white;
      box-sizing: border-box;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      width: calc(50% - 8px);
      background: white;
      border-radius: 4px;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 30px;
      &:first-child{
        margin-right: 8px;
      };
      &:last-child{
        margin-left: 8px;
      };
    }
    .section-header {
      font-size:16px;
      font-weight:500;
      color:rgba(102,102,102,1);
      position: relative;
      height: 24px;
      line-height: 24px;
      padding: 0;
      padding-left: 15px;
      &:before{
        width:5px;
        height:18px;
        background:rgba(255,226,102,1);
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      };
    }
    .echart-pink {
      height: 310px;
    }
  }
}
</style>