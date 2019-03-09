<template>
  <div id="app">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">ProblemBank</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item href="#" @click="setPage('home')">Home</b-nav-item>
        <b-nav-item href="#" @click="setPage('problems')">Problems</b-nav-item>
        <b-nav-item href="#" @click="setPage('sets')">Problem Sets</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container v-if="page_name == 'home'">
      <h2>Home</h2>

    </b-container>
    <problem-sets-view v-if="page_name == 'sets'"></problem-sets-view>
    <problems-view v-if="page_name == 'problems'"></problems-view>
  </div>
</template>

<script>
import ProblemList from './models/problem_list.js'
import ProblemSetsView from "./components/ProblemSetsView.vue"
import ProblemsView from './components/ProblemsView.vue'

export default {
  name: 'app',
  components: {
    ProblemSetsView,
    ProblemsView
  },
  data: function(){
    return {
      page_name : "problems",
      problems: new ProblemList()
    }
  },
  methods: {
    setPage: function(name){ this.page_name = name;}
  },
  created: function() {
    // eslint-disable-next-line
    console.log(this.problems);

    this.problems.fetch().then( (response) =>{
      // eslint-disable-next-line
     this.problems.reset(response.data);
    })
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
