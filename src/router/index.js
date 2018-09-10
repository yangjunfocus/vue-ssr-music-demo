import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Layout = () => import('../views/layout.vue')
const testV = () => import('../views/test.vue')
const playlist = () => import('../views/playlist.vue')
const index = () => import('../views/index.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/playlist/:id', component: playlist,name:'playlist' },
      { path: '/test', component:testV },
      {
        path: '/',
        component: Layout,
        redirect: 'index',
        children: [{
          path: '/',
          component:index,
          name: 'index'
        }]
      }
    ]
  })
}
