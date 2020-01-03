import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import Kitchen from './views/Kitchen.vue'
import Welcome from './views/Welcome.vue'
import Thanks from './views/Thanks.vue'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
        title: 'Welcome to Crafty Burgers',
      },
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/ordering',
      meta: {
        title: 'Crafty Burgers',
      },
      name: 'ordering',
      component: Ordering
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
      component: Kitchen
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
});

export default router;