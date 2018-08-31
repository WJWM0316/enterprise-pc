<template>
  <section id="dashboard">
  	<div class="container">
  		<div class="dashboard-part-content">
        <p v-for="(item, index) in 20" :key="index">11111</p>  
      </div>
  		<div class="dashboard-part-right">
  			<div>
	  			<div class="contact-company-box"> <h1>客服电话</h1> <p>15999972494</p> </div>
	  			<div class="beginner-tutorial-box">
	  				<div class="header"> 使用帮助<span>查看更多</span> </div>
	  				<ul> <li v-for="(item, index) in 10" :key="index">如何新建课程？</li> </ul>
	  			</div>
  			</div>
  		</div>
  	</div>
  </section>
</template>
<script>

import Vue from 'vue'
import Component from 'vue-class-component'
@Component({})
export default class PageDashboard extends Vue {
  menberDynamicLists = [
    {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333,
      img: 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg',
      tag: '家'
    },
    {
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333,
      img: 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg',
      tag: '公司'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333,
      img: 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg',
      tag: '家'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333,
      img: 'http://a.hiphotos.baidu.com/zhidao/pic/item/21a4462309f79052782f28490ff3d7ca7bcbd591.jpg',
      tag: '公司'
    }
  ]
  indexMethod (index) {
    return index * 2
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>