import Problem from './Problem';
import Collection from './Collection';

export default class ProblemList extends Collection<Problem> {

  public constructor(sets?: Problem[]) {
    super(sets);
  }
} // class ProblemSetList
