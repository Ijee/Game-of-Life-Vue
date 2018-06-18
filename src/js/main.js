var vueapp = new Vue({
  el: '#app',
  data: {
    currentIteration: '0',

    //adjustable settings
    width: '64',
    height: '64',

    init: {},
  },
  computed: {
    
    /**
     * Sets all inputs to disabled if if there is no list.
     */
    disabled: function () {
      if (Object.keys(this.shipentries).length < 1) return true;
      return false;
    }
  },
  created: function () {
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    first8: function (str) {
      if (str.length > 9) {
        return str.substring(0, 8) + '...';
      } else
        return str;
    }
  },
  methods: {
    /** 
     * Creates the modal dialog for the client.
     */
    showModal: function () {
     
})