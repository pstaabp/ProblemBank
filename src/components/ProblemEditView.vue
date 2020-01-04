<template>
  <div>
    <h1>Add Problem</h1>
    <b-container>
      <b-row>
        <b-col>
          <b-tabs>
            <b-tab title="Question Source">
              <b-form-textarea v-model="problem.problem_source" rows="12"/>
            </b-tab>
            <b-tab title="Answer Source">
              <b-form-textarea rows="12"></b-form-textarea>
            </b-tab>
            <b-tab title="Properties">
              <b-container>
                <b-row>
                  <b-col sm="4">
                    <label for="author">Author:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input id="author" size="sm" placeholder="Author Name"
                        v-model="author.name"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4">
                    <label for="author-email">Author email:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input type="email" id="author-email" size="sm"
                        placeholder="Author Email" v-model="author.email"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4">
                    <label for="problem-scope">Problem Scope:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-select size="sm" v-model="problem.scope" :options="scope_opts" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="4">
                    <label for="problem-scope">Source Language:</label>
                  </b-col>
                  <b-col sm="8">
                    <b-select size="sm" v-model="problem.language" :options="lang_opts" />
                  </b-col>
                </b-row>
              </b-container>
            </b-tab>
          </b-tabs>
        </b-col>
        <b-col>
          <div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import {Problem, Author} from '@/store/models';

import pm from '@/store/modules/problem';

@Component({
  name: 'ProblemEditView',
})
export default class ProblemEditView extends Vue {
  private problem: Problem = { _id: '__NEW__', scope: 'global', language: 'latex', problem_source: ''};
  private author: Author = {author_id: '__NEW__', email: 'pstaab@fitchburgstate.edu'};
  // private email: string = 'pstaab@fitchburgstate.edu';
  private lang_opts = [{text: 'LaTeX', value: 'latex'}, {text: 'Markdown', value: 'md'}];
  private scope_opts = [{text: 'Global', value: 'global'}, {text: 'Private', value: 'private'}];
  private problem_source: string = '';


  @Watch('problem', {deep: true})
  private onProblemChange(val: Problem, oldVal: Problem) {
    // tslint:disable-next-line
    console.log(val);
    if(val) {
      pm.saveProblem(this.problem);
    }
  }

  @Watch('author', {deep: true})
  private onAuthorChange(val: string, oldVal: string) {
    // tslint:disable-next-line
    console.log(val);
  }

  private async beforeMount() {
    // tslint: disable-next-line
    console.log(this.$route.params);
    if (this.$route.params.id !== this.problem._id) {


      this.problem =  await pm.getProblem(this.$route.params.id);
      // tslint:disable-next-line
      console.log(this.problem);
    }
  }


  private save() {
    // tslint:disable-next-line
    console.log('saving!');
  }
}
</script>
