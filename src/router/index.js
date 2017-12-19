import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import WordCloud from '@/components/Profile/WordCloud'
import Graph from '@/components/Profile/Graph'
import MostVisited from '@/components/Profile/MostVisited'
import MostWatched from '@/components/Profile/MostWatched'
import History from '@/components/Profile/History'
import Contacted from '@/components/Trackers/Contacted'
import Flow from '@/components/Trackers/Flow'
import TrackerStats from '@/components/Trackers/Stats'
import Widespread from '@/components/Trackers/Widespread'
import General from '@/components/General'
import Trackers from '@/components/Trackers'
import Stats from '@/components/Stats'
import Settings from '@/components/Settings'

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
      component: Trackers,
      children: [
        {
          path: 'contacted',
          name: 'Contacted',
          component: Contacted
        },
        {
          path: 'flow',
          name: 'Flow',
          component: Flow
        },
        {
          path: 'stats',
          name: 'TrackerStats',
          component: TrackerStats
        },
        {
          path: 'widespread',
          name: 'Widespread',
          component: Widespread
        }
      ]
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
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
  ]
})
