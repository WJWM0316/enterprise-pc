<template>
  <div id="auth">
  	<div class="mask"></div>
  	<div class="login-box">
  		<el-form :model="form" ref="form" label-width="80px" :rules="rules">
			  <el-form-item label="用户名" prop="email">
			    <el-input type="text" v-model="form.email" />
			  </el-form-item>
			  <el-form-item  label="密码" prop="password">
			    <el-input type="password" v-model="form.password" />
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submit" :loading="!submitBtnClick">{{ submitBtnTxt }}</el-button>
			  </el-form-item>
			</el-form>
  	</div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  methods: {
    ...mapActions(['showMsg', 'loginApi'])
  },
  computed: {
    ...mapGetters(['userInfos'])
  }
})
export default class pageLogin extends Vue {
	form = {
		email: '15999972494',
		password: '123456'
	}
	rules = {
		email: [
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
	}
	// 默认提交表单按钮可以点击
  submitBtnClick = true
  // 默认提交按钮的文案
  submitBtnTxt = '登录'

  submit() {
  	this.$refs['form'].validate((valid) => {
  		this.submitBtnClick = !this.submitBtnClick
  		this.submitBtnTxt = '正在登录'
  		this.loginApi(this.form)
      	.then(res => {
      		this.showMsg({ content: res.data.msg, type: 'success', duration: 3000 })
      		setTimeout(() => {
      			this.$router.push({name: 'dashboard'})
      		}, 3000)
      	})
      	.catch(error => {
      		setTimeout(() => {
      			this.submitBtnClick = !this.submitBtnClick
      			this.submitBtnTxt = '登陆'
      		}, 5000)
      		this.showMsg({ content: error.msg, type: 'error', duration: 3000 })
      	})
  	})
  }
}
</script>
<style lang="scss">
#auth {
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgb(20, 26, 72);
	}
	.login-box {
		width: 400px;
		height: 200px;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		background: white;
		position: fixed;
		border-radius: 5px;
		box-sizing: border-box;
		padding: 20px;
	}
}
</style>