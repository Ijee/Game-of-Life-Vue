<template>
  <div class="container">
    <div class="content">
      <div class="box">
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              title="slow down"
              @click="send('slowDown')">
              <i class="fas fa-backward"/>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              :class="isRunning ? 'green' : 'red'"
              class="button"
              title="play"
              @click="send('play')">
              <i
                :class="isRunning ? 'fa-pause-circle' : 'fa-play-circle'"
                class="far"/>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              title="clear grid"
              @click="send('redoSession')">
              <i class="fas fa-redo"/>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              title="next step"
              @click="send('nextStep')">
              <i class="fas fa-step-forward"/>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              title="speed up"
              @click="send('speedUp')">
              <i class="fas fa-forward"/>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              @click="send('randomSeed')">
              <i class="fas fa-random"/>
              <b>Random Seed</b>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              @click="send('importSession')">
              <b>Import</b>
          </button></p>
          <p class="control">
            <button
              :disabled="mainComponent !== 'gamePage'"
              class="button"
              @click="send('exportSession')">
              <b>Export</b>
          </button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tippy from 'tippy.js';
export default {
  props: {
    isRunning: {
      default: false,
      type: Boolean,
    },
    mainComponent: {
      default: 'gamePage',
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    send: function(event) {
      this.$emit('send', event);
    },
  },
};
</script>

<style scoped>
.box {
  padding: 0;
  margin: auto;
}
.green {
  background-color: hsla(120, 77%, 26%, 0.6);
}
.red {
  background-color: hsla(0, 67%, 31%, 0.6);
}
</style>
