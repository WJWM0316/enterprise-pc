<template>
  <div id="statistics-course">
  	<tab-bar></tab-bar>
    <div class="course-kind-cate">
      <div>
        <div class="section-header">导师类型分布</div>
        <div id="echart-pink1" style="height: 310px"></div>
      </div>
      <div>
        <div class="section-header">各部门导师分布</div>
        <div id="echart-pink2" style="height: 310px"></div>
      </div>
    </div>
    <div class="online-course-situation">
      <div class="section-header">内部各部门课程和直播数</div>
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
        <li :class="{'active-button': tabType === 'create'}" @click="changeTabType('create')">新增数量</li>
        <li :class="{'active-button': tabType === 'online'}" @click="changeTabType('online')">在线数量</li>
      </ul>
      <div id="echart-line" style="height: 350px"></div>
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
      handler () {
        this.getLists({last_time: 'last_month'})
        this.getDepartmentSourseStatisticsList()
        this.getTutorTypeStatisticsList()
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'getLiveAndCourseStatisticsListApi',
      'getDepartmentSourseStatisticsListApi',
      'getTutorTypeStatisticsListApi'
    ])
  },
  computed: {
    ...mapGetters([
      'liveAndCourseStatisticsList',
      'departmentSourseStatisticsList',
      'tutorTypeStatisticsList'
    ])
  }
})
export default class pageStatisticsCourse extends Vue {
  getLineDataByDate = null
  tabLineCateIndex = 'last_month'
  tabType = 'create'
  // 时间限制
  pickerOptions = {
    disabledDate(time) {
      let curDate = (new Date()).getTime()
      let two = 60 * 24 * 3600 * 1000
      let twoMonths = curDate - two
      return time.getTime() > Date.now() || time.getTime() < twoMonths
    }
  }
  initEchartLine(key, value1, value2) {
    const option = {
      tooltip : {
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
              <p style="line-height: 1.5;margin: 0;">${params[0].seriesName}： ${params[0].data}</p>
              <p style="line-height: 1.5;margin: 0;">${params[1].seriesName}： ${params[1].data}</p>
              <p style="line-height: 1.5;margin: 0;">分组类型： ${params[0].axisValueLabel}</p>
            </div>
          `
        }
      },
      legend: {
        data: ['创建课程', '创建直播'],
        itemWidth: 10,
        itemHeight: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis:  {
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        data: key
      },
      series: [
        {
          name: '创建课程',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: value1,
          // barWidth: 40,
          color: ['#FFC533']
        },
        {
          name: '创建直播',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: value2,
          // barWidth: 40,
          color: ['#5D62B4']
        }
      ]
    }
    const myChart = echarts.init(document.getElementById('echart-line'))
    myChart.setOption(option, true)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-09
   * @detail   部门分布
   * @return   {[type]}         [description]
   */
  initEcharPieDepartmentSourse(key, value) {
    const option = {
      tooltip : {
        trigger: 'item',
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
              <p style="line-height: 1.5;margin: 0;">数值： ${params.data.value}（${params.percent}%）</p>
              <p style="line-height: 1.5;margin: 0;">分类： ${params.data.name}</p>
            </div>
          `
        }
      },
      legend: {
        orient: 'vertical',
        right: 0,
        itemWidth: 10,
        itemHeight: 10,
        data: key
      },
      series : [
        {
          name: '部门分布',
          type: 'pie',
          radius : '80%',
          center: ['50%', '50%'],
          data: value,
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              // position: 'inside',
              formatter(params, ticket, callback) {
                return `${params.data.groupName}`
              },
              textStyle : {                   
                align : 'center',
                baseline : 'middle',
                fontSize : 12
              }
            }
          },
          color: ['#5D62B4', '#2AC3BE', '#F2726F', '#FFC533', '#8EED7E', '#434348', '#04476C', '#04476C', '#4D998D', '#77BD99', '#A7DCA6', '#CEF199']
        }
      ]
    }
    const myChart = echarts.init(document.getElementById('echart-pink2'))
    myChart.setOption(option, true)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-09
   * @detail   导师分布
   * @return   {[type]}         [description]
   */
  initEchartPieTutorType(key, value) {
    const option = {
      grid: {
        width: '50%'
      },
      tooltip : {
        trigger: 'item',
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
              <p style="line-height: 1.5;margin: 0;">数值： ${params.data.value}（${params.percent}%）</p>
              <p style="line-height: 1.5;margin: 0;">导师类型： ${params.data.name}</p>
            </div>
          `
        }
        // formatter(params, ticket, callback) {
        //   return `<div>${params.data.name}<br/>${params.data.value} (${params.percent}%)</div>`
        // }
      },
      legend: {
        orient: 'vertical',
        right: 0,
        align: 'auto',
        itemWidth: 10,
        itemHeight: 10,
        data: key
      },
      series : [
        {
          name: '导师分布',
          type: 'pie',
          radius : '80%',
          center: ['50%', '50%'],
          data: value,
          // avoidLabelOverlap: false,
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'inside',
          //     formatter(params, ticket, callback) {
          //       return `${params.percent}%`
          //     },
          //     textStyle : {                   
          //       align : 'center',
          //       baseline : 'middle',
          //       fontSize : 12
          //     }
          //   }
          // },
          color: ['#5D62B4', '#2AC3BE', '#F2726F', '#FFC533', '#8EED7E', '#434348', '#04476C', '#04476C', '#4D998D', '#77BD99', '#A7DCA6', '#CEF199']
        }
      ]
    }
    const myChart = echarts.init(document.getElementById('echart-pink1'))
    myChart.setOption(option, true)
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
    const value1 = []
    const value2 = []
    this.liveAndCourseStatisticsList[`${this.tabType}List`].map(field => {
      key.push(field.key)
      value1.unshift(field[`${this.tabType}Course`])
      value2.unshift(field[`${this.tabType}Live`])
    })
    this.initEchartLine(key, value1, value2)
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   导出excel数据
   * @return   {[type]}   [description]
   */
  exportExcel() {
    const url = `${API_ROOT}/sta/group/liveAndCourse?token=${getAccessToken()}&export=1&${this.tabLineCateIndex ? `last_time=${this.tabLineCateIndex}` : `start_date=${this.getLineDataByDate[0]}&end_date=${this.getLineDataByDate[1]}`}`
    const newBlank = window.open(url, '_blank')
    const params = {type: this.tabType, export: 1}
    if(this.tabLineCateIndex) {
      params.last_time = this.tabLineCateIndex
    } else {
      params.start_date = this.getLineDataByDate[0]
      params.end_date = this.getLineDataByDate[1]
    }
    this.getLiveAndCourseStatisticsListApi(params).then(() => {newBlank.close()})
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-08
   * @detail   通过周期数据
   * @return   {[type]}          [description]
   */
  getLists(params) {
    this.getLiveAndCourseStatisticsListApi(params)
        .then(() => {
          const key = []
          const value1 = []
          const value2 = []
          this.liveAndCourseStatisticsList[`${this.tabType}List`].map(field => {
            key.push(field.key)
            value1.unshift(field[`${this.tabType}Course`])
            value2.unshift(field[`${this.tabType}Live`])
          })
          this.initEchartLine(key, value1, value2)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-09
   * @detail   获取部门导师分布
   * @return   {[type]}   [description]
   */
  getDepartmentSourseStatisticsList() {
    this.getDepartmentSourseStatisticsListApi()
        .then(() => {
          const key = []
          const value = []
          this.departmentSourseStatisticsList.map(field => {
            key.push(field.groupName)
            value.push({value: field.tutorCount, groupName: field.groupName, name: field.groupName})
          })
          this.initEcharPieDepartmentSourse(key, value)
        })
  }
  /**
   * @Author   小书包
   * @DateTime 2018-11-09
   * @detail   获取内外部导师比例
   * @return   {[type]}   [description]
   */
  getTutorTypeStatisticsList() {
    this.getTutorTypeStatisticsListApi()
        .then(() => {
          const key = ['外部导师', '内部导师']
          const value = []
          if(this.tutorTypeStatisticsList.externalCount) {
            key.push('外部导师')
            value.push({value: this.tutorTypeStatisticsList.externalCount, name: '外部导师'})
          }
          if(this.tutorTypeStatisticsList.internalCount) {
            key.push('内部导师')
            value.push({value: this.tutorTypeStatisticsList.internalCount, name: '内部导师'})
          }
          this.initEchartPieTutorType(key, value)
        })
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
  }
}
</style>