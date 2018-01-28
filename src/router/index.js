import Vue from 'vue'
import Router from 'vue-router'

import General from '@/components/General'

import Profile from '@/components/Profile'
import WordCloud from '@/components/Profile/WordCloud'
import TopicsList from '@/components/Profile/TopicsList'
import MostVisited from '@/components/Profile/MostVisited'
import MostWatched from '@/components/Profile/MostWatched'
import History from '@/components/Profile/History'

import Trackers from '@/components/Trackers'
import Contacted from '@/components/Trackers/Contacted'
import Widespread from '@/components/Trackers/Widespread'

import Stats from '@/components/Stats'
import UserStats from '@/components/Stats/UserStats'
import GlobalStats from '@/components/Stats/GlobalStats'

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
