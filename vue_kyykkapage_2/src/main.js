import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import Highcharts from 'highcharts'
import HighchartsVue from "highcharts-vue";
import Histogram from 'highcharts/modules/histogram-bellcurve';

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
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
