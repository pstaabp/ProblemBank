import {Collection} from 'vue-mc'
import Problem from './problem.js'

export default class ProblemList extends Collection {

  // Default attributes that define the "empty" state.
  model() {
    return Problem
  }

  routes() {
    return {
      fetch: '/api/problems'
    }
  }
}
