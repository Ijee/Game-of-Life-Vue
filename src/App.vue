<template>
  <div class="GOL">
    <section class="hero primary-background is-fullheight">
      <!-- Bulma - Hero head -->
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
                  class="navbar-item"
                  @click="swapComponent('gamePage')">
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
                    class="button is-info"
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
      <!-- Bulma - Hero content -->
      <div class="hero-body">
        <div class="container">
          <div class="columns box is-gapless">
            <div class="kapsel column ">
              <transition
                mode="out-in"
                name="fade">
                <keep-alive>
                  <app-grid
                    v-if="mainComponent == 'gamePage'"
                    :message="message"
                    :import-token="importToken"
                    @exportToken="exportSession($event)" />
                  <app-info v-if="mainComponent == 'infoPage'"/>
                </keep-alive>
              </transition>
            </div>
          </div>
          <!-- Bulma - Notification -->
          <transition
            mode="out-in"
            name="fade">
            <div
              v-if="isExport"
              class="columns">
              <div class="column is-6 is-offset-3">
                <div class="notification">
                  <h6 class="title is-6">
                    <i class="far fa-save"/>
                    Export
                  </h6>
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
      <!-- Bulma - Hero footer -->
      <footer class="footer">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-12">
              <app-controller
                :is-running="isRunning"
                :main-component="mainComponent"
                @send="delegate($event)"/>
            </div>
          </div>
        </div>
      </footer>
      <!-- Bulma - Modal -->
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
              <p class="modal-card-title">
                <span class="icon">
                  <i class="far fa-edit"/>
                </span>
                <b>Import</b>
              </p>
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
                      <option>Gosper glider gun</option>
                      <option>Glider</option>
                      <option>Multiple patterns</option>
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
      mainComponent: 'gamePage',
      speed: 500,
      intervalID: 0,
      importToken: '',
      exportToken: '',
    };
  },
  created() {},
  methods: {
    /**
     * Gets called whenever a button is pressed
     * from the Controller component and delegates the
     * appropriate action based on param.
     *
     * @param {string} event - the event
     */
    delegate: function(event) {
      if (event === 'play') {
        this.isRunning = !this.isRunning;
        this.restartInterval();
      } else if (event === 'importSession') {
        this.isImport = true;
      } else if (event === 'exportSession') {
        this.updateMessage('exportSession');
      } else if (event === 'slowDown') {
        this.changeSpeed(100);
        this.restartInterval();
      } else if (event === 'speedUp') {
        this.changeSpeed(-100);
        this.restartInterval();
      } else {
        this.updateMessage(event);
      }
    },
    /**
     * Updates  message  that gets passed
     * down to the grid component as a prop and
     * then resets the message on the next tick.
     *
     * @param {string} newMessage - the new message to be set
     */
    updateMessage: function(newMessage) {
      this.message = newMessage;
      Vue.nextTick(this.resetMessage);
    },
    /**
     * Resets the current message to an
     * empty string.
     */
    resetMessage: function() {
      this.message = '';
    },
    /**
     * Restarts the current interval that
     * is used to call the updateMessage method.
     */
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
    /**
     * Changes the current speed for
     * the game.
     *
     * @param {number} speed - the new speed
     */
    changeSpeed: function(speed) {
      this.speed += speed;
      if (this.speed < 100) {
        this.speed = 100;
      } else if (this.speed > 2500) {
        this.speed = 2500;
      }
    },
    /**
     * Sets the message for one tick
     * as 'importSession'.
     */
    importSession: function() {
      this.updateMessage('importSession');
      this.isImport = false;
    },
    /**
     * Changes the importToken based on param.
     *
     * @param {string} scenario - the scenario
     */
    importScenario: function(scenario) {
      if (scenario === 'gosper') {
        this.importToken = '';
      } else if (scenario === 'glider') {
        this.importToken = '';
      } else if (scenario === 'multiple') {
        this.importToken = '';
      }
      this.updateMessage('importSession');
    },
    /**
     * Changes the exportToken based on param.
     *
     * @param {string} exportToken - the exportToken
     */
    exportSession: function(exportToken) {
      this.exportToken = exportToken;
      this.isExport = true;
    },
    /**
     * Copies the text in the #copystring input
     * to the users clipboard. May not work on
     * some clients
     */
    toClipboard: function() {
      this.isExport = false;
      let copyString = document.querySelector('#copystring');
      copyString.setAttribute('type', 'text');
      copyString.select();
      document.execCommand('copy');
    },
    /**
     * Swaps out the current mainCompoment that
     * is seen on the screen.
     *
     * @param {string} component - the new component
     */
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

.hero-body {
  align-items: stretch !important;
}
.footer {
  padding: 1rem;
  background-color: transparent;
}

.navbar-item {
  color: #ff9766;
}

.kapsel {
  overflow: hidden;
}

// hack for bulma hero width

.hr {
  position: relative;
  border-top: 2px solid #414b5c;
  margin: 0px;
  bottom: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s linear;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
