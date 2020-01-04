export interface Author {
  author_id: string;
  name?: string;
  institution?: string;
  email?: string;
}

export interface Problem {
  _id: string;
  author_id?: string;
  module_id?: string;
  problem_source?: string;
  //problem_output?: string;
  question_source?: string;
  //question_output?: string;
  language?: string;
  scope?: string;
}

export interface ProblemResponse {
  problem: Problem;
}

// export interface ProblemsResponse {
//   problems?: (Problem)[] | null;
//   problemsCount: number;
// }
