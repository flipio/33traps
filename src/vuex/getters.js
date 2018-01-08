import _ from 'lodash'

export const grid = ({game}) => {
  return game.grid
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
