import Vue from 'vue';
import App from './App.vue';
import 'bulma/css/bulma.css';

window.Event = new Vue();

new Vue({
  el: '#app',
  // starting point for Vue.
  render: (h) => h(App),
});
