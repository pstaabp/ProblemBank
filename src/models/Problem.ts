// import Model from './Model';

export default class Problem {
  public problem_id: string = '';
  private problem_source: string = '';
  private problem_output: string = '';
  private question_source: string = '';
  private question_output: string = '';
  private problem_type: string = 'latex';
  private scope: string = 'global';

  constructor(opts: { problem_id?: string; problem_source?: string; problem_output?: string;
                        question_source?: string; question_output?: string;  problem_type?: string;
                        scope: string} | null) {
      this.problem_source = opts && opts.problem_source ? opts.problem_source : '';
      this.problem_output = opts && opts.problem_output ? opts.problem_output : '';
      this.question_source = opts && opts.question_source ? opts.question_source : '';
      this.question_output = opts && opts.question_output ? opts.question_output : '';
      this.problem_type = opts && opts.problem_type ? opts.problem_type : 'latex';
      this.scope = opts && opts.scope ? opts.scope : 'global';
  }

} // class Author
