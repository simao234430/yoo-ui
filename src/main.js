/** init domain config */
import './config'

import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'


import '@/permission' // permission control
import config from '@/defaultSettings'

import router from './router'
import store from './store/'
import Viser from 'viser-vue'
import Antd from 'ant-design-vue'


import '@/utils/filter' // base filter
import 'ant-design-vue/dist/antd.less';  // or 'ant-design-vue/dist/antd.less'
// 按需引入所需组件，统一引入文件
import './components/lazy_antd'
import YooComponents from '@/components/yoo/index'
import hasPermission from '@/utils/hasPermission'
import vueBus from '@/utils/vueBus';
// import '@/components/jeecg/JVxeTable/install'
import '@/assets/less/JAreaLinkage.less'
import VueAreaLinkage from 'vue-area-linkage'
Vue.config.productionTip = false
Vue.use(Storage, config.storageOptions)
// Vue.use(Antd)
Vue.use(Viser)
Vue.use(YooComponents);
Vue.use(VueAreaLinkage);

import {
  ACCESS_TOKEN,
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_PAGE
} from "@/store/mutation-types"

new Vue({
  router,
  store,
  mounted () {
    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true))
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))
    store.commit('TOGGLE_LAYOUT_MODE', Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout))
    store.commit('TOGGLE_FIXED_HEADER', Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader))
    store.commit('TOGGLE_FIXED_SIDERBAR', Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar))
    store.commit('TOGGLE_CONTENT_WIDTH', Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth))
    store.commit('TOGGLE_FIXED_HEADER_HIDDEN', Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader))
    store.commit('TOGGLE_WEAK', Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak))
    store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
    store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
    store.commit('SET_MULTI_PAGE',Vue.ls.get(DEFAULT_MULTI_PAGE,config.multipage))
  },
  render: h => h(App),
}).$mount('#app')
