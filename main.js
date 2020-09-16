import Vue from 'vue'
import App from './App'
// import FlexLayout from './components/phj-flex/'

// Vue.use(FlexLayout)
Vue.config.productionTip = false
//将封装好的请求函数，挂载在main.js
import {myRequest} from './request/requst.js'
Vue.prototype.$myReq = myRequest;

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
