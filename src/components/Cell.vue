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
    status: {
      default: false,
      type: Boolean,
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
