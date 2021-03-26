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

const insertSprite = require('./sprites/sprite-insert')
const repositionSprite = require('./sprites/sprite-reposition')

const createFloors = require('./floors/floors-create')
const floorLeft = require('./floors/floor-left')
const floorTop = require('./floors/floor-top')
const floorZIndex = require('./floors/floor-z-index')

const FLOOR_WIDTH = require('./floors/const/floor-width')
const FLOOR_HEIGHT = require('./floors/const/floor-height')
const FLOOR_LIFT = require('./floors/const/floor-lift')

const WALL_WIDTH = 30
const WALL_HEIGHT = 60
const WALL_LIFT = 2

const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 52
const PLAYER_LIFT = 6

const WALL_TOP_ADJUST = WALL_HEIGHT - FLOOR_HEIGHT + FLOOR_LIFT + WALL_LIFT
const WALL_LEFT_ADJUST = (FLOOR_WIDTH - WALL_WIDTH) / 2

const PLAYER_TOP_ADJUST = PLAYER_HEIGHT - FLOOR_HEIGHT + FLOOR_LIFT + PLAYER_LIFT
const PLAYER_LEFT_ADJUST = (FLOOR_WIDTH - PLAYER_WIDTH) / 2

const WEST = { colAdjust: -1, rowAdjust: 0 }
const NORTH = { colAdjust: 0, rowAdjust: -1 }
const EAST = { colAdjust: 1, rowAdjust: 0 }
const SOUTH = { colAdjust: 0, rowAdjust: 1 }

function onKeyDown (event) {
  switch (event.code) {
    case 'KeyO':
      // Toggle translucent/solid walls
      event.preventDefault()
      toggleOpacity(state.currentRoom)
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

function toggleOpacity (room) {
  state.seeThroughWalls = !state.seeThroughWalls
  if (state.seeThroughWalls) {
    adjustPlayerVisibility(room, [state.player.row, state.player.col])
  } else {
    makeWallsOpaque()
  }
}

function makeWallsOpaque () {
  // Remove translucency style
  const sprites = document.getElementsByClassName('translucent')
  while (sprites.length > 0) {
    sprites[0].classList.remove('translucent')
  }
  // Remove clipped wall caps
  const clipCaps = document.getElementsByClassName('clip-cap')
  while (clipCaps.length > 0) {
    clipCaps[0].remove()
  }
}

function removeUndefinedPositions (room, positions) {
  return positions.filter(position => {
    const [row, col] = position
    return room[row] && room[row][col] !== undefined
  })
}

function getWallClipPositions (room, row, col) {
  const positions = [
    [row, col + 1],
    [row + 1, col],
    [row + 1, col + 1],
    [row + 1, col + 2],
    [row + 2, col + 1],
    [row + 2, col + 2],
    [row + 2, col + 3],
    [row + 3, col + 2],
    [row + 3, col + 3]
  ]
  return removeUndefinedPositions(room, positions)
}

function getClippedWallCapPositions (room, row, col) {
  const positions = [
    [row + 1, col - 1],
    [row + 2, col],
    [row + 3, col + 1],
    [row - 1, col + 1],
    [row, col + 2],
    [row + 1, col + 3]
  ]
  return removeUndefinedPositions(room, positions)
}

function arrayDifference (array1, array2) {
  const diff1 = array1.filter(item1 => {
    const str1 = JSON.stringify(item1)
    return !array2.map((item2) => JSON.stringify(item2)).includes(str1)
  })
  const diff2 = array2.filter((item2) => {
    const str2 = JSON.stringify(item2)
    return !array1.map((item1) => JSON.stringify(item1)).includes(str2)
  })
  return [...diff1, ...diff2]
}

function toggleWallOpacity (positions) {
  for (const position of positions) {
    const [row, col] = position
    const wall = document.getElementById(`w${row}-${col}`)
    if (wall) {
      wall.classList.toggle('translucent')
    }
    const cap = document.getElementById(`c${row}-${col}`)
    if (cap) {
      cap.classList.toggle('translucent')
    }
  }
}

function toggleClippedWallCaps (room, positions) {
  for (const position of positions) {
    const [row, col] = position
    const capId = `c${row}-${col}-clip`
    const cap = document.getElementById(capId)
    if (cap) {
      cap.remove()
    } else {
      const newCap = createCapIfExposed(room, row, col)
      if (newCap) {
        newCap.id = capId
        newCap.classList.add('clip-cap')
        insertSprite(newCap)
      }
    }
  }
}

function moveWallOpacity (room, currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentClipPositions = getWallClipPositions(room, currentRow, currentCol)
  const allClipPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldClipPositions = getWallClipPositions(room, oldRow, oldCol)
    const changedPositions = arrayDifference(
      currentClipPositions, oldClipPositions
    )
    allClipPositions.push(...changedPositions)
  } else {
    allClipPositions.push(...currentClipPositions)
  }
  toggleWallOpacity(allClipPositions)
}

function moveClippedWallCaps (room, currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentCapPositions = getClippedWallCapPositions(room, currentRow, currentCol)
  const allCapPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldCapPositions = getClippedWallCapPositions(room, oldRow, oldCol)
    const changedPositions = arrayDifference(
      currentCapPositions, oldCapPositions
    )
    allCapPositions.push(...changedPositions)
  } else {
    allCapPositions.push(...currentCapPositions)
  }
  toggleClippedWallCaps(room, allCapPositions)
}

