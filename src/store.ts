import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';

import ProblemList from '@/models/ProblemList';

const store = new Vuex.Store({});

@Module({
  name: 'ProblemBankStore',
  store,
  dynamic: true,
})
export default class ProblemBankStore extends VuexModule {
  public problems: ProblemList =  new ProblemList();

}
