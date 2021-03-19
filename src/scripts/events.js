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

const spaces = mapToWallSegments(map)
*/

const space = [
  [null, null, null, null, null, null, null, null],
  ['nww', 'nsw', 'net', 'nsw', 'nsw', 'nsw', 'nsw', 'new'],
  ['eww', null, 'eww', null, null, null, null, 'eww'],
  ['eww', null, null, null, null, null, null, 'eww'],
  ['eww', null, 'eww', null, null, null, null, 'eww'],
  ['eww', null, 'nwt', 'nsw', 'nsw', 'nsw', 'nsw', 'sew'],
  ['eww', null, null, null, null, null, null, null],
  ['sww', 'nsw', 'swt', 'nsw', 'nsw', null, null, null]
]

const renderWindow = document.getElementById('render-window')

const player = document.getElementById('player')

const gameState = {
  seeThroughWalls: false
}

const FLOOR_WIDTH = 40
const FLOOR_HEIGHT = 30
const FLOOR_LIFT = 10

const WALL_WIDTH = 30
const WALL_HEIGHT = 60
const WALL_LIFT = 2

const PLAYER_WIDTH = 30
const PLAYER_HEIGHT = 52
const PLAYER_LIFT = 6

const FLOOR_TOP_ADJUST = (FLOOR_HEIGHT - FLOOR_LIFT) / 2
const FLOOR_LEFT_ADJUST = FLOOR_WIDTH / 2

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
      moveCardinal(WEST)
      break
    case 'KeyW':
    case 'ArrowUp':
      // Move north (up and right)
      event.preventDefault()
      moveCardinal(NORTH)
      break
    case 'KeyD':
    case 'ArrowRight':
      // Move east (down and right)
      event.preventDefault()
      moveCardinal(EAST)
      break
    case 'KeyS':
    case 'ArrowDown':
      // Move south (down and left)
      event.preventDefault()
      moveCardinal(SOUTH)
      break
  }
}

