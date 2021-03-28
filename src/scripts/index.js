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
const movePlayerTo = require('./player/player-move-to-position')
const handleKeyDown = require('./events/handle-key-down')

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

window.addEventListener('keydown', handleKeyDown)
