<template>
  <div class="container">
    <div class="content">
      <div class="box">
        <div class="field has-addons has-addons-centered">
          <p class="control">
            <a class="button">
              <i class="fas fa-backward"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="fas fa-step-backward"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="far fa-play-circle"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="far fa-pause-circle"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="fas fa-redo"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="fas fa-step-forward"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="fas fa-forward"/>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="fas fa-random"/>
              <b>Random Seed</b>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <b>Import</b>
            </a>
          </p>
          <p class="control">
            <a class="button">
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
    return {};
  },
};
</script>

<style scoped>
.box {
  padding: 0.3rem;
}
</style>
