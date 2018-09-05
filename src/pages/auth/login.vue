<template>
  <div id="auth">
  	<div class="mask"></div>
  	<div class="login-box">
  		<el-form :model="form" ref="form" label-width="80px" :rules="rules">
			  <el-form-item label="用户名" prop="userName">
			    <el-input v-model="form.userName" />
			  </el-form-item>
			  <el-form-item  label="密码" prop="password">
			    <el-input v-model="form.password" />
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submit">提交</el-button>
			  </el-form-item>
			</el-form>
  	</div>
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class pageLogin extends Vue {
	form = {
		userName: '',
		password: ''
	}
	rules = {
		userName:
		[
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password:
		[
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
	}
	submit() {
		const userNameField = new Promise((resolve, reject) => {
			// this.$refs.form.validateField('userName')
		  reject('成功了')
		})
		const passwordField = new Promise((resolve, reject) => {
			// this.$refs['form'].validateField('password')
		  reject('成功了')
		})
		Promise.all([userNameField, passwordField]).then((result) => {
		  console.log(result)
		}).catch((error) => {
		  console.log(error)
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
		background: pink;
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