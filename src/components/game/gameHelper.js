import _ from 'lodash';

export const getDotByXY = (grid, x, y) => {
  return _.find(grid[x], (dot) => dot && dot.y === y)
}

export const canEat = (startDot, clickedDot) => {
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
