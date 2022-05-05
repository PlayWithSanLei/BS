import Vue from 'vue'
import VueCesium from 'vue-cesium'
import lang from 'vue-cesium/lang/zh-hans'
import VueiClient from '@supermap/vue-iclient-mapboxgl'
import App from './App'
import router from './router'
import './assets/global.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import {MessageBox} from "element-ui"

Vue.config.productionTip = false
//配置请求的根路径
axios.defaults.baseURL = 'http://59.49.106.69:9426/api/v1/'
// 开发测试api
// axios.defaults.baseURL = 'http://121.196.144.74:8100/api/v1/'
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  // 最后必须return config
  return config
})
Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm


Vue.use(ElementUI)
Vue.use(VueCesium, {lang: lang})
Vue.use(VueiClient, { cesiumPath: '../static/libs/Cesium/Cesium.js' })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
