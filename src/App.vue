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
                <span><strong>GAME OF LIFE</strong></span>
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
                    target="_blank"
                    rel="noopener">
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
        <div class="container is-paddingless">
          <div class="columns box is-fullwidth is-gapless">
            <div class="column is-12">
              <transition
                mode="out-in"
                name="fade">
                <keep-alive>
                  <app-grid
                    v-if="mainComponent == 'gamePage'"
                    :message="message"
                    :import-token="importToken"
                    :current-speed="speed"
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
          <div class="columns ">
            <div class="column is-fullwidth">
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
                  <span class="select" >
                    <select v-model="selectedScenario">
                      <option
                        value="scenario"
                        selected>Scenario</option>
                      <option value="gosper">Gosper glider gun</option>
                      <option value="multiple">Multiple patterns</option>
                      <option value="chess">Chess board</option>
                      <option value="mandala">Mandala</option>
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
      // The message that gets send down to app-grid at a steady interval
      message: '',
      // Export and import tokens that either get send down / come up
      // from app-grid
      importToken: '',
      exportToken: '',

      // Booleans to determine what to show to the client
      isRunning: false,
      isNavbar: false,
      isImport: false,
      isExport: false,

      // Used to determine the speed the application runs at
      speed: 100,
      intervalID: 0,

      // Variables to determine which page/scenario to show
      mainComponent: 'gamePage',
      selectedScenario: 'scenario',
    };
  },
  watch: {
    /**
     * Changes the importToken based on param.
     *
     * @param {string} scenario - the new scenario
     */
    selectedScenario: function(scenario) {
      if (scenario === 'scenario') {
        this.importToken = '';
      } else if (scenario === 'gosper') {
        this.importToken =
          '[5,13][5,14][6,13][6,14][15,10][15,11][15,15][15,16][16,11][16,12][16,13][16,14][16,15][17,11][17,12][17,14][17,15][18,11][18,12][18,14][18,15][19,12][19,13][19,14][27,15][28,14][28,15][28,16][29,13][29,14][29,15][29,16][29,17][30,12][30,14][30,16][30,18][31,12][31,13][31,17][31,18][39,14][39,15][40,14][40,15]';
      } else if (scenario === 'multiple') {
        this.importToken =
          '[1,13][2,2][2,3][2,7][2,8][2,14][3,2][3,3][3,7][3,14][4,7][4,14][7,2][8,1][8,3][8,6][8,7][8,8][8,9][9,2][12,2][13,1][13,3][13,8][14,1][14,3][14,8][14,9][15,2][15,7][18,2][18,3][19,1][19,4][20,1][20,3][21,2][26,4][27,3][27,4][28,4][33,4][34,4][34,5][35,4][35,5][36,5][39,4][40,4][41,4]';
      } else if (scenario == 'chess') {
        this.importToken =
          '[0,0][0,2][0,4][0,6][0,8][0,10][0,12][0,14][0,16][0,18][1,1][1,3][1,5][1,7][1,9][1,11][1,13][1,15][1,17][1,19][2,0][2,2][2,4][2,6][2,8][2,10][2,12][2,14][2,16][2,18][3,1][3,3][3,5][3,7][3,9][3,11][3,13][3,15][3,17][3,19][4,0][4,2][4,4][4,6][4,8][4,10][4,12][4,14][4,16][4,18][5,1][5,3][5,5][5,7][5,9][5,11][5,13][5,15][5,17][5,19][6,0][6,2][6,4][6,6][6,8][6,10][6,12][6,14][6,16][6,18][7,1][7,3][7,5][7,7][7,9][7,11][7,13][7,15][7,17][7,19][8,0][8,2][8,4][8,6][8,8][8,10][8,12][8,14][8,16][8,18][9,1][9,3][9,5][9,7][9,9][9,11][9,13][9,15][9,17][9,19][10,0][10,2][10,4][10,6][10,8][10,10][10,12][10,14][10,16][10,18][11,1][11,3][11,5][11,7][11,9][11,11][11,13][11,15][11,17][11,19][12,0][12,2][12,4][12,6][12,8][12,10][12,12][12,14][12,16][12,18][13,1][13,3][13,5][13,7][13,9][13,11][13,13][13,15][13,17][13,19][14,0][14,2][14,4][14,6][14,8][14,10][14,12][14,14][14,16][14,18][15,1][15,3][15,5][15,7][15,9][15,11][15,13][15,15][15,17][15,19][16,0][16,2][16,4][16,6][16,8][16,10][16,12][16,14][16,16][16,18][17,1][17,3][17,5][17,7][17,9][17,11][17,13][17,15][17,17][17,19][18,0][18,2][18,4][18,6][18,8][18,10][18,12][18,14][18,16][18,18][19,1][19,3][19,5][19,7][19,9][19,11][19,13][19,15][19,17][19,19][20,0][20,2][20,4][20,6][20,8][20,10][20,12][20,14][20,16][20,18][21,1][21,3][21,5][21,7][21,9][21,11][21,13][21,15][21,17][21,19][22,0][22,2][22,4][22,6][22,8][22,10][22,12][22,14][22,16][22,18][23,1][23,3][23,5][23,7][23,9][23,11][23,13][23,15][23,17][23,19][24,0][24,2][24,4][24,6][24,8][24,10][24,12][24,14][24,16][24,18][25,1][25,3][25,5][25,7][25,9][25,11][25,13][25,15][25,17][25,19][26,0][26,2][26,4][26,6][26,8][26,10][26,12][26,14][26,16][26,18][27,1][27,3][27,5][27,7][27,9][27,11][27,13][27,15][27,17][27,19][28,0][28,2][28,4][28,6][28,8][28,10][28,12][28,14][28,16][28,18][29,1][29,3][29,5][29,7][29,9][29,11][29,13][29,15][29,17][29,19][30,0][30,2][30,4][30,6][30,8][30,10][30,12][30,14][30,16][30,18][31,1][31,3][31,5][31,7][31,9][31,11][31,13][31,15][31,17][31,19][32,0][32,2][32,4][32,6][32,8][32,10][32,12][32,14][32,16][32,18][33,1][33,3][33,5][33,7][33,9][33,11][33,13][33,15][33,17][33,19][34,0][34,2][34,4][34,6][34,8][34,10][34,12][34,14][34,16][34,18][35,1][35,3][35,5][35,7][35,9][35,11][35,13][35,15][35,17][35,19][36,0][36,2][36,4][36,6][36,8][36,10][36,12][36,14][36,16][36,18][37,1][37,3][37,5][37,7][37,9][37,11][37,13][37,15][37,17][37,19][38,0][38,2][38,4][38,6][38,8][38,10][38,12][38,14][38,16][38,18][39,1][39,3][39,5][39,7][39,9][39,11][39,13][39,15][39,17][39,19][40,0][40,2][40,4][40,6][40,8][40,10][40,12][40,14][40,16][40,18][41,1][41,3][41,5][41,7][41,9][41,11][41,13][41,15][41,17][41,19][42,0][42,2][42,4][42,6][42,8][42,10][42,12][42,14][42,16][42,18][43,1][43,3][43,5][43,7][43,9][43,11][43,13][43,15][43,17][43,19][44,0][44,2][44,4][44,6][44,8][44,10][44,12][44,14][44,16][44,18][45,1][45,3][45,5][45,7][45,9][45,11][45,13][45,15][45,17][45,19]';
      } else if (scenario == 'mandala') {
        this.importToken =
          '[13,9][13,10][14,2][14,3][14,4][14,8][14,11][14,15][14,16][14,17][15,9][15,10][16,6][16,13][17,6][17,7][17,12][17,13][18,6][18,13][20,2][20,3][20,4][20,15][20,16][20,17][25,2][25,3][25,4][25,15][25,16][25,17][27,6][27,13][28,6][28,7][28,12][28,13][29,6][29,13][30,9][30,10][31,2][31,3][31,4][31,8][31,11][31,15][31,16][31,17][32,9][32,10]';
      }
    },
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
        this.speed > 100 ? this.changeSpeed(-100) : this.changeSpeed(-20);
        this.restartInterval();
      } else if (event === 'speedUp') {
        this.speed < 100 ? this.changeSpeed(20) : this.changeSpeed(100);
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
          50000 / this.speed,
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
      if (this.speed < 20) {
        this.speed = 20;
      } else if (this.speed > 500) {
        this.speed = 500;
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
     * to the users clipboard. May not work for
     * some clients.
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
  padding-top: 18px;
  padding-bottom: 12px;
}



.footer {
  padding: 1rem;
  background-color: transparent;
}

.navbar-item {
  color: #ff9766;
}

.hr {
  position: relative;
  border-top: 2px solid #414b5c;
  margin: 0px;
  bottom: 0;
}

// The transitions used to switch out my page components as well as
// the import/export modal
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s linear;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
