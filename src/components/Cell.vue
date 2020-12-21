<template>
  <div
    :class="isAlive.isAlive ? 'alive' : 'dead'"
    class="cell"
    @mousedown="reborn(true)"
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
      // The status for a single cell.
      // Sadly it is an anti pattern because ES2015 / Vue
      // do have some problems to deal with a 2D-Array (not-reactive).
      // If you have a different idea how to fix this create an issue :)
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
  user-select: none;
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
