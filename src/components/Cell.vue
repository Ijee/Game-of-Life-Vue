<template>
  <div
    :class="isAlive ? 'alive' : 'dead'"
    class="cell"
    @click="reborn()"/>
</template>
<script>
export default {
  props: {
    status: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isAlive: this.status,
    };
  },
  methods: {
    reborn: function() {
      this.$emit('toggle');
      this.isAlive = !this.isAlive;
    },
  },
};
</script>

<style>
.cell {
  width: 25px;
  height: 25px;
  border: 1px solid #455660;

  font-size: 3.5em;
  font-family: "Gochi Hand", sans-serif;
}

.cell:hover {
  background-color: grey;
}
.alive {
  background-color: #5a7280;
}
</style>
