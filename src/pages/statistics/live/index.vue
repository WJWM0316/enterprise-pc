<template>
  <div id="statistics-course">
  	<tab-bar></tab-bar>
  	<div class="online-course-situation">
      <div class="page-header">在线课程数<strong>19</strong></div>
      <ul class="button-tab-box">
        <li class="item button-li active-button">最近30天</li>
        <li class="item button-li">最近7天</li>
        <li class="item button-li">昨天</li>
        <li class="item">
          <el-date-picker
            v-model="getDataByDate"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </li>
        <li class="item item-box"><button class="button-export">导出数据</button></li>
      </ul>
      <ul class="echart-tab-box">
        <li class="active-button">新增课程数</li>
        <li>新增报名人次</li>
        <li>新增打卡完成次数</li>
        <li>人均完成打卡次数</li>
      </ul>
  		<div id="echart-line" style="height: 310px"></div>
  	</div>
    <div class="course-kind-cate">
      <div>
        <div id="echart-pink1" style="height: 310px"></div>
      </div>
      <div>
        <div id="echart-pink2" style="height: 310px"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import TabBar from '../tabBar.vue'
const echarts = require('echarts')

@Component({
	components: {
    TabBar
  },
  watch: {
    getDataByDate: {
      handler(list) {
        if(list) {
          this.getUserRelativeStatisticsListApi({start_date: list[0], end_date: list[1]})
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getUserRelativeStatisticsListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'userRelativeStatisticsList'
    ])
  }
})
export default class pageStatisticsCourse extends Vue {
  getDataByDate = null
	myChart = null
	init1(key, value) {
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
		this.myChart = echarts.init(document.getElementById('echart-line'))
		this.myChart.setOption(option, true)
	}
  init2() {
    const option = {
      grid: {
        width: '5000px'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: '50%',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
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
    this.myChart = echarts.init(document.getElementById('echart-pink1'))
    this.myChart.setOption(option, true)
  }
  init3() {
    const option = {
      grid: {
        width: '50%'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: 0,
        align: 'auto',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
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
    this.myChart = echarts.init(document.getElementById('echart-pink2'))
    this.myChart.setOption(option, true)
  }
	mounted() {
    const key1 = ['00.00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
    const value1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
		this.init1(key1, value1)
    this.init2()
    this.init3()
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
  }
}
</style>