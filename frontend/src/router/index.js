import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'General',
      component: HelloWorld
    },
    {
      path: '/trackers',
      name: 'Trackers',
      component: HelloWorld
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/stats',
      name: 'Stats',
      component: HelloWorld
    },
  ]
})
