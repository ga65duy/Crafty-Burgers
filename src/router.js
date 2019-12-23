import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import Welcome from './views/Welcome.vue'
import Thanks from './views/Thanks.vue'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/ordering',
      meta: {
        title: 'Crafty Burgers',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/',
      meta: {
        title: 'Welcome to Crafty Burgers',
      },
      name: 'thanks',
      component: Welcome
    },
    {
      path: '/thankyou',
      meta: {
        title: 'Thanks for your order',
      },
      name: 'thanks',
      component: Thanks
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