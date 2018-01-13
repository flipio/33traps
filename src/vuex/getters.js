import _ from 'lodash'

export const grid = ({game}) => {
  return game.grid
}

export const getAlive = ({game}) => {
  let count = 0;

  _.forEach(game.grid, (row) => {
    _.forEach(row, (dot) => {
      if (dot && dot.exists) {
        count++
      }
    })
  })

  return count
}

export const getSelectedDot = ({game}) => {
  let grid = game.grid

  let selected = null

  _.forEach(grid, (row) => {
    _.forEach(row, (dot) => {
      if (dot && dot.selected) {
        selected = dot
        return true
      }
    })
  })

  return selected

}
