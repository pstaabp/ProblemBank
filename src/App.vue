<template>
  <div id="app">
    <MenuBar />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuBar from '@/components/MenuBar.vue';

import axios from 'axios';

import { getModule } from 'vuex-module-decorators';
import WeBWorKStore from '@/store';
const store = getModule(WeBWorKStore);


@Component({
  name: 'ProblemBankApp',
  components: {
    MenuBar,
  },
})
export default class ProblemBankApp extends Vue {
  public  created() {
    // tslint:disable-next-line
    console.log("Loading data");
    axios.get('/api/problems/')
      .then( (response) => {
        // tslint:disable-next-line
        console.log(response);
    });
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
