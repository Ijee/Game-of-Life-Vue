<template>
  <div class="gameinfo">
    <h1 class="title">Game of Life</h1>
    <h2 class="subtitle">Implementation of John Conway's Game of Life built with
    vuejs 2, bulma and Fontawesome. </h2>
    <hr>
    <h5 class="title is-5">About the game:</h5>
    Created in </br>
    <h5 class="title is-5">The rules:</h5>
    <div class="content">
      <ol>
        <li> Any live cell with fewer than two live neighbours dies,
        as if by under <strong>population</strong></li>
        <li>Any live cell with two or three neighbours lives on
        to the next generation</li>
        <li>Any live cell with more than three live neighbours dies,
        as if by <strong>overpopulation</strong></li>
        <li>Any dead cell with exactly three live neighbours becomes
        a live cell, as if by <strong>reproduction</strong></li>
      </ol>
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
hr {
  border: 1px solid #000;
}
</style>
