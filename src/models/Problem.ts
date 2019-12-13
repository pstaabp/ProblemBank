import Model from './Model';

export default class Problem extends Model {

  protected _idAttribute = 'problem_id';

  constructor(opts?: object) {
    super(opts);
  }

  public defaults() {
    return {
      problem_id: '',
      question: '',
      solution: '',
      type: 'latex'
    };
  }

  public dataTypes() {
    return {
      problem_id: 'string',
      question: 'string',
      solution: 'string',
      type: 'string',
    };
  }

  public required_fields() {
    return ['problem_id'];
  }


} // class User
