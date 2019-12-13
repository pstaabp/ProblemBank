import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import ProblemBankStore from './store';

const store = new Vuex.Store({
  modules: {
    myMod: ProblemBankStore,
  },
});

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
