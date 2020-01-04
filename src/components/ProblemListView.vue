<template>
  <div class="hello">
    <h1>Problems</h1>
    <router-link to="/problem/new">New Problem</router-link>
    <b-card-group deck v-for="problem in problems">
      <problem-view :problem="problem" />
    </b-card-group>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import pm from '@/store/modules/problem';
import ProblemView from '@/components/ProblemView.vue';

@Component({
  name: 'ProblemListView',
  components : { ProblemView },
})
export default class ProblemListView extends Vue {

  get problems() {
    return [...pm.problems.values()];
  }
}
</script>
