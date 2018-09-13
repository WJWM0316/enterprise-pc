<template>
  <section id="dashboard">
  	<div class="container">
  		<div class="dashboard-part-content">
        <section class="header">
          <h1>深圳市有限元公司</h1>
        </section>
      </div>
  		<div class="dashboard-part-right">
  			<div class="contact-company-box"> <h1>客服电话</h1> <p>15999972494</p> </div>
  			<div class="beginner-tutorial-box">
  				<div class="header"> 使用帮助<span>查看更多</span> </div>
  				<ul> <li v-for="(item, index) in 10" :key="index">如何新建课程？</li> </ul>
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