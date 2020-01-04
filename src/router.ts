import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import ProblemListView from '@/components/ProblemListView.vue';
import ProblemEditView from '@/components/ProblemEditView.vue';
import SettingsView from '@/components/SettingsView.vue';
import ProblemView from '@/components/ProblemView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    { path: '/problems', component: ProblemListView },
    { path: '/settings', component: SettingsView },
    { path: '/problem/view/:id', name: 'viewProblem', component: ProblemView },
    { path: '/problems/edit/:id', name: 'editProblem', component: ProblemEditView},
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
