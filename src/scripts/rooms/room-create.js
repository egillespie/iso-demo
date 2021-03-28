const state = require('../state')
const createFloors = require('../floors/floors-create')
const createWalls = require('../walls/walls-create')
const movePlayerTo = require('../player/player-move-to-position')

// Create and render a whole room, make it the active room,
// and place the player in it.
module.exports = function () {
  const room = [
    [null, null, null, null, null, null, null, null],
    ['nww', 'nsw', 'net', 'nsw', 'nsw', 'nsw', 'nsw', 'new'],
    ['eww', null, 'eww', null, null, null, null, 'eww'],
    ['eww', null, null, null, null, null, null, 'eww'],
    ['eww', null, 'eww', null, null, null, null, 'eww'],
    ['eww', null, 'nwt', 'nsw', 'nsw', 'nsw', 'nsw', 'sew'],
    ['eww', null, null, null, null, null, null, null],
    ['sww', 'nsw', 'swt', 'nsw', 'nsw', null, null, null]
  ]
  state.currentRoom = room
  createFloors(room)
  createWalls(room)
  movePlayerTo(room, 4, 5)
}
