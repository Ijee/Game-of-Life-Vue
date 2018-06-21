<template>
  <div class="GOL">
    <section class="section has-background-primary">
      <div class="container">
        <h1 class="title">Game of Life</h1>
        <h2 class="subtitle has-text-grey-dark">
          Implementation of Conway's Game of Life built with vuejs 2 and bulma css framework. Repository
          <a href="https://github.com/Ijee/Game-of-Life-Vue2">here</a>.
        </h2>
      </div>
    </section>
    <hr class="hr">
    <section class="section is-primary">
      <div class="container">
        <div class="columns">
          <div class="column box is-10 is-offset-1">
            <app-grid/>
          </div>
        </div>
    </div></section>

    <hr class="hr">
    <footer class="footer has-background-primary">

      <app-controller/>
    </footer>
  </div>
</template>

<script>
// Imports
import Controller from './components/Controller.vue';
import Grid from './components/Grid.vue';
export default {
  name: 'App',
  components: {
    'app-grid': Grid,
    'app-controller': Controller,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: #fff;
  color: #000;
  font-family: "Dosis", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.GOL {
  height: 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  padding: 1rem;
  width: 100%;
  background-color: red;
}

.hr {
  border-top: 1px solid #8c8b8b;
  margin: 0px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #000;
}
</style>