function toggleOpacity () {
  gameState.seeThroughWalls = !gameState.seeThroughWalls
  if (gameState.seeThroughWalls) {
    adjustPlayerVisibility([player.row, player.col])
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

function removeUndefinedSpaces (positions) {
  return positions.filter(position => {
    const [row, col] = position
    return space[row] && space[row][col] !== undefined
  })
}

function getWallClipPositions (row, col) {
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
  return removeUndefinedSpaces(positions)
}

function getClippedWallCapPositions (row, col) {
  const positions = [
    [row + 1, col - 1],
    [row + 2, col],
    [row + 3, col + 1],
    [row - 1, col + 1],
    [row, col + 2],
    [row + 1, col + 3]
  ]
  return removeUndefinedSpaces(positions)
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

function toggleClippedWallCaps (positions) {
  for (const position of positions) {
    const [row, col] = position
    const capId = `c${row}-${col}-clip`
    const cap = document.getElementById(capId)
    if (cap) {
      cap.remove()
    } else {
      const newCap = createCapIfExposed(row, col)
      if (newCap) {
        newCap.id = capId
        newCap.classList.add('clip-cap')
        insertSprite(newCap)
      }
    }
  }
}

function moveWallOpacity (currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentClipPositions = getWallClipPositions(currentRow, currentCol)
  const allClipPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldClipPositions = getWallClipPositions(oldRow, oldCol)
    const changedPositions = arrayDifference(
      currentClipPositions, oldClipPositions
    )
    allClipPositions.push(...changedPositions)
  } else {
    allClipPositions.push(...currentClipPositions)
  }
  toggleWallOpacity(allClipPositions)
}

function moveClippedWallCaps (currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentCapPositions = getClippedWallCapPositions(currentRow, currentCol)
  const allCapPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldCapPositions = getClippedWallCapPositions(oldRow, oldCol)
    const changedPositions = arrayDifference(
      currentCapPositions, oldCapPositions
    )
    allCapPositions.push(...changedPositions)
  } else {
    allCapPositions.push(...currentCapPositions)
  }
  toggleClippedWallCaps(allCapPositions)
}

function adjustPlayerVisibility (currentPosition, oldPosition) {
  if (gameState.seeThroughWalls) {
    moveWallOpacity(currentPosition, oldPosition)
    moveClippedWallCaps(currentPosition, oldPosition)
  }
}

function togglePlayerImage () {
  player.classList.toggle('boy')
  player.classList.toggle('girl')
}

function playerTop (row, col) {
  return floorTop(row, col) - PLAYER_TOP_ADJUST
}

function playerLeft (row, col) {
  return floorLeft(row, col) + PLAYER_LEFT_ADJUST
}

function playerZIndex (row, col) {
  return floorZIndex(row, col) + 1
}

function canMovePlayerTo (row, col) {
  return !document.getElementById(`w${row}-${col}`)
}

function movePlayerTo (row, col) {
  if (canMovePlayerTo(row, col)) {
    repositionSprite(
      player, playerTop(row, col), playerLeft(row, col), playerZIndex(row, col)
    )
    adjustPlayerVisibility([row, col], [player.row, player.col])
    player.col = col
    player.row = row
  }
}

function moveCardinal (dir) {
  movePlayerTo(player.row + dir.rowAdjust, player.col + dir.colAdjust)
}

function repositionSprite (sprite, top, left, zIndex) {
  sprite.style.top = top + 'px'
  sprite.style.left = left + 'px'
  sprite.style.zIndex = zIndex
}

function insertSprite (node) {
  if (node) {
    if (Array.isArray(node)) {
      node.forEach(sprite => renderWindow.appendChild(sprite))
    } else {
      renderWindow.appendChild(node)
    }
  }
}

function floorTop (row, col) {
  return 60 + ((row + col) * FLOOR_TOP_ADJUST)
}

function floorLeft (row, col) {
  const lastRow = space.length - 1
  const rowLeft = 60 + ((lastRow - row) * FLOOR_LEFT_ADJUST)
  return rowLeft + col * FLOOR_LEFT_ADJUST
}

function floorZIndex (row, col) {
  return (row + col) * 10
}

function createFloor (row, col) {
  const floor = document.createElement('div')
  floor.id = `f${row}-${col}`
  floor.classList.add('floor')
  repositionSprite(
    floor, floorTop(row, col), floorLeft(row, col), floorZIndex(row, col)
  )
  return floor
}

function createFloors () {
  for (let row = 0; row < space.length; row++) {
    for (let col = 0; col < space[row].length; col++) {
      insertSprite(createFloor(row, col))
    }
  }
}

function createCap (type, row, col) {
  const cap = document.createElement('div')
  cap.id = `c${row}-${col}`
  cap.classList.add('cap', type)
  repositionSprite(
    cap, wallTop(row, col), wallLeft(row, col), wallZIndex(row, col)
  )
  return cap
}

function isSpaceVisible (row, col) {
  if (space[row][col]) {
    const wall = document.getElementById(`w${row}-${col}`)
    return wall && wall.classList.contains('translucent')
  }
  return true
}

function getExposedCapType (row, col) {
  const wallType = space[row][col]
  const swcExposed = (
    row === space.length - 1 ||
    (isSpaceVisible(row + 1, col) && !isSpaceVisible(row, col))
  )
  const ewcExposed = (
    col === space[row].length - 1 ||
    (isSpaceVisible(row, col + 1) && !isSpaceVisible(row, col))
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

function createCapIfExposed (row, col) {
  const capType = getExposedCapType(row, col)
  if (capType) {
    return createCap(capType, row, col)
  }
}

function wallTop (row, col) {
  return floorTop(row, col) - WALL_TOP_ADJUST
}

function wallLeft (row, col) {
  return floorLeft(row, col) + WALL_LEFT_ADJUST
}

function wallZIndex (row, col) {
  return floorZIndex(row, col) + 1
}

function createWall (row, col) {
  const wallType = space[row][col]
  if (wallType && wallType.length) {
    const wall = document.createElement('div')
    wall.id = `w${row}-${col}`
    wall.classList.add('wall', wallType)
    repositionSprite(
      wall, wallTop(row, col), wallLeft(row, col), wallZIndex(row, col)
    )
    const cap = createCapIfExposed(row, col)
    return cap ? [wall, cap] : wall
  }
}

function createWalls () {
  for (let row = 0; row < space.length; row++) {
    for (let col = 0; col < space[row].length; col++) {
      insertSprite(createWall(row, col))
    }
  }
}

function createRoom () {
  createFloors()
  createWalls()
  movePlayerTo(4, 5)
}

createRoom()

window.addEventListener('keydown', onKeyDown)
