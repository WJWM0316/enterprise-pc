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
import pageDashboard from './index'
export default pageDashboard
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>