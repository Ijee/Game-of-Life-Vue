<template>
  <div
    :class="isAlive.isAlive ? 'alive' : 'dead'"
    class="cell"
    @click="reborn(true)"
    @mouseover="reborn(isMouseDown)"/>
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
    isMouseDown: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isAlive: this.statusObj,
    };
  },
  methods: {
    /**
     * Checks if the cell has been clicked
     * and switches its isAlive status.
     * Also emits to the grid component for the
     * drag and drop functionality.
     *
     * @param {boolean} bool - the isMouseDown boolean
     */
    reborn: function(bool) {
      if (bool) {
        this.isAlive.isAlive = !this.isAlive.isAlive;
        this.$emit('wasUpdated', this.isAlive.isAlive);
      }
    },
  },
};
</script>

<style>
.cell {
  flex: 1;
  border-right: 1px solid #1a0707;
  border-bottom: 1px solid #1a0707;
  padding-bottom: 100%;
}

.cell:hover {
  background-color: rgba(132, 26, 26, 0.6);
}

.alive {
  background-color: #bb4747 !important;
}
</style>
