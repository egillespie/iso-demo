const state = require('../state')
const createFloors = require('../floors/floors-create')
const createWalls = require('../walls/walls-create')

// Create and render a whole board, make it the active board,
// and place the player in it.
module.exports = function () {
  const board = [
    [null, null, null, null, null, null, null, null],
    ['nww', 'nsw', 'net', 'nsw', 'nsw', 'nsw', 'nsw', 'new'],
    ['eww', null, 'eww', null, null, null, null, 'eww'],
    ['eww', null, null, null, null, null, null, 'eww'],
    ['eww', null, 'eww', null, null, null, null, 'eww'],
    ['eww', null, 'nwt', 'nsw', 'nsw', 'nsw', 'nsw', 'sew'],
    ['eww', null, null, null, null, null, null, null],
    ['sww', 'nsw', 'swt', 'nsw', 'nsw', null, null, null]
  ]
  state.currentBoard = board
  createFloors(board)
  createWalls(board)
}
