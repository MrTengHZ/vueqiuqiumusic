import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'


Vue.config.productionTip = false

import 'vant/lib/index.css';
Vue.use(Vant,VueMeta)
// 字体图标
import "./assets/font/iconfont.css"
import "./assets/font2/iconfont.css"
import "swiper/css/swiper.min.css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
