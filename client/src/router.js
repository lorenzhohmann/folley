import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Survey from './views/Survey.vue';
import RouterView from './components/RouterView.vue';

import { i18n } from './main.js';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:lang',
      component: RouterView,
      beforeEnter(to, from, next) {
        const lang = to.params.lang;
        if (!['en', 'de'].includes(lang)) return next('de');

        if (i18n.locale !== lang) {
          i18n.locale = lang;
        }
        return next();
      },
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'survey/:uuid',
          name: 'survey',
          component: Survey
        }
      ]
    },
    {
      path: '*',
      redirect: '/de'
    }
  ]
});
