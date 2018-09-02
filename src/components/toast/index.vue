<template>
	<div id="zike-toast">
	  <div class="toast" v-if="message.content" transition="toast" keep-alive="keep-alive">
	    <div class="toast-content">
        <i :class="`el-icon-${message.type}`"></i>
	    	<span style="margin-left: 5px;">{{ message.content }}</span>
	    </div>
	  </div>
	</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
	/* eslint-disable */
	watch: {
    message: {
      handler(val) {
        // 监测 message 的内容，如果非空，就五秒后隐藏
        if (val.content !== '') {
          setTimeout(() => this.hideMsg(), this.message.duration || 5000)
        }
      },
      immediate: true
    },
  },
  computed: {
  	...mapGetters(['message'])
  },
  methods: {
  	...mapActions(['showMsg', 'hideMsg'])
  }
  /* eslint-enable */
})

export default class PageToast extends Vue {}
</script>
<style lang="scss" scoped>
#zike-toast {
  .toast {
    transition: opacity .8s ease;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 50px;
    width: 340px;
    margin-left: -170px;
    margin-top: - 25px;
    background: rgba(0,0,0,.8);
    color: white;
    opacity: .7;
    text-align: center;
    line-height: 50px;
  }
  .toast-enter,
  .toast-leave {
    opacity: 0
  }
}
</style>