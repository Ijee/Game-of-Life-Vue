<template>
  <div class="GOL">
    <section class="hero primary-background is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <nav class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a
                class="navbar-item"
                style="color: #fff">
                <span class="icon">
                  <i class="fas fa-heartbeat"/>
                </span>
                <span>GAME OF LIFE</span>
              </a>
              <span
                :class="{'is-active': isNavbar}"
                class="navbar-burger burger"
                data-target="navbarMenuHeroA"
                @click="isNavbar = !isNavbar">
                <span/>
                <span/>
                <span/>
              </span>
            </div>
            <div
              id="navbarMenuHeroA"
              :class="{ 'is-active': isNavbar }"
              class="navbar-menu">
              <div class="navbar-end">
                <a
                  class="navbar-item is-active"
                  @click="swapComponent('appInfo')">
                  <span class="icon">
                    <i class="fas fa-gamepad"/>
                  </span>
                  <span>GAME</span>
                </a>
                <a
                  class="navbar-item"
                  @click="swapComponent('infoPage')">
                  <span class="icon">
                    <i class="fas fa-info"/>
                  </span>
                  <span>INFO</span>
                </a>
                <span class="navbar-item">
                  <a
                    class="button is-info is-inverted"
                    href="https://github.com/Ijee/Game-of-Life-Vue2"
                    target="_blank">
                    <span class="icon">
                      <i class="fab fa-github"/>
                    </span>
                    <span>Ijee</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <!-- Hero content: wil l be in the middle -->
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column box is-12">
              <transition
                mode="out-in"
                name="fade">
                <app-info v-if="mainComponent == 'infoPage'"/>
                <app-grid
                  v-if="mainComponent == 'appInfo'"
                  :message="message"
                  :import-token="importToken"
                  @exportToken="exportSession($event)" />
              </transition>
            </div>
          </div>
          <transition
            mode="out-in"
            name="fade">
            <div
              v-if="isExport"
              class="columns">
              <div class="column is-6 is-offset-3">
                <div class="notification">
                  <h6 class="title is-6">Export</h6>
                  <button
                    class="delete"
                    @click="isExport = false" />
                  <div class="field has-addons">
                    <div class="control is-expanded">
                      <input
                        id="copystring"
                        v-model="exportToken"
                        type="text"
                        class="input is-info is-rounded"
                        @focus="$event.target.select()">
                    </div>
                    <div class="control">
                      <a
                        class="button is-dark"
                        @click="toClipboard">
                        <i class="fas fa-paste" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <!-- Hero footer: will stick at the bottom -->
      <footer class="footer">
        <div class="container">
          <div class="columns">
            <div class="column is-11 is-centered">
              <app-controller
                :is-running="isRunning"
                @send="delegate($event)"/>
            </div>
          </div>
        </div>
      </footer>
      <transition
        mode="out-in"
        name="fade">
        <div
          v-if="isImport"
          :class="isImport ? 'is-active' : 'inactive'"
          class="modal">
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Import</p>
              <button
                class="delete"
                aria-label="close"
                @click="isImport = false" />
            </header>
            <section class="modal-card-body">
              <textarea
                v-model="importToken"
                class="textarea is-primary"
                type="text"
                placeholder="Paste here" />
            </section>
            <footer class="modal-card-foot">
              <button
                class="button is-success"
                @click="importSession">Import</button>
              <button
                class="button"
                @click="isImport = false">Cancel</button>
              <div class="field">
                <p class="control has-icons-left">
                  <span class="select">
                    <select>
                      <option selected>Scenario</option>
                      <option>Train</option>
                      <option>With options</option>
                    </select>
                  </span>
                  <span class="icon is-small is-left">
                    <i
                      class="fas fa-list-ul"
                      style="color: #000" />
                  </span>
                </p>
              </div>
          </footer></div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script>
// Imports
import Vue from 'vue';
import Controller from './components/Controller.vue';
import Grid from './components/Grid.vue';
import AppInfo from './components/AppInfo.vue';
import {setInterval, clearInterval} from 'timers';
export default {
  name: 'App',
  components: {
    'app-grid': Grid,
    'app-info': AppInfo,
    'app-controller': Controller,
  },
  data() {
    return {
      message: '',
      isRunning: false,
      isNavbar: false,
      isImport: false,
      isExport: false,
      mainComponent: 'appInfo',
      speed: 500,
      intervalID: 0,
      importToken: '',
      exportToken: '',
    };
  },
  created() {},
  methods: {
    delegate: function(event) {
      if (event === 'play') {
        this.isRunning = !this.isRunning;
        this.restartInterval();
      } else if (event === 'importSession') {
        this.isImport = true;
      } else if (event === 'exportSession') {
        this.updateMessage('exportSession');
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
    importSession: function() {
      this.updateMessage('importSession');
      this.isImport = false;
    },
    exportSession: function(exportToken) {
      this.exportToken = exportToken;
      this.isExport = true;
    },
    toClipboard: function() {
      this.isExport = false;
      let copyString = document.querySelector('#copystring');
      copyString.setAttribute('type', 'text');
      copyString.select();
      document.execCommand('copy');
    },
    swapComponent: function(component) {
      this.mainComponent = component;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  background-image: linear-gradient(
    to right top,
    #ffd464,
    #ff9766,
    #e4667e,
    #a34d91,
    #42448c
  );
  color: #000;
  font-family: "Dosis", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
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
}
.hero-body {
  align-items: stretch !important;
}
.footer {
  padding: 1rem;
  background-color: transparent;
}

.hr {
  position: relative;
  border-top: 2px solid #414b5c;
  margin: 0px;
  bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
