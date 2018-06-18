<template>

</template>

<script>
    export default {
        data () {
            width 64,
            height: 64,
            cells: ''
        },
        computed: {
    
    cellCalc: function () {
      // `this` points to the vm instance
      cells = this.width * this.height;
    }
  }
    }
</script>

<style>
.grid {
  background-color: #34495e;
  color: #fff;
  width: 100%;
  border-collapse: collapse;
}
</style>