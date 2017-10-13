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
      name: 'Landing',
      component: LandingPage,
    },
    {
      path: '/me',
      name: 'Profile',
      component: AboutMe,
    },
    {
      path: '/experience',
      name: 'Experience',
      component: ExperiencePage,
    },
    {
      path: '/tools',
      name: 'TechStack',
      component: ToolsPage,
    },
  ],
});
