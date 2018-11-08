<template>
  <div id="statistics-course">
  	<tab-bar></tab-bar>
  	<div class="online-course-situation">
      <div class="page-header">在线课程数<strong>{{courseTypeStatisticsList.currentOnlineLive}}</strong></div>
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
          @click="tabCateLineGetList('yesterday')"
          :class="{'active-button': tabLineCateIndex === 'yesterday'}">昨天</li>
        <li
          :class="{'active-picker-date': tabLineCateIndex === ''}"
          class="item"
          @click="unsetTabCateLineGetList">
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
        <li class="item item-box"><button class="button-export" @click="exportExcel">导出数据</button></li>
      </ul>
      <ul class="echart-tab-box">
        <li :class="{'active-button': tabType === 'newCourses'}" @click="changeTabType('newCourses')">新增课程数</li>
        <li :class="{'active-button': tabType === 'newRegistrations'}" @click="changeTabType('newRegistrations')">新增报名人次</li>
        <li :class="{'active-button': tabType === 3}" @click="changeTabType(3)">新增打卡完成次数</li>
        <li :class="{'active-button': tabType === 4}" @click="changeTabType(4)">人均完成打卡次数</li>
      </ul>
  		<div id="echart-line" style="height: 310px"></div>
  	</div>
    <div class="course-kind-cate">
      <div>
        <div class="section-header">课程类型分布</div>
        <div id="echart-pink1" class="echart-pink"></div>
      </div>
      <div>
        <div class="section-header">课程来源分布</div>
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
    },
    '$route': {
      handler() {
        this.getCourseSourseStatistics()
        this.getCourseTypeStatistics()
        this.getLists({last_time: 'last_month'})
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getUserRelativeStatisticsListApi',
      'getCourseSourseStatisticsListApi',
      'getCourseTypeStatisticsListApi',
      'getCourseStudyStatisticsListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'userRelativeStatisticsList',
      'courseSourseStatisticsList',
      'courseTypeStatisticsList',
      'courseStudyStatisticsList'
    ])
  }
})
export default class pageStatisticsCourse extends Vue {
  getDataByDate = null
  tabLineCateIndex = 'last_month'
  tabType = 'newCourses'
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   折线图
   * @return   {[type]}         [description]
   */
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
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   课程类型
   * @return   {[type]}   [description]
   */
  initEcharPieCourseType(key, value) {
    const option = {
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 0,
        data: key
      },
      series : [
        {
          name: '课程分布',
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
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   课程来源
   * @return   {[type]}         [description]
   */
  initEcharPieCourseSourse(key, value) {
    const option = {
      tooltip : {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 0,
        align: 'auto',
        data: key
      },
      series : [
        {
          name: '课程来源',
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
    this.getCourseStudyStatisticsListApi(params)
        .then(() => {
          const key = []
          const value = []
          this.courseTypeStatisticsList.list.map(field => {
            key.push(field.date)
            value.push(field.newCourses)
          })
          this.initEchartLine(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   获取课程来源分布
   * @return   {[type]}   [description]
   */
  getCourseSourseStatistics() {
    this.getCourseSourseStatisticsListApi()
        .then(() => {
          const key = ['外部导师', '内部导师']
          const value = [
            {
              value: this.courseSourseStatisticsList.outerPercent,
              name: '外部导师'
            },
            {
              value: this.courseSourseStatisticsList.innerPercent,
              name: '内部导师'
            }
          ]
          this.initEcharPieCourseSourse(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   获取直播类型分布
   * @return   {[type]}   [description]
   */
  getCourseTypeStatistics() {
    this.getCourseTypeStatisticsListApi()
        .then(() => {
          const key = []
          const value = []
          this.courseTypeStatisticsList.list.map(field => {
            key.push(field.categoryName)
            value.push({value: field.percent, name: field.categoryName})
          })
          this.initEcharPieCourseType(key, value)
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
  changeTabType(num) {
    this.tabType = num
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   导出excel数据
   * @return   {[type]}   [description]
   */
  exportExcel() {}
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
    .echart-pink{
      height: 310px;
    }
  }
}
</style>