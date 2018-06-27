<template>
  <div class="GOL">
    <section class="section primary-background">
      <div class="container">
        <h1 class="title">Game of Life</h1>
        <h2 class="subtitle">
          Implementation of John Conway's Game of Life built with vuejs 2 and bulma css framework.
          Repository <a href="https://github.com/Ijee/Game-of-Life-Vue2">here</a>.
        </h2>
      </div>
    </section>
    <hr class="hr">
    <section class="section is-primary content-background">
      <div class="container">
        <div class="columns">
          <div class="column box is-10 is-offset-1">
            <app-grid
              :message="message"/>
          </div>
        </div>
    </div></section>
    <footer class="footer primary-background">
      <app-controller
        :is-running="isRunning"
        @send="delegate($event)"/></footer>
    <div
      :class="isModal ? 'is-active' : 'inactive'"
      class="modal">
      <div class="modal-background"/>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Import</p>
          <button
            class="delete"
            aria-label="close"
            @click="isModal = false"/>
        </header>
        <section class="modal-card-body">
          <textarea
            class="textarea is-primary"
            type="text"
            placeholder="Paste here"/>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Import</button>
          <button
            class="button"
            @click="isModal = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
// Imports
import Vue from 'vue';
import Controller from './components/Controller.vue';
import Grid from './components/Grid.vue';
import {setInterval, clearInterval} from 'timers';
export default {
  name: 'App',
  components: {
    'app-grid': Grid,
    'app-controller': Controller,
  },
  data() {
    return {
      message: '',
      isRunning: false,
      isModal: false,
      speed: 250,
      intervalID: 0,
    };
  },
  created() {},
  methods: {
    delegate: function(event) {
      if (event === 'play') {
        this.isRunning = !this.isRunning;
        this.restartInterval();
      } else if (event === 'importSession') {
        return;
      } else if (event === 'exportSession') {
        return;
      } else if (event === 'slowDown') {
        this.changeSpeed(50);
        this.restartInterval();
      } else if (event === 'speedUp') {
        this.changeSpeed(-50);
        this.restartInterval();
      } else {
        this.updateMessage(event);
      }
    },
    updateMessage: function(newMessage) {
      this.message = newMessage;
      Vue.nextTick(this.resetMessage);
    },
    resetMessage: function() {
      this.message = '';
    },
    restartInterval: function() {
      clearInterval(this.intervalID);
      if (this.isRunning) {
        this.intervalID = setInterval(
          this.updateMessage,
          this.speed,
          'nextStep'
        );
      }
    },
    changeSpeed: function(speed) {
      this.speed += speed;
      if (this.speed < 100) {
        this.speed = 100;
      } else if (this.speed > 2500) {
        this.speed = 2500;
      }
    },
  },
};
</script>

<style lang="scss">
html,
body {
  background-color: #9da3a7;
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
  color: #fff;
}

.subtitle {
  color: #fff;
}

.GOL {
  height: 100%;
}

.primary-background {
  background-color: #536076;
}
.content-background {
  background-color: #9da3a7;
}
.footer {
  position: absolute;
  border-top: 2px solid #414b5c;
  bottom: 0;
  padding: 1rem;
  width: 100%;
}

.hr {
  position: relative;
  border-top: 2px solid #414b5c;
  margin: 0px;
  bottom: 0;
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
