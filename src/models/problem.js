import {Model} from 'vue-mc'

export default class Problem extends Model {

  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id:   null,
      text: '',
      solution: '',
      language: 'markdown',
    }
  }

  routes() {
    return {
      fetch: '/api/problems/{id}'
    }
  }
}
