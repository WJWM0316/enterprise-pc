const webpack = require('webpack')
const path = require('path')
const resolve  = dir => { return path.join(__dirname, dir) }

const baseUrl = process.env.NODE_ENV === 'development' ? '/' : './'

module.exports = {
  lintOnSave: true,
  baseUrl: 'laohu',
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
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}