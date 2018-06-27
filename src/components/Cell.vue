<template>
  <div
    :class="isAlive.isAlive ? 'alive' : 'dead'"
    class="cell"
    @click="reborn()"/>
</template>
<script>
export default {
  props: {
    statusObj: {
      default: function() {
        return {isAlive: false};
      },
      type: Object,
    },
    xPos: {
      default: -1,
      type: Number,
    },
    yPos: {
      default: -1,
      type: Number,
    },
  },
  data() {
    return {
      isAlive: this.statusObj,
    };
  },
  methods: {
    reborn: function() {
      this.isAlive.isAlive = !this.isAlive.isAlive;
      this.$emit('updateStatus', this.xPos, this.yPos, this.isAlive);
    },
  },
};
</script>

<style>
.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #414b5c;

  font-size: 3.5em;
  font-family: "Gochi Hand", sans-serif;
}

.cell:hover {
  background-color: #4b5369;
}
.alive {
  background-color: #2e3341;
}
</style>
