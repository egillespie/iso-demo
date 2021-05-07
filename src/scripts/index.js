/*
- [x] ~~wall caps that don't connect to adjacent walls~~
    > No plans for this scenario to be possible after #3
- [x] reducing the see-through viewing area
- [x] introduce parcel to better organize project
- [ ] convert string map to wall segments
- [ ] procedurally generate room
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
const createRoom = require('./rooms/room-create')
const createPlayer = require('./player/player-create')
const insertSprite = require('./sprites/sprite-insert')
const movePlayerTo = require('./player/player-move-to-position')
const handleKeyDown = require('./events/handle-key-down')

while (state.renderWindow.firstChild) {
  state.renderWindow.removeChild(state.renderWindow.lastChild)
}
createRoom()
insertSprite(createPlayer('girl'))
movePlayerTo(state.currentRoom, 4, 5)

window.addEventListener('keydown', handleKeyDown)

if (module.hot) {
  module.hot.dispose(function (data) {
    Object.assign(data, require('./state'))
  })

  module.hot.accept(function (getParents) {
    const player = module.hot.data.player
    if (!isNaN(player.row) && !isNaN(player.col)) {
      const movePlayerTo = require('./player/player-move-to-position')
      movePlayerTo(state.currentRoom, player.row, player.col)
    }
  })
}
