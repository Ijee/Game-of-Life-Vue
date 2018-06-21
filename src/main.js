import Vue from 'vue';
import App from './App.vue';
import 'bulma/css/bulma.css';
window.Event = new Vue();

let app = new Vue({
  el: '#app',
  render: (h) => h(App),
});
