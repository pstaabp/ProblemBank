<template>
  <div id="app">
    <MenuBar />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuBar from '@/components/MenuBar.vue';

import Problems from '@/store/modules/problem';

@Component({
  name: 'ProblemBankApp',
  components: {
    MenuBar,
  },
})
export default class ProblemBankApp extends Vue {
  public async created() {
    await Problems.getProblems();
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
