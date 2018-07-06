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
      this.$emit('wasUpdated', this.isAlive.isAlive);
    },
  },
};
</script>

<style>
.cell {
  flex: 1;
  border: 1px solid #64706c;
  padding-bottom: 100%;
}

.cell:hover {
  background-color: #f85858;
}

.alive {
  background-color: #bb4747;
}
</style>
