<template>
  <div class="container">
    <div class="content">
      <div class="box">
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <a
              class="button"
              title="slow down"
              @click="send('slowDown')">
              <i class="fas fa-backward"/>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              title="last step"
              @click="send('lastStep')">
              <i class="fas fa-step-backward"/>
            </a>
          </p>
          <p class="control">
            <a

              :class="isRunning ? 'green' : 'red'"
              class="button"
              title="play"
              @click="send('play')">
              <i
                :class="isRunning ? 'fa-pause-circle' : 'fa-play-circle'"
                class="far"/>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              title="clear grid"
              @click="send('redoSession')">
              <i class="fas fa-redo"/>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              title="next step"
              @click="send('nextStep')">
              <i class="fas fa-step-forward"/>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              title="speed up"
              @click="send('speedUp')">
              <i class="fas fa-forward"/>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('randomSeed')">
              <i class="fas fa-random"/>
              <b>Random Seed</b>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('importSession')">
              <b>Import</b>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('exportSession')">
              <b>Export</b>
            </a>
          </p>
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
