<template>
  <b-card border-variant="secondary">
    <b-card-header>
      <b-btn-toolbar>
        <b-btn-group size="sm">
          <b-btn variant="outline-dark" @click="editProblem"><font-awesome-icon :icon="['far', 'edit']" /></b-btn>
        </b-btn-group>
      </b-btn-toolbar>
    </b-card-header>
    <b-card-text>{{problem.problem_source}}</b-card-text>
  </b-card>
</template>


<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEdit);

import { Component, Vue, Prop } from 'vue-property-decorator';

import {Problem, Author} from '@/store/models';

// import pm from '@/store/modules/problem';

@Component({
  name: 'ProblemView',
  components: {FontAwesomeIcon},
})
export default class ProblemView extends Vue {

  @Prop()
  private problem!: Problem;

  private editProblem() {
    this.$router.push({name: 'editProblem', params: {id: this.problem._id}});
  }

}
</script>

<style scoped>
.problem {
  list-style: none
}

</style>
