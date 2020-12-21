<template>
  <div
    :class="isAlive.isAlive ? 'alive' : 'dead'"
    class="cell"
    @mousedown="reborn(true)"
    @mouseover="reborn(isMouseDown)"/>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    statusObj: {
      type: Object,
      default: () => ({
        isAlive: false
      })
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
  setup(props) {
    let isAlive = reactive(props.statusObj)

    return {
      isAlive
    }
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
    reborn: function(bool: boolean) {
      if (bool) {
        this.isAlive.isAlive = !this.isAlive.isAlive;
        this.$emit('wasUpdated', this.isAlive.isAlive);
      }
    },
  },
});
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
