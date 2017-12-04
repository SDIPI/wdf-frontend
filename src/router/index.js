import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import WordCloud from '@/components/Profile/WordCloud'
import Graph from '@/components/Profile/Graph'
import MostVisited from '@/components/Profile/MostVisited'
import MostWatched from '@/components/Profile/MostWatched'
import History from '@/components/Profile/History'
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
      component: Profile,
      children: [
        {
          path: 'wordcloud',
          name: 'WordCloud',
          component: WordCloud
        },
        {
          path: 'graph',
          name: 'Graph',
          component: Graph
        },
        {
          path: 'mostvisited',
          name: 'MostVisited',
          component: MostVisited
        },
        {
          path: 'mostwatched',
          name: 'MostWatched',
          component: MostWatched
        },
        {
          path: 'history',
          name: 'History',
          component: History
        }
      ]
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats
    },
  ]
})
