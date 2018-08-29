const webpack = require('webpack')
const path = require('path')
const resolve  = dir => { return path.join(__dirname, dir) }

module.exports = {
  lintOnSave: true,
  configureWebpack: {
  	entry: {
	    vendors: [
	      'vue',
	      'vue-router',
	      'axios',
	      'vuex'
	    ],
	    eleui: [ resolve('src/eleui/index.js') ]
  	},
  	resolve: {
	    alias: {
	      '@': resolve('src'),
	      'IMAGES': resolve('src/assets/images'),
	      'UTIL': resolve('src/util'),
	      'API' : resolve('src/store/api'),
	      'STORE' : resolve('src/store'),
	      'COMPONENTS' : resolve('src/components'),
	      'CONFIGS' : resolve('src/configs'),
	      'STYLES' : resolve('src/styles'),
	      'SCSS' : resolve('src/styles/scss'),
	      'ICONFONT' : resolve('src/assets/iconfont')
	    }
	  },
    plugins: [
      new webpack.ProvidePlugin({
	      mapActions: ['vuex', 'mapActions'],
	      mapMutations: ['vuex', 'mapMutations'],
	      mapGetters: ['vuex', 'mapGetters'],
	      mapState: ['vuex', 'mapState'],
	      $: 'jquery',
      	  jQuery: 'jquery'
	    })
    ]
  }
  // devServer: {
  // 	port: '8081'
  //   proxy: {
  //     '/zike_admin': {
  //       target: 'http://demo2016.thetiger.com.cn/zikeserver',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/zike_admin': ''
  //       },
  //       logLevel: 'debug',
  //     }
  //   }
  // }
}