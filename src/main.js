import Vue from 'vue'
import App from './App.vue'
import TrendChart from "vue-trend-chart";

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faWalking,
  faSync,
  faHeart,
  faMapPin,
  faBrain
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faWalking, faSync, faHeart, faMapPin, faBrain)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(TrendChart);


new Vue({
  render: h => h(App),
}).$mount('#app')