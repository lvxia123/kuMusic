import Vue from 'vue'
import App from './App'
import store from './store/index.js'
// import FlexLayout from './components/phj-flex/'

// Vue.use(FlexLayout)
Vue.config.productionTip = false
//将封装好的请求函数，挂载在main.js
import {myRequest} from './request/requst.js'
Vue.prototype.$myReq = myRequest;

Vue.prototype.store=store
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
