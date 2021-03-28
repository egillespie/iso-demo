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

const createRoom = require('./rooms/room-create')
const handleKeyDown = require('./events/handle-key-down')

createRoom()

window.addEventListener('keydown', handleKeyDown)
