<template>
  <div id="auth">
  	<div class="mask"></div>
  	<div class="login-box">
  		<el-form :model="form" ref="form" label-width="80px" :rules="rules">
			  <el-form-item label="用户名" prop="email">
			    <el-input type="text" v-model="form.email" placeholder="邮箱或者手机号码"/>
			  </el-form-item>
			  <el-form-item  label="密码" prop="password">
			    <el-input type="password" v-model="form.password" placeholder="请输入密码"/>
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
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    'token': {
      handler() {
        // this.$router.push({name: 'dashboard'})
      },
      immediate: true
    }
  }
})
export default class pageLogin extends Vue {
	form = {
		email: '',
		password: ''
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
	      	this.$message({message: '正在前往工作台~', type: 'success'})
          setTimeout(() => {
            this.$router.push({name: 'dashboard'})
          }, 2000)
      	})
      	.catch(error => {
      		setTimeout(() => {
      			this.submitBtnClick = !this.submitBtnClick
      			this.submitBtnTxt = '登陆'
      		}, 3000)
      		this.$message.error(`${error.msg}~`);
      	})
  	})
  }

  /**
   * @Author   小书包
   * @DateTime 2018-09-19
   * @detail   回车键登录
   * @return   {[type]}          [description]
   */
  onEnterLogin() {
  	document.onkeydown = () => {
     if (event.keyCode === 13 && this.submitBtnClick) this.submit()
    }
  }

  mounted() {
  	this.onEnterLogin()
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