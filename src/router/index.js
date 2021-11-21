import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "AppLayoutDashboard",
    },
  },
  {
    path: "/teams",
    name: "Teams",
    component: () =>
      import(/* webpackChunkName: "teams" */ "../views/Teams.vue"),
    meta: {
      layout: "AppLayoutDashboard",
    },
  },
  {
    path: "/venues",
    name: "Venues",
    component: () =>
      import(/* webpackChunkName: "venues" */ "../views/Venues.vue"),
    meta: {
      layout: "AppLayoutDashboard",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
