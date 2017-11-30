import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import General from '@/components/General'
import Trackers from '@/components/Trackers'
import Stats from '@/components/Stats'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'General',
      component: General
    },
    {
      path: '/trackers',
      name: 'Trackers',
      component: Trackers
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
  ]
})
