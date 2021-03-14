const space = [
  [[], [], [], [], [], [], [], []],
  [['nww'], ['nsw'], ['net'], ['nsw'], ['nsw'], ['nsw'], ['nsw'], ['new']],
  [['eww'], [], ['eww', 'swc'], [], [], [], [], ['eww']],
  [['eww'], [], [], [], [], [], [], ['eww']],
  [['eww'], [], ['eww'], [], [], [], [], ['eww']],
  [['eww'], [], ['nwt', 'swc'], ['nsw'], ['nsw'], ['nsw'], ['nsw'], ['sew']],
  [['eww'], [], [], [], [], [], [], []],
  [['sww'], ['nsw'], ['swt'], ['nsw'], ['nsw', 'ewc'], [], [], []]
]

const renderWindow = document.getElementById('render-window')
const player = document.getElementById('player')

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
  const walls = document.getElementsByClassName('wall')
  for (const wall of walls) {
    wall.classList.toggle('translucent')
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
  return floorZIndex(row, col)
}

function canMovePlayerTo (row, col) {
  return !document.getElementById(`w${row}-${col}.0`)
}

function movePlayerTo (row, col) {
  if (canMovePlayerTo(row, col)) {
    repositionSprite(
      player, playerTop(row, col), playerLeft(row, col), playerZIndex(row, col)
    )
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
  renderWindow.insertBefore(node, player)
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
  return row + col
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
      const floor = createFloor(row, col)
      insertSprite(floor)
    }
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

function createWallSegment (type, row, col, index) {
  const segment = document.createElement('div')
  segment.id = `w${row}-${col}.${index}`
  segment.classList.add('wall', type)
  repositionSprite(
    segment, wallTop(row, col), wallLeft(row, col), wallZIndex(row, col)
  )
  return segment
}

function createWall (row, col) {
  const wallSegments = space[row][col]
  return wallSegments.map(
    (segmentType, index) => createWallSegment(segmentType, row, col, index)
  )
}

function createWalls () {
  for (let row = 0; row < space.length; row++) {
    for (let col = 0; col < space[row].length; col++) {
      const wall = createWall(row, col)
      wall.forEach((wallSegment) => insertSprite(wallSegment))
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
