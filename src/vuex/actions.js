
import * as types from './mutation-types'

export const initStore = ({ commit }) => {
  commit(types.INIT)
}

export const selectDot = ({ commit }, dot) => {
  commit(types.SELECT_DOT, dot)
}

export const deselectAll = ({ commit }) => {
  commit(types.DESELECT_ALL)
}

export const removeDot = ({ commit }, dot) => {
  commit(types.REMOVE_DOT, dot)
}

export const reviveDot = ({ commit }, dot) => {
  commit(types.REVIVE_DOT, dot)
}

