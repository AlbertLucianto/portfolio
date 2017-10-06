import Vue from 'vue';
import Router from 'vue-router';
import Greeting from '@/components/Greeting';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Greeting',
      component: Greeting,
    },
    {
      path: '/home/',
      name: 'Home',
      component: Home,
    },
  ],
});
