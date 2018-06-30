<template>
  <div class="gameinfo">
    <h1 class="title">Game of Life</h1>
    <h2 class="subtitle">Implementation of John Conway's Game of Life built with
    vuejs 2, bulma and Fontawesome. </h2>
    <hr>
    <h5 class="title is-5">About the game:</h5>
    Created in 1970, John Horton Conway created the game of life also known simply
    as 'Life' which is an automated game based on 4 rules that determine the status
    of a cell inside the grid. A cell can either be 'alive' or 'dead'. Every turn (tick)
    rules get applied to all cells that are currently alive.
    Further Information can be found <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">here</a>.
    <h5 class="title is-5">The rules:</h5>
    <div class="content">
      <ul>
        <li> Any live cell with fewer than two live neighbours dies,
        as if by <strong>under population</strong></li>
        <li>Any live cell with two or three neighbours lives on
        to the next generation</li>
        <li>Any live cell with more than three live neighbours dies,
        as if by <strong>overpopulation</strong></li>
        <li>Any dead cell with exactly three live neighbours becomes
        a live cell, as if by <strong>reproduction</strong></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style>
.subtitle {
  color: grey;
}
hr {
  border: 1px solid #000;
}
</style>
