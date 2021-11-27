import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/404.vue'),
    meta: {
      layout: 'AppLayoutDefault'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    }
  },
  {
    path: '/teams',
    name: 'TeamsList',
    component: () => import(/* webpackChunkName: "teams-list" */ '../views/teams/TeamsList.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    }
  },
  {
    path: '/teams/:id',
    name: 'TeamsDetail',
    component: () => import(/* webpackChunkName: "teams-detail" */ '../views/teams/TeamsDetail.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    }
  },
  {
    path: '/player/:id',
    name: 'PlayerDetail',
    component: () => import(/* webpackChunkName: "player-detail" */ '../views/people/PlayerDetail.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    }
  },
  {
    path: '/venues',
    name: 'VenuesList',
    component: () => import(/* webpackChunkName: "venues-list" */ '../views/venues/VenuesList.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
