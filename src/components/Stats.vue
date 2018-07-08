<template>
  <div class="box">
    <div class="columns is-fullwidth">
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>TICK: {{ currentTick }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>CELL COUNT: {{ cellCount }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>CELLS ALIVE: {{ cellsAlive }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>CELLS CREATED: {{ cellsCreated }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>SPEED: {{ currentSpeed }} %</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTick: {
      default: 0,
      type: Number,
    },
    cellCount: {
      default: 0,
      type: Number,
    },
    cellsAlive: {
      default: 0,
      type: Number,
    },
    cellsCreated: {
      default: 0,
      type: Number,
    },
    currentSpeed: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.box {
  background-color: #e7eef5;
}
.columns {
  display: flex;
  flex-wrap: wrap;
}
.column {
  margin: 0;
}
</style>
