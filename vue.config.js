const webpack = require('webpack')
const path = require('path')
const resolve  = dir => { return path.join(__dirname, dir) }

module.exports = {
  lintOnSave: true,
  // baseUrl: process.env.NODE_ENV === 'production' ? '/tiger/' : '/',
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
	      'ICONFONT' : resolve('src/assets/iconfont'),
	      'FILTERS' : resolve('src/filters'),
	      'COLORS' : resolve('src/eleui/colors')
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
  },
  devServer: {
    proxy: {
      '': {
        target: 'http://web.xplus.ziwork.com/tiger/aaaaa',
        changeOrigin: true,
        pathRewrite: {
          '^/tiger': ''
        },
        logLevel: 'debug'
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/variables.scss";`
      }
    }
  }
}
