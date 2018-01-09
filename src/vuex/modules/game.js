import * as types from '../mutation-types'
import _ from 'lodash'

const GAME_MATRIX = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 2, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0]
]

let initGrid = () => {
  let gameGrid = {}

  let dotTemplate = {
    exists: false,
    selected: false,
    x: '',
    y: ''
  }

  _.forEach(GAME_MATRIX, (row, i) => {
    let rowImpl = []

    _.forEach(row, (el, j) => {

      let dot = _.cloneDeep(dotTemplate)

      if (el === 1) {
        dot.exists = true
      }

      dot.x = i
      dot.y = j

      if (el === 0) {
        dot = null
      }

      rowImpl.push(
        dot
      )
    })

    gameGrid[i] = rowImpl

  })

  return gameGrid
}

const state = {
  title: '33 Traps',
  grid: initGrid()
}

const mutations = {

  [types.INIT_GAME] (state) {
    state.grid = initGrid()
  },

  [types.SELECT_DOT] (state, {x, y}) {

    let row = _.cloneDeep(state.grid[x])

    let dot = _.find(row, (d) => {return d && d.x === x && d.y === y})
    dot.selected = true

    state.grid[x] = row
  },

  [types.DESELECT_ALL] (state) {

    _.forEach(state.grid, (stateRow, i) => {

      let row = _.cloneDeep(stateRow)
      let needsUpdate = false

      _.forEach(row, (d) => {
        if (d && d.selected === true) {
          d.selected = false
          needsUpdate = true;
        }
      })

      // only update ones that changed
      if (needsUpdate) {
        state.grid[i] = row
      }
    })

  },

  [types.SELECT_DOT] (state, {x, y}) {

    let row = _.cloneDeep(state.grid[x])

    let dot = _.find(row, (d) => {return d && d.x === x && d.y === y})
    dot.selected = true

    state.grid[x] = row
  },

  [types.REMOVE_DOT] (state, {x, y}) {

    let row = _.cloneDeep(state.grid[x])

    let dot = _.find(row, (d) => {return d && d.x === x && d.y === y})
    dot.selected = false
    dot.exists = false

    state.grid[x] = row
  },

  [types.REVIVE_DOT] (state, {x, y}) {

    let row = _.cloneDeep(state.grid[x])

    let dot = _.find(row, (d) => {return d && d.x === x && d.y === y})

    dot.selected = false
    dot.exists = true

    state.grid[x] = row
  }

}

export default {
  state,
  mutations
}
