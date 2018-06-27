<template>
  <div class="container">
    <div class="content">
      <div class="box">
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <a
              class="button"
              @click="send('slowDown')">
              <i
                class="fas fa-backward"
              />
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('stepBackward')">
              <i
                class="fas fa-step-backward"
              />
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('play')">
              <i
                class="far fa-play-circle"
              />
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('pause')">
              <i class="far fa-pause-circle"/>
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('redoSession')">
              <i
                class="fas fa-redo"
              />
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('nextStep')">
              <i
                class="fas fa-step-forward"
              />
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('speedUp')">
              <i
                class="fas fa-forward"
              />
            </a>
          </p>
          <p class="control">
            <a
              class="button"
              @click="send('randomSeed')">
              <i
                class="fas fa-random"
              />
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
export default {
  data() {
    return {
      globalSettings: {
        speed: 1,
      },
    };
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
  padding: 0.3rem;
}
</style>