function adjustPlayerVisibility (room, currentPosition, oldPosition) {
  if (state.seeThroughWalls) {
    moveWallOpacity(room, currentPosition, oldPosition)
    moveClippedWallCaps(room, currentPosition, oldPosition)
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
    repositionSprite(
      state.player, playerTop(row, col), playerLeft(room, row, col), playerZIndex(row, col)
    )
    adjustPlayerVisibility(room, [row, col], [state.player.row, state.player.col])
    state.player.col = col
    state.player.row = row
  }
}

function moveCardinal (room, dir) {
  movePlayerTo(room, state.player.row + dir.rowAdjust, state.player.col + dir.colAdjust)
}

function createCap (room, type, row, col) {
  const cap = document.createElement('div')
  cap.id = `c${row}-${col}`
  cap.classList.add('cap', type)
  repositionSprite(
    cap, wallTop(row, col), wallLeft(room, row, col), wallZIndex(row, col)
  )
  return cap
}

function isPositionVisible (room, row, col) {
  if (room[row][col]) {
    const wall = document.getElementById(`w${row}-${col}`)
    return wall && wall.classList.contains('translucent')
  }
  return true
}

function getExposedCapType (room, row, col) {
  const wallType = room[row][col]
  const swcExposed = (
    row === room.length - 1 ||
    (isPositionVisible(room, row + 1, col) && !isPositionVisible(room, row, col))
  )
  const ewcExposed = (
    col === room[row].length - 1 ||
    (isPositionVisible(room, row, col + 1) && !isPositionVisible(room, row, col))
  )
  switch (wallType) {
    case 'eww':
    case 'new':
    case 'set':
      // South-facing wall cap
      if (swcExposed) {
        return 'swc'
      }
      break
    case 'nsw':
    case 'sww':
    case 'swt':
      // East-facing wall cap
      if (ewcExposed) {
        return 'ewc'
      }
      break
    case 'crt':
    case 'net':
    case 'nww':
    case 'nwt': {
      // South- and east-facing wall caps
      if (swcExposed && ewcExposed) {
        return 'sec'
      } else if (swcExposed) {
        return 'swc'
      } else if (ewcExposed) {
        return 'ewc'
      }
      break
    }
  }
  return null
}

function createCapIfExposed (room, row, col) {
  const capType = getExposedCapType(room, row, col)
  if (capType) {
    return createCap(room, capType, row, col)
  }
}

function wallTop (row, col) {
  return floorTop(row, col) - WALL_TOP_ADJUST
}

function wallLeft (room, row, col) {
  return floorLeft(room, row, col) + WALL_LEFT_ADJUST
}

function wallZIndex (row, col) {
  return floorZIndex(row, col) + 1
}

function createWall (room, row, col) {
  const wallType = room[row][col]
  if (wallType && wallType.length) {
    const wall = document.createElement('div')
    wall.id = `w${row}-${col}`
    wall.classList.add('wall', wallType)
    repositionSprite(
      wall, wallTop(row, col), wallLeft(room, row, col), wallZIndex(row, col)
    )
    const cap = createCapIfExposed(room, row, col)
    return cap ? [wall, cap] : wall
  }
}

function createWalls (room) {
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      insertSprite(createWall(room, row, col))
    }
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
