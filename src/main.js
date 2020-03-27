import Vue from 'vue'
import App from './App'
import store from './store'
import md5 from 'md5'
import { mapState } from "vuex";
import { request, getIn } from '@/utils';

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$getIn = getIn
Vue.prototype.$md5 = md5
Vue.prototype.mapState = mapState

const app = new Vue(App)
app.$mount()
