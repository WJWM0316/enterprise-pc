<template>
  <div id="statistics-member">
  	<tab-bar></tab-bar>
  	<div class="online-course-situation">
      <div class="page-header">累计总学习天数<strong>{{userRelativeStatisticsList.totalStudyPeople}}</strong></div>
      <ul class="button-tab-box">
        <li
          class="item button-li"
          :class="{'active-button': tabLineCateIndex === 'last_month'}"
          @click="tabCateLineGetList({last_time: 'last_month'}, 'last_month')">
            最近30天
        </li>
        <li
          class="item button-li"
          :class="{'active-button': tabLineCateIndex === 'last_seven_days'}"
          @click="tabCateLineGetList({last_time: 'last_seven_days'}, 'last_seven_days')">
            最近7天
        </li>
        <li
          class="item button-li"
          :class="{'active-button': tabLineCateIndex === 'last_day'}"
          @click="tabCateLineGetList({last_time: 'last_day'}, 'last_day')">
            昨天
        </li>
        <li
          class="item"
          :class="{'active-picker-date': tabLineCateIndex === ''}"
          @click="unsetTabCateLineGetList">
          <el-date-picker
            v-model="getLineDataByDate"
            type="daterange"
            :picker-options="pickerOptions"
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
        <li :class="{'active-button': tabLineIndex === 'joinStudyPeople'}" @click="tabLineChange('joinStudyPeople')">参与学习人次</li>
        <li :class="{'active-button': tabLineIndex === 'avgJoinCourse'}" @click="tabLineChange('avgJoinCourse')">人均参与课程</li>
        <li :class="{'active-button': tabLineIndex === 'avgJoinLive'}" @click="tabLineChange('avgJoinLive')">人均参与直播</li>
        <li :class="{'active-button': tabLineIndex === 'studyPeople'}" @click="tabLineChange('studyPeople')">累计总学习天数</li>
      </ul>
  		<div id="echart-line" style="height: 310px"></div>
  	</div>
    <div class="course-kind-cate">
      <div class="section-header">部门总学习天数</div>
      <ul class="button-tab-box">
        <li
          class="item button-li"
          :class="{'active-button': tabCylindricalCateIndex === 'last_month'}"
          @click="tabCateCylindricalGetList({last_time: 'last_month'}, 'last_month')">
            最近30天
        </li>
        <li
          class="item button-li"
          :class="{'active-button': tabCylindricalCateIndex === 'last_seven_days'}"
          @click="tabCateCylindricalGetList({last_time: 'last_seven_days'}, 'last_seven_days')">
            最近7天
        </li>
        <li
          class="item button-li"
          :class="{'active-button': tabCylindricalCateIndex === 'last_day'}"
          @click="tabCateCylindricalGetList({last_time: 'last_day'}, 'last_day')">
            昨天
        </li>
        <li
          class="item"
          :class="{'active-picker-date': tabCylindricalCateIndex === ''}"
          @click="unsettabCateCylindricalGetList">
          <el-date-picker
            v-model="getCylindricalDataByDate"
            type="daterange"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </li>
      </ul>
      <div id="echart-pink1" class="echart-pink1"></div>
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
          this.getLineLists({start_date: list[0], end_date: list[1]})
        }
      },
      immediate: true
    },
    getCylindricalDataByDate: {
      handler(list) {
        if(list) {
          this.getCateDepartmentLineLists({start_date: list[0], end_date: list[1]})
        }
      },
      immediate: true
    },
    '$route': {
      handler () {
        this.getLineLists({last_time: 'last_month'})
        this.getCateDepartmentLineLists({last_time: 'last_month'})
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getUserRelativeStatisticsListApi',
      'getDeparmentRelativeStatisticsListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'userRelativeStatisticsList',
      'deparmentRelativeStatisticsList'
    ])
  }
})
export default class pageStatisticsCourse extends Vue {
  getLineDataByDate = null
  getCylindricalDataByDate = null
  tabLineIndex = 'joinStudyPeople'
  tabLineCateIndex = 'last_month'
  tabCylindricalCateIndex = 'last_month'
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
        // 跟随x轴的线
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
  initEchartCylindrical(key, value) {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
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
              <p style="line-height: 1.5;margin: 0;">分组类型： ${params[0].name}</p>
            </div>
          `
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        show : false,
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        show : true,
        axisLine: {
          show: false
        },
        axisTick:{
          show:false
        },
        splitLine:{
          show:false
        },
        data: key
      },
      series: [
        {
          type: 'bar',
          data: value,
          // barWidth: 40,
          color: ['#5D62B4', '#2AC3BE', '#F2726F', '#FFC533', '#8EED7E', '#434348', '#04476C', '#04476C', '#4D998D', '#77BD99', '#A7DCA6', '#CEF199']
        }
      ]
    }
    const myChart = echarts.init(document.getElementById('echart-pink1'))
    myChart.setOption(option, true)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   分类去获取数据
   * @return   {[type]}   [description]
   */
  tabCateLineGetList(params, attr) {
    this.tabLineCateIndex = attr
    this.getLineLists(params)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   分类去获取数据
   * @return   {[type]}   [description]
   */
  tabCateCylindricalGetList(params, attr) {
    this.tabCylindricalCateIndex = attr
    this.getCateDepartmentLineLists(params)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   当前tab未日期
   * @return   {[type]}   [description]
   */
  unsetTabCateLineGetList() {
    this.tabLineCateIndex = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   当前部门tab未日期
   * @return   {[type]}   [description]
   */
  unsettabCateCylindricalGetList() {
    this.tabCylindricalCateIndex = ''
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   对列表数据进行分类
   * @return   {[type]}        [description]
   */
  tabLineChange(attr) {
    const key = []
    const value = []
    this.tabLineIndex = attr
    this.userRelativeStatisticsList.list.map(field => {
      key.push(field.key)
      value.push(Number(field[attr]))
    })
    this.initEchartLine(key, value)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   分类获取部门列表数据
   * @return   {[type]}          [description]
   */
  getCateDepartmentLineLists(params) {
    this.getDeparmentRelativeStatisticsListApi(params)
        .then(() => {
          const key = []
          const value = []
          this.deparmentRelativeStatisticsList.map(field => {
            key.unshift(field.key)
            value.unshift(field.studyPeople)
          })
          this.initEchartCylindrical(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-07
   * @detail   分类获取列表数据
   * @return   {[type]}          [description]
   */
  getLineLists(params) {
    this.getUserRelativeStatisticsListApi(params)
        .then(() => {
          const key = []
          const value = []
          this.userRelativeStatisticsList.list.map(field => {
            key.push(field.key)
            value.push(Number(field[this.tabLineIndex]))
          })
          this.initEchartLine(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   导出excel数据
   * @return   {[type]}   [description]
   */
  exportExcel() {
    const url = `${API_ROOT}/sta/user?token=${getAccessToken()}&export=1&${this.tabLineCateIndex ? `last_time=${this.tabLineCateIndex}` : `start_date=${this.getLineDataByDate[0]}&end_date=${this.getLineDataByDate[1]}`}`
    const newBlank = window.open(url, '_blank')
    const params = {type: this.tabType, export: 1}
    if(this.tabLineCateIndex) {
      params.last_time = this.tabLineCateIndex
    } else {
      params.start_date = this.getLineDataByDate[0]
      params.end_date = this.getLineDataByDate[1]
    }
    this.getUserRelativeStatisticsListApi(params).then(() => {newBlank.close()})
  }
}
</script>
<style lang="scss">
#statistics-member{
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
  .course-kind-cate{
    margin-top: 16px;
    padding: 30px 40px;
    background: white;
    .button-tab-box{
      margin-bottom: 65px;
    }
    .echart-pink1 {
      background: white;
      box-sizing: border-box;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      background: white;
      border-radius: 4px;
      overflow: hidden;
      box-sizing: border-box;
      width: 950px;
      height: 310px;
      margin: 0 auto;
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
  }
}
</style>