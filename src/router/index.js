import Vue from 'vue'
import Router from 'vue-router'

import General from '@/components/Pages/General'

import Profile from '@/components/Pages/Profile'
import WordCloud from '@/components/Pages/Profile/WordCloud'
import TopicsList from '@/components/Pages/Profile/TopicsList'
import MostVisited from '@/components/Pages/Profile/MostVisited'
import MostWatched from '@/components/Pages/Profile/MostWatched'
import History from '@/components/Pages/Profile/History'

import Trackers from '@/components/Pages/Trackers'
import Contacted from '@/components/Pages/Trackers/Contacted'
import Widespread from '@/components/Pages/Trackers/Widespread'

import Stats from '@/components/Pages/Stats'
import UserStats from '@/components/Pages/Stats/UserStats'
import GlobalStats from '@/components/Pages/Stats/GlobalStats'

import Settings from '@/components/Pages/Settings'

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
          path: '',
          redirect: 'send'
        },
        {
          path: 'receive',
          name: 'Contacted',
          component: Contacted
        },
        {
          path: 'send',
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
          path: '',
          redirect: 'wordcloud'
        },
        {
          path: 'wordcloud',
          name: 'WordCloud',
          component: WordCloud
        },
        {
          path: 'topics',
          name: 'TopicsList',
          component: TopicsList
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
      component: Stats,
      children: [
        {
          path: '',
          redirect: 'user'
        },
        {
          path: 'user',
          name: 'UserStats',
          component: UserStats
        },
        {
          path: 'global',
          name: 'GlobalStats',
          component: GlobalStats
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
  ]
})
