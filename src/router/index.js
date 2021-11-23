import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "teams-list" */ '../views/teams/TeamsList.vue'),
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
