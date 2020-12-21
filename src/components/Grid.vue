<template>
  <div>
    <app-stats
      :current-tick="currentTick"
      :cell-count="cellCount"
      :cells-alive="cellsAlive"
      :cells-created="cellsCreated"
      :current-speed="currentSpeed"/>
    <div
      class="game-grid columns"
      @mousedown="isMouseDown = true"
      @mouseup="isMouseDown = false"
      @mouseleave="isMouseDown = false">
      <div
        v-for="(col, indexX) in gridList"
        :key="indexX"
        class="game-column">
        <app-cell
          v-for="(isAlive, indexY) in col"
          :key="indexY"
          :status-obj="isAlive"
          :x-pos="indexX"
          :y-pos="indexY"
          :is-mouse-down="isMouseDown"
          @wasUpdated="updateCellCount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Cell from './Cell.vue';
import Stats from './Stats.vue';
export default defineComponent({
  components: {
    'app-cell': Cell,
    'app-stats': Stats,
  },
  props: {
    message: {
      default: '',
      type: String,
    },
    importToken: {
      default: '',
      type: String,
    },
    currentSpeed: {
      default: 0,
      type: Number,
    },
  },
  setup() {
      const width = 46;
      const height = 20;
      let gridList = ref([] as {isAlive: boolean}[][]);

      // Stats that get passed down to the app-stats component
      let currentTick = ref(0);
      let cellCount = ref(0);
      let cellsAlive = ref(0);
      let cellsCreated = ref(0);

      // A prop that gets used by the app-cell component (drag)
      let isMouseDown = ref(false);

      return {
        width,
        height,
        gridList,
        currentTick,
        cellCount,
        cellsAlive,
        cellsCreated,
        isMouseDown
      }
  },
  computed: {},
  watch: {
    /**
     * Watches for changes in the message prop
     * that gets passed down from the App component
     * and then handles the input on a specific tick.
     *
     * @param {string} val - the value
     */
    message: function(val) {
      if (val === 'nextStep') {
        this.update();
        this.currentTick++;
      } else if (val === 'redoSession') {
        this.reset();
      } else if (val === 'randomSeed') {
        this.randomSeed();
      } else if (val === 'importSession') {
        this.importSession();
      } else if (val === 'exportSession') {
        this.exportSession();
      }
    },
  },
  created() {
    this.cellCalc();
  },
  methods: {
    /**
     * Creates a 2D-Array during runtime for
     * the website to use for most operations.
     */
    cellCalc: function() {
      for (let i = 0; i < this.width; i++) {
        this.gridList[i] = [];
        for (let j = 0; j < this.height; j++) {
          this.gridList[i][j] = {isAlive: false};
        }
      }
      this.cellCount = this.width * this.height;
    },
    /**
     * Changes the 'isAlive' object property
     * of a specific cell to the one requested
     * in the param.
     *
     * @param {number} x - the x position
     * @param {number} y - the y position
     * @param {boolean} alive - the new boolean
     */
    setCell: function(x: number, y: number, alive: boolean) {
      if (this.gridList[x][y].isAlive != alive) {
        this.gridList[x][y].isAlive = alive;
        this.updateCellCount(alive);
      }
      // let row = this.gridList[x];
      // row.splice(y, 1, {isAlive: true});
      // this.gridList.splice(x, 1, row);
    },
    /**
     * The main function that updates the grid
     * every tick based on the game of life rules.
     */
    update: function() {
      let tempArr: boolean[][] = [];
      for (let i = 0; i < this.width; i++) {
        tempArr[i] = [];
        for (let j = 0; j < this.height; j++) {
          let status = this.gridList[i][j].isAlive;
          let neighbours = this.getNeighbours(i, j);
          let result = false;
          // Rule 1:
          // Any live cell with fewer than two live neighbours dies,
          // as if by under population
          if (status && neighbours < 2) {
            result = false;
          }
          // Rule 2:
          // Any live cell with two or three neighbours lives on
          // to the next generation
          if ((status && neighbours == 2) || neighbours == 3) {
            result = true;
          }
          // Rule 3:
          // Any live cell with more than three live neighbours dies,
          // as if by overpopulation
          if (status && neighbours > 3) {
            result = false;
          }
          // Rule 4:
          // Any dead cell with exactly three live neighbours becomes
          // a live cell, as if by reproduction
          if (!status && neighbours == 3) {
            result = true;
          }
          tempArr[i][j] = result;
        }
      }
      // set new gridList content
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.setCell(i, j, tempArr[i][j]);
        }
      }
    },
    /**
     * Returns the amount of neighbours for
     * a specific cell on the grid.
     *
     * @param {number} posX - the x position
     * @param {number} posY - the Y position
     * @return {number} neighbours - amount of neighbours
     */
    getNeighbours: function(posX: number, posY: number) {
      let neighbours = 0;
      if (posX <= this.width && posY <= this.height) {
        for (let offsetX = -1; offsetX < 2; offsetX++) {
          for (let offsetY = -1; offsetY < 2; offsetY++) {
            let newX = posX + offsetX;
            let newY = posY + offsetY;
            // check if offset is:
            // on current cell, out of bounds and if isAlive
            // for cell true
            if (
              (offsetX != 0 || offsetY != 0) &&
              newX >= 0 &&
              newX < this.width &&
              newY >= 0 &&
              newY < this.height &&
              this.gridList[posX + offsetX][posY + offsetY].isAlive == true
            ) {
              neighbours++;
            }
          }
        }
      }
      return neighbours;
    },
    /**
     * Resets all gridList cells back to the
     * start value.
     */
    reset: function() {
      this.currentTick = 0;
      this.cellsAlive = 0;
      this.cellsCreated = 0;
      this.gridList.forEach((col) => {
        col.forEach((cell) => {
          cell.isAlive = false;
        });
      });
    },
    /**
     * Populates and overwrites gridList with cells.
     */
    randomSeed: function() {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          let rand = Math.random();
          if (rand < 0.2) {
            this.setCell(i, j, true);
          } else {
            this.setCell(i, j, false);
          }
        }
      }
    },
    /**
     * Resets and then imports new cells into the gridList
     * based on the importToken prop that gets passed down
     * App.vue.
     * The importToken is a string and its syntax looks
     * like this:
     * '[xPos,yPos],[xPos,yPos]...'.
     */
    importSession: function() {
      this.reset();
      let regex = /\[\d+,\d+\]/gm;
      let tempArr = this.importToken.match(regex);
      if (tempArr) {
        tempArr.forEach((element) => {
          element = element.substring(1, element.length - 1);
          let xy = element.split(',');
          this.setCell(+xy[0], +xy[1], true);
        });
      }
    },
    /**
     * Uses gridList to create an exportToken and
     * emits it up to App.vue for the user to copy.
     * Same format as in importToken().
     */
    exportSession: function() {
      let exportToken = '';
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          if (this.gridList[i][j].isAlive) {
            exportToken += '[' + i + ',' + j + ']';
          }
        }
      }
      this.$emit('exportToken', exportToken);
    },
    /**
     * Updates the current cellcount on each new tick.
     *
     * @param {boolean} bool - boolean based on cell isAlive status
     */
    updateCellCount: function(bool: boolean) {
      if (bool) {
        this.cellsAlive++;
        this.cellsCreated++;
      } else {
        this.cellsAlive--;
      }
    },
  },
});
</script>

<style lang="scss">
.game-grid {
  border-top: 1px solid #1a0707;
  border-left: 1px solid #1a0707;
  display: flex;
  flex: 1;
  justify-content: center;
}
.game-column {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
  flex-direction: column;
}
</style>
