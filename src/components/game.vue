<template>

  <div class="game">

    <div class="text-xs-center">
      <v-btn @click="restartGame" round color="primary" dark>Restart Game</v-btn>
    </div>

    <div class="grid">
      <div class="grid-row" v-for="row in gameGrid">
        <div class="grid-el" v-for="dot in row" @click="dotClick(dot)">
          <span class="grid-el-fill" v-if="dot"
                v-bind:class="{ filled: dot.exists, invalid: !dot.exists, selected: dot.selected }"></span>

          <span class="grid-el-fill not-available" v-if="!dot"></span>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import _ from 'lodash'

  let getDotByXY = (grid, x, y) => {
    return _.find(grid[x], (dot) => dot && dot.y === y)
  }

  let canEat = (startDot, clickedDot) => {
    let dotToEat = null

    let dotA = null
    let dotB = null

    if (startDot.x === clickedDot.x) {

      if (startDot.y > clickedDot.y) {
        dotA = clickedDot
        dotB = startDot
      } else {
        dotA = startDot
        dotB = clickedDot
      }

      if ((dotB.y - dotA.y) === 2) {
        dotToEat = {}
        dotToEat.y = dotA.y + 1
        dotToEat.x = dotA.x
      }

    } else if (startDot.y === clickedDot.y) {

      if (startDot.x > clickedDot.x) {
        dotA = clickedDot
        dotB = startDot
      } else {
        dotA = startDot
        dotB = clickedDot
      }

      if ((dotB.x - dotA.x) === 2) {
        dotToEat = {}
        dotToEat.y = dotA.y
        dotToEat.x = dotA.x + 1
      }

    }

    return dotToEat
  }

  export default {
    name: 'game',
    methods: {
      restartGame: function () {
        this.initStore()
      },
      dotClick: function (dot) {

        if (!dot) {
          return
        }

        let selectedDot = this.getSelectedDot()

        if (selectedDot) {
          let toRemove = null

          if (dot.exists !== true) {
            toRemove = canEat(selectedDot, dot)
          }

          if (toRemove) {

            let toRemoveDot = getDotByXY(this.gameGrid, toRemove.x, toRemove.y)

            if (toRemoveDot.exists === true) {
              this.removeDot(selectedDot)
              this.removeDot(toRemoveDot)
              this.reviveDot(dot)
              this.deselectAll()
            }
          }
        }

        if (dot.exists) {
          this.deselectAll(dot)
          this.selectDot(dot)
        }

      },
      ...mapActions(['deselectAll', 'selectDot', 'removeDot', 'reviveDot', 'initStore']),
      ...mapGetters(['grid', 'getSelectedDot'])
    },
    computed: {
      gameGrid: function () {
        return this.grid()
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  div.grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  }

  div.grid-row {
    display: flex;
    height: 28px;
    margin: 5px auto;
  }

  div.grid-el {

    display: flex;
    flex-direction: row;

    width: 31px;
    height: 28px;
    margin: 3px;
  }

  div.grid-el span {
    width: 100%;
    height: 100%;
    border-radius: 50%;

    cursor: pointer;
  }

  span.filled {
    border: 1px solid #000000;
    background: #000000;
  }

  span.invalid {
    border: 1px solid #bababa;
    background: transparent;
  }

  span.not-available {
    border: 1px solid #ffffff;
    background: transparent;
  }

  span.selected {
    border: 1px solid #ababab;
    background: #ab851a;
  }


</style>
