import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../public/icon-font/iconfont.css'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

// 用于处理标题的mixin
Vue.mixin(titleMixin)
Vue.use(ElementUI);
Vue.http = Vue.prototype.$http = axios
// 注册全局实用程序过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 公开一个工厂函数，创建一个新的存储集，路由器，
// 每次调用的应用程序实例(为每个SSR请求调用)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // 将路由器与vuex存储同步。
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
