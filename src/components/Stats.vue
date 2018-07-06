<template>
  <div class="box">
    <div class="columns is-fullwidth">
      <div class="column">
        <strong>tick: {{ currentTick }}</strong>
      </div>
      <div class="column">
        <strong>cell count {{ cellCount }}</strong>
      </div>
      <div class="column">
        <strong>cells alive: {{ cellsAlive }}</strong>
      </div>
      <div class="column">
        <strong>cells created: {{ cellsCreated }}</strong>
      </div>
      <div class="column">
        <strong>speed: {{ convertSpeed }}</strong>
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
  computed: {
    convertSpeed: function() {
      return Math.round(500 / this.currentSpeed * 100) + '%';
    },
  },
  methods: {},
};
</script>

<style scoped>
.box {
  background-color: rgba(220, 236, 218);
}
</style>
