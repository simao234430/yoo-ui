
import axios from 'axios'

import { VueAxios } from './axios'

/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/jeecg-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
let apiBaseUrl = window._CONFIG['domianURL'] || "/yoo-boot";
//console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  //baseURL: '/jeecg-boot',
  baseURL: apiBaseUrl, // api base_url
  timeout: 9000 // 请求超时时间
})

const err = (error) => {

  return Promise.reject(error)
};

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}