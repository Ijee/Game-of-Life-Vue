<template>
  <div class="box">
    <div class="columns is-fullwidth">
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>tick: {{ currentTick }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>cell count {{ cellCount }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>cells alive: {{ cellsAlive }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>cells created: {{ cellsCreated }}</strong>
      </div>
      <div class="column is-size-7-mobile is-half-mobile">
        <strong>speed: {{ currentSpeed }} %</strong>
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
  background-color: hsla(0, 0%, 71%, 0.6);
}
</style>
