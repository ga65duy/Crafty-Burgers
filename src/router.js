import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import Patty from "./views/Patty.vue";
import Bun from "./views/Bun.vue";
import Extras from "./views/Extras.vue";
import Sides from "./views/Sides.vue";
import Drinks from "./views/Drinks.vue";
import Sauces from "./views/Sauces.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: 'Kraft Burgers',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/buns',
      meta: {
        title: 'Buns',
      },
      name: 'buns',
      component: Bun
    },
    {
      path: '/patty',
      meta: {
        title: 'Patty',
      },
      name: 'patties',
      component: Patty
    },
    {
      path: '/extras',
      meta: {
        title: 'Extras',
      },
      name: 'extras',
      component: Extras
    },
    {
      path: '/sauces',
      meta: {
        title: 'Sauces',
      },
      name: 'sauces',
      component: Sauces
    },
    {
      path: '/sides',
      meta: {
        title: 'Sides',
      },
      name: 'sides',
      component: Sides
    },
    {
      path: '/drinks',
      meta: {
        title: 'Drinks',
      },
      name: 'drinks',
      component: Drinks
    },
    {
      path: '/kitchen',
      meta: {
        title: 'Kitchen',
      },
      name: 'kitchen',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
});

export default router;