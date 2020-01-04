
import {VuexModule, Module, Action, Mutation, getModule} from 'vuex-module-decorators';

import {Problem} from '../models';

import store from '@/store';
import * as api from '@/store/api';

const name = 'problems';

// this is to prevent an error occur with a hot reloading.

if (store.state[name]) {
  store.unregisterModule(name);
}

@Module({
  namespaced: true,
  name: 'problems',
  store,
  dynamic: true,
})
export class ProblemsModule extends VuexModule {
  public problems: Map<string, Problem> =  new Map();

  @Mutation
  public async getProblems() {
    const _problems = await api.fetchProblems();
    if (_problems) {
      _problems.forEach( (p: Problem) => {
        this.problems.set(p._id, p);
      });
      // this.problems = _problems;
    }
  }


  @Action
  public async saveProblem(_prob: Problem) {
    if (_prob._id === '__NEW__') {
      const new_problem = await api.saveNewProblem(_prob);
      this.problems.set(new_problem.problem._id, new_problem.problem);
      // this.problems.push(new_problem.problem);
        // tslint:disable-next-line
      console.log("saved!!");
    }
  }

  @Action
  public getProblem(id: string) {
    return this.problems.get(id);
  }
} // module

export default getModule(ProblemsModule);
