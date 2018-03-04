import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Tweets from '@/components/Tweets';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/tweets',
      name: 'Tweets',
      component: Tweets,
    },
  ],
});
