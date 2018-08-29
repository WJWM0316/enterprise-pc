export default {
  host: process.env.NODE_ENV === 'production' ? '/zikeserver' : '/zike_admin', // api请求前缀
  origin: process.env.NODE_ENV === 'production' ? '' : 'http://demo2016.thetiger.com.cn' // 域名 http://www.zike.com
}
