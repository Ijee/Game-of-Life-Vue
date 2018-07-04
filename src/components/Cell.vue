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
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative; /* If you want text inside of it */
  border: 1px solid #64706c;
  overflow: hidden;
}

.cell:hover {
  background-color: #f85858;
}

.alive {
  background-color: #bb4747;
}
</style>
