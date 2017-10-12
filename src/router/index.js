import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage';
import AboutMe from '@/components/AboutMe';
import ExperiencePage from '@/components/ExperiencePage';
import ToolsPage from '@/components/ToolsPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/me',
      name: 'AboutMe',
      component: AboutMe,
    },
    {
      path: '/experience',
      name: 'ExperiencePage',
      component: ExperiencePage,
    },
    {
      path: '/tools',
      name: 'ToolsPage',
      component: ToolsPage,
    },
  ],
});
