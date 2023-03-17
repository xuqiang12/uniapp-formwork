import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif


import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import $validate from "./assets/javascript/validate";
Vue.prototype.$validate = $validate;

import loadingPage from '@/components/BaseCom/loading-page/index.vue'
Vue.component('loading-page', loadingPage)
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
