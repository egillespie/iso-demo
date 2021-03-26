/*
- [x] ~~wall caps that don't connect to adjacent walls~~
    > No plans for this scenario to be possible after #3
- [x] reducing the see-through viewing area
- [ ] convert string map to wall segments
- [ ] procedurally generate room
- [ ] introduce parcel to better organize project
- [ ] unit tests for common and edge scenarios
*/

/*
const map = [
  '........',
  'wwwwwwww',
  'w.w....w',
  'w......w',
  'w.w....w',
  'w.wwwwww',
  'w.d.....',
  'wwwww...'
]

const room = mapToWallSegments(map)
*/

const state = require('./state')

const positionSprite = require('./sprites/sprite-position')

const createFloors = require('./floors/floors-create')
const createWalls = require('./walls/walls-create')

const floorLeft = require('./floors/floor-left')
const floorTop = require('./floors/floor-top')
const floorZIndex = require('./floors/floor-z-index')

const floorWidth = require('./floors/const/floor-width')
const floorHeight = require('./floors/const/floor-height')
const floorLift = require('./floors/const/floor-lift')

const toggleOpacity = require('./player/opacity-toggle')

const adjustWallVisibility = require('./walls/walls-adjust-visibility')

const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 52
const PLAYER_LIFT = 6

const PLAYER_TOP_ADJUST = PLAYER_HEIGHT - floorHeight + floorLift + PLAYER_LIFT
const PLAYER_LEFT_ADJUST = (floorWidth - PLAYER_WIDTH) / 2

const WEST = { colAdjust: -1, rowAdjust: 0 }
const NORTH = { colAdjust: 0, rowAdjust: -1 }
const EAST = { colAdjust: 1, rowAdjust: 0 }
const SOUTH = { colAdjust: 0, rowAdjust: 1 }

function onKeyDown (event) {
  switch (event.code) {
    case 'KeyO':
      // Toggle translucent/solid walls
      event.preventDefault()
      toggleOpacity()
      break
    case 'KeyP':
      // Toggle player image
      event.preventDefault()
      togglePlayerImage()
      break
    case 'KeyA':
    case 'ArrowLeft':
      // Move west (up and left)
      event.preventDefault()
      moveCardinal(state.currentRoom, WEST)
      break
    case 'KeyW':
    case 'ArrowUp':
      // Move north (up and right)
      event.preventDefault()
      moveCardinal(state.currentRoom, NORTH)
      break
    case 'KeyD':
    case 'ArrowRight':
      // Move east (down and right)
      event.preventDefault()
      moveCardinal(state.currentRoom, EAST)
      break
    case 'KeyS':
    case 'ArrowDown':
      // Move south (down and left)
      event.preventDefault()
      moveCardinal(state.currentRoom, SOUTH)
      break
  }
}

function togglePlayerImage () {
  state.player.classList.toggle('boy')
  state.player.classList.toggle('girl')
}

function playerTop (row, col) {
  return floorTop(row, col) - PLAYER_TOP_ADJUST
}

function playerLeft (room, row, col) {
  return floorLeft(room, row, col) + PLAYER_LEFT_ADJUST
}

function playerZIndex (row, col) {
  return floorZIndex(row, col) + 1
}

function canMovePlayerTo (row, col) {
  return !document.getElementById(`w${row}-${col}`)
}

function movePlayerTo (room, row, col) {
  if (canMovePlayerTo(row, col)) {
    positionSprite(
      state.player, playerTop(row, col), playerLeft(room, row, col), playerZIndex(row, col)
    )
    adjustWallVisibility(room, [row, col], [state.player.row, state.player.col])
    state.player.col = col
    state.player.row = row
  }
}

function moveCardinal (room, dir) {
  movePlayerTo(room, state.player.row + dir.rowAdjust, state.player.col + dir.colAdjust)
}

function createRoom () {
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

createRoom()

window.addEventListener('keydown', onKeyDown)
