<template>
  <div
    class="grid">
    <div
      v-for="(col, indexX) in gridList"
      :key="indexX"
      class="col">
      <app-cell
        v-for="(isAlive, indexY) in col"
        :key="indexY"
        :status-obj="isAlive"
        :x-pos="indexX"
        :y-pos="indexY"
      />

    </div>
    <button
      id="buton"
      @click="randomSeed">Test</button>
  </div>
</template>

<script>
import Cell from './Cell.vue';
export default {
  components: {
    'app-cell': Cell,
  },
  props: {
    message: {
      default: 'hallo',
      type: String,
    },
  },
  data() {
    return {
      width: 25,
      height: 15,
      cells: 0,
      gridList: [],
      initialList: [],
    };
  },
  computed: {},
  created() {
    this.cellCalc();
  },
  methods: {
    cellCalc: function() {
      for (let i = 0; i < this.width; i++) {
        this.gridList[i] = [];
        for (let j = 0; j < this.height; j++) {
          this.gridList[i][j] = {isAlive: false};
        }
      }
      this.initialList = this.gridList;
      this.cells = this.width * this.height;
    },
    log: function(e) {
      console.log(e);
    },
    setCell: function(x, y, bool) {
      this.gridList[x][y].isAlive = bool;
      // let row = this.gridList[x];
      // row.splice(y, 1, {isAlive: true});
      // this.gridList.splice(x, 1, row);
    },
    update: function() {
      for (let i = 0; i < this.width; i++) {
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
          this.setCell(i, j, result);
        }
      }
    },
    getNeighbours: function(posX, posY) {
      let neighbours = 0;
      if (posX <= this.width && posY <= this.height) {
        for (let offsetX = -1; offsetX < 2; offsetX++) {
          for (let offsetY = -1; offsetY < 2; offsetY++) {
            if (
              (offsetX != 0 || offsetY != 0) &&
              this.gridList[posX + offsetX][posY + offsetY].isAlive == true
            ) {
              neighbours++;
            }
          }
        }
      }
      return neighbours;
    },
    play: function() {
      return;
    },
    reset: function() {
      this.gridList = this.initialList;
    },
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
  },
};
</script>

<style>
.grid {
  width: -moz-fit-content;
  width: -webkit-fit-content;
  overflow: hidden;
  margin: 0 auto;
  background-color: #eee;
  color: #fff;
}
.col {
  float: left;
}
</style>
