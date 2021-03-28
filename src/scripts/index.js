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

const createFloors = require('./floors/floors-create')
const createWalls = require('./walls/walls-create')

const toggleOpacity = require('./walls/walls-opacity-toggle')
const togglePlayerSprite = require('./player/player-sprite-toggle')

const movePlayerNorth = require('./player/player-move-north')
const movePlayerEast = require('./player/player-move-east')
const movePlayerSouth = require('./player/player-move-south')
const movePlayerWest = require('./player/player-move-west')

const movePlayerTo = require('./player/player-move-to-position')

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
      togglePlayerSprite()
      break
    case 'KeyA':
    case 'ArrowLeft':
      // Move west (up and left)
      event.preventDefault()
      movePlayerWest(state.currentRoom)
      break
    case 'KeyW':
    case 'ArrowUp':
      // Move north (up and right)
      event.preventDefault()
      movePlayerNorth(state.currentRoom)
      break
    case 'KeyD':
    case 'ArrowRight':
      // Move east (down and right)
      event.preventDefault()
      movePlayerEast(state.currentRoom)
      break
    case 'KeyS':
    case 'ArrowDown':
      // Move south (down and left)
      event.preventDefault()
      movePlayerSouth(state.currentRoom)
      break
  }
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
