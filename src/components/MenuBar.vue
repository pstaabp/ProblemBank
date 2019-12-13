<template>
    <b-nav>
      <b-nav-item active><router-link to="/">Home</router-link></b-nav-item>
      <b-nav-item><router-link to="/problems">Problems</router-link></b-nav-item>
      <b-nav-item>Another Link</b-nav-item>
      <b-nav-item disabled>Disabled</b-nav-item>
    </b-nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'MenuBar',
})
export default class MenuBar extends Vue {

}
</script>
