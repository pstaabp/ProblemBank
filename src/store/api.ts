import axios from 'axios';

import {Problem, ProblemResponse} from './models';

export async function fetchProblems(): Promise<Problem[]> {

  const response = await axios.get('/api/problems');
  // tslint: disable-next-line
  // console.log(response);
  return (response.data as Problem[]);
}

export async function saveNewProblem(_prob: Problem): Promise<ProblemResponse> {
  // tslint:disable-next-line
  console.log('in save new problem');
  const response = await axios.post('/api/problems', _prob);
  return response.data as ProblemResponse;
}
