<template>
  <div id="statistics-work-zone">
  	<tab-bar></tab-bar>
  	<div class="online-course-situation">
      <ul class="num-tab-bar">
        <li>
          <div>
            <strong>{{workZoneStatisticsTotalNum.count}}</strong>
            <p>累计圈子</p>
          </div>
        </li>
        <li>
          <div>
            <strong>{{workZoneStatisticsTotalNum.post}}</strong>
            <p>累计帖子</p>
          </div>
        </li>
        <li>
          <div>
            <strong>{{workZoneStatisticsTotalNum.file}}</strong>
            <p>累计文件</p>
          </div>
        </li>
        <li>
          <div>
            <strong>{{workZoneStatisticsTotalNum.picture}}</strong>
            <p>累计图片</p>
          </div>
        </li>
        <li>
          <div>
            <strong>{{workZoneStatisticsTotalNum.vedios}}</strong>
            <p>累计视频</p>
          </div>
        </li>
        <li>
          <div>
            <strong>{{workZoneStatisticsTotalNum.urls}}</strong>
            <p>累计链接</p>
          </div>
        </li>
      </ul>
      <ul class="button-tab-box">
        <li
          class="item button-li"
          :class="{'active-button': tabLineCateIndex === 'last_month'}"
          @click="tabCateLineGetList('last_month')">最近30天</li>
        <li
          class="item button-li"
          :class="{'active-button': tabLineCateIndex === 'last_seven_days'}"
          @click="tabCateLineGetList('last_seven_days')">最近7天</li>
   <!--      <li
          class="item button-li"
          :class="{'active-button': tabLineCateIndex === 'yesterday'}" 
          @click="tabCateLineGetList('yesterday')">昨天</li> -->
        <li
          class="item"
          :class="{'active-picker-date': tabLineCateIndex === ''}">
          <el-date-picker
            v-model="getLineDataByDate"
            :picker-options="pickerOptions"
            @change="changeLineDataByDate"
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
        <li :class="{'active-button': tabType === 1}" @click="changeTabType({last_time: tabLineCateIndex, type: 1}, 1)">新增帖子</li>
        <li :class="{'active-button': tabType === 2}" @click="changeTabType({last_time: tabLineCateIndex, type: 2}, 2)">新增文件</li>
        <li :class="{'active-button': tabType === 3}" @click="changeTabType({last_time: tabLineCateIndex, type: 3}, 3)">新增图片</li>
        <li :class="{'active-button': tabType === 5}" @click="changeTabType({last_time: tabLineCateIndex, type: 5}, 5)">新增视频</li>
        <li :class="{'active-button': tabType === 4}" @click="changeTabType({last_time: tabLineCateIndex, type: 4}, 4)">新增链接</li>
      </ul>
  		<div id="echart-line" style="height: 310px"></div>
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
          // this.tabLineCateIndex = ''
          // this.getLineLists({start_date: list[0], end_date: list[1], type: this.tabType})
        }
      },
      immediate: true
    },
    '$route': {
      handler () {
        this.getLineLists({last_time: 'last_month', type: this.tabType})
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getWorkZoneStatisticsListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'workZoneStatisticsList',
      'workZoneStatisticsTotalNum'
    ])
  }
})
export default class pageStatisticsCourse extends Vue {
  getLineDataByDate = null
  tabLineCateIndex = 'last_month'
  // 类型（ 1帖子，2文件，3图片，4链接，5视频）
  tabType = 1
  // 时间限制
  pickerOptions = {
    disabledDate(time) {
      let curDate = (new Date()).getTime()
      let two = 60 * 24 * 3600 * 1000
      let twoMonths = curDate - two
      return time.getTime() > Date.now() - 8.64e7 || time.getTime() < twoMonths
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
      tooltip: {
        trigger: 'axis',
        backgroundColor:'white',
        color:'black',
        borderWidth:'1',
        borderColor:'#dcdcdc',
        textStyle:{
          color:'black',
        },
        formatter(params, ticket, callback) {
          return `
            <div>
              <p style="line-height: 1.5;margin: 0;">数值： ${params[0].value}</p>
              <p style="line-height: 1.5;margin: 0;">时间： ${params[0].name}</p>
            </div>
          `
        },
        axisPointer: {
          lineStyle: {
            color: '#dcdcdc'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: key,
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: 'black',
            width: 1
          }
        },
        axisLabel: {
          textStyle: {
            color: 'black',//坐标值得具体的颜色
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: 'black',
            width: 1
          }
        },
        axisLabel: {
          textStyle: {
            color: 'black',//坐标值得具体的颜色
          }
        }
      },
      series: [{
        data: value,
        type: 'line',
        itemStyle : {
          normal : {
            color:'#5D62B4',
            lineStyle: {  
              color: '#5D62B4'  
            }  
          }  
        }
      }]
    }
		const myChart = echarts.init(document.getElementById('echart-line'))
		myChart.setOption(option, true)
	}
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   分类去获取数据
   * @return   {[type]}   [description]
   */
  tabCateLineGetList(attr) {
    this.tabLineCateIndex = attr
    this.getLineLists({last_time: attr, type: this.tabType})
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   对列表数据进行分类
   * @return   {[type]}        [description]
   */
  changeTabType(params, num) {
    this.tabType = num
    if(this.tabLineCateIndex) {
      this.getLineLists(params)
    } else {
      this.getLineLists({start_date: this.getLineDataByDate[0], end_date: this.getLineDataByDate[1], type: this.tabType})
    }
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   到处表格
   * @return   {[type]}   [description]
   */
  exportExcel() {
    const url = `${API_ROOT}/job/statistic?token=${getAccessToken()}&export=1&type=${this.tabType}&${this.tabLineCateIndex ? `last_time=${this.tabLineCateIndex}` : `start_date=${this.getLineDataByDate[0]}&end_date=${this.getLineDataByDate[1]}`}`
    const newBlank = window.open(url, '_blank')
    const params = {type: this.tabType, export: 1}
    if(this.tabLineCateIndex) {
      params.last_time = this.tabLineCateIndex
    } else {
      params.start_date = this.getLineDataByDate[0]
      params.end_date = this.getLineDataByDate[1]
    }
    this.getWorkZoneStatisticsListApi(params).then(() => {newBlank.close()})
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   分类获取列表数据
   * @return   {[type]}          [description]
   */
  getLineLists(params) {
    this.getWorkZoneStatisticsListApi(params)
        .then(() => {
          const key = []
          const value = []
          this.workZoneStatisticsList.map(field => {
            key.push(field.daily)
            value.push(field.number)
          })
          this.initEchartLine(key, value)
        })
  }

  /**
   * @Author   小书包
   * @DateTime 2018-11-19
   * @detail   日期筛选
   * @return   {[type]}   [description]
   */
  changeLineDataByDate() {
    if(this.getLineDataByDate[0] === this.getLineDataByDate[1]) {
      this.getLineDataByDate = null
      this.$message.error('结束日期必须大于开始日期~')
    } else {
      this.tabLineCateIndex = ''
      this.getLineLists({start_date: this.getLineDataByDate[0], end_date: this.getLineDataByDate[1]})
    }
  }
}
</script>
<style lang="scss">
#statistics-work-zone{
	padding: 0;
	.online-course-situation {
		padding: 40px 50px 65px 50px;
		background: white;
		margin-top: 16px;
    border-radius: 4px;
	}
  .num-tab-bar {
    display: flex;
    margin-bottom: 42px;
    li{
      flex-grow: 1;
      text-align: center;
      > div{
        display: inline-block;
        text-align: left;
      }
    }
    strong{
      font-size:34px;
      font-weight:500;
      color:rgba(215,171,112,1);
      line-height:1;
      margin: 0;
    }
    p{
      font-size:16px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:1;
      margin: 0;
      margin-top: 5px;
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
      color: #666666;
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
        margin-left: 12px;
      }
      .el-range__icon{
        margin-top: -5px;
      }
      .el-range-separator {
        line-height: 28px;
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
}
</style>