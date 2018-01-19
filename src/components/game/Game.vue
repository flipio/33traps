<template>

  <v-flex class="game game-width">

    <Loader v-if="loader"></Loader>

    <div class="text-xs-center game-width">
      <v-btn @click="restartGame" round color="primary" dark ripple>Restart Game</v-btn>
      <v-dialog scrollable max-width="400px">
        <v-btn  @click="refreshData" color="primary" dark slot="activator" ripple round>Leaderboard</v-btn>
        <Leaderboard ref="leaderboardInstance"></Leaderboard>
      </v-dialog>

      <v-dialog scrollable max-width="400px">
        <v-btn  color="primary" dark slot="activator" ripple round>
          How to?
        </v-btn>

        <v-flex class="how-to">
          <p>
            Click on a black dot ( it becomes automatically selected ) and move it to an empty (white) slot. By doing so you are "eating" the dot that is being jumped over. Continue in that fashion until you have reached the goal.
            The goal is to have only one black dot left. You can only "jump" over 1 dot at a time.
          </p>
          <img class="how-to-gif" src="static/how-to.gif" alt="How to?">
        </v-flex>
      </v-dialog>
    </div>

    <div class="grid game-width">
      <div class="grid-row" v-for="row in gameGrid">
        <div class="grid-el" v-for="dot in row" @click="dotClick(dot)">
          <span class="grid-el-fill" v-if="dot"
                v-bind:class="{ filled: dot.exists, invalid: !dot.exists, selected: dot.selected }"></span>

          <span class="grid-el-fill not-available" v-if="!dot"></span>

        </div>
      </div>
    </div>

    <v-divider></v-divider>
    <v-container grid-list-md text-xs-center class="result-submit">
      <v-layout row wrap >
          <v-flex xs6>
            <v-text-field
              name="nickname-input"
              label="Enter nickname"
              v-model="nickname"
            ></v-text-field>
          </v-flex>

          <v-flex xs6 text-xs-center class="self-center">
            <v-btn @click="submitScore" color="primary" dark ripple round>Submit score</v-btn>
          </v-flex>


      </v-layout>

      <v-flex xs12 v-if="error">
        <span class="red darken-1">{{ error }}</span>
      </v-flex>

    </v-container>
  </v-flex>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { canEat, getDotByXY } from './gameHelper'
  import GameService from '../../services/GameService'
  import Leaderboard from '../leaderboard/Leaderboard'
  import Loader from '@/components/loader/Loader'

  export default {
    name: 'game',
    components: {
      Leaderboard,
      Loader
    },
    methods: {
      refreshData: function() {
        this.$refs.leaderboardInstance.getLeaderboard();
      },
      submitScore: function () {
        let score = this.getAlive()
        let nickname = this.nickname

        if (nickname.length > 20) {
          this.error = 'Nickname to long. Please create nickname with less then 20 characters'

          setTimeout(() => {
            this.error = null;
          }, 5000)

          return
        }

        if (nickname.length > 0) {
          this.loader = true

          GameService.addRecord({
            nickname: this.nickname,
            record: score
          }).then(() => {
              setTimeout(() => {
                this.loader = false
              }, 500)
          })
        }

      },
      restartGame: function () {
        this.initGame()
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
      ...mapActions(['deselectAll', 'selectDot', 'removeDot', 'reviveDot', 'initGame']),
      ...mapGetters(['grid', 'getSelectedDot', 'getAlive'])
    },
    computed: {
      gameGrid: function () {
        return this.grid()
      }
    },
    data () {
      return {
        loader: false,
        nickname: '',
        error: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .how-to {
    background: #fbfbfb;
  }

  .how-to > p {
    margin: 12px;
  }

  .how-to-gif {
    width: 100%;
    padding-top: 7px;
  }

  .leaderboard {
    width: 100%;
  }

  .result-submit {
    margin-top: 6px;
  }

  .game {
    position: relative;
  }

  .self-center {
    align-self: center;
  }

  div.grid {
    margin: 20px auto;
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
