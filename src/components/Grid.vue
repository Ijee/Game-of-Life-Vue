<template>
  <div
    v-ref:grid
    class="grid">
    <div
      v-for="col in gridList"
      :key="col"
      class="col">
      <app-cell
        v-for="(isAlive, index) in col"
        :key="index"
        :status="isAlive"
        @toggle="col[index] = !col[index]"/>

    </div>
    <button
      id="buton"
      @click="log($root.$children.find(child=>{return child.$el.class=='grid'}))">testie</button>
  </div>
</template>

<script>
import Cell from './Cell.vue';
export default {
  components: {
    'app-cell': Cell,
  },
  data() {
    return {
      width: 25,
      height: 15,
      hz: 1,
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
          this.gridList[i][j] = false;
        }
      }
    },
    log: function(e) {
      console.log(e);
    },
    /*
    Event.$on('toggle', function() {
      gridList
      let tempArr = [];
      for (let i = 0; i < this.width * this.height; i++) {
        tempArr[i] = false;
      }
      this.gridList = tempArr;
    }),
    */
    randomSeed() {
      return;
    },
    Reset() {
      return;
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
