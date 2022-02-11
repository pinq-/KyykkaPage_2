import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Highcharts from 'highcharts'
import HighchartsVue from "highcharts-vue";
import Histogram from 'highcharts/modules/histogram-bellcurve';
import store from './store'
import VueMatomo from 'vue-matomo';

Histogram(Highcharts)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(HighchartsVue, {
	highcharts: Highcharts
})

Vue.config.productionTip = false;
// Vue.prototype.window = window;

Vue.use(VueMatomo, {
  host: "http://pinq.kapsi.fi/matomo/",
  siteId: 2,
  trackerFileName: 'matomo',
  router: router,
  enableLinkTracking: true,
  requireConsent: false,
  trackInitialView: true,
  disableCookies: false,
  enableHeartBeatTimer: false,
  heartBeatTimerInterval: 15,
  debug: false,
  userId: undefined,
  cookieDomain: undefined,
  domains: undefined,
  preInitActions: []
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')