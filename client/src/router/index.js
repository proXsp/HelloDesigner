import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '编辑器',
      component: () => import('@/pages/editor')
    }
  ]
})
