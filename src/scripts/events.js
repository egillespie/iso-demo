const space = [
  [[], [], [], [], [], [], [], []],
  [['nww'], ['nsw'], ['net', 'swc'], ['nsw'], ['nsw'], ['nsw'], ['nsw'], ['new', 'swc']],
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

const FLOOR_TOP_ADJUST = (FLOOR_HEIGHT - FLOOR_LIFT) / 2
const FLOOR_LEFT_ADJUST = FLOOR_WIDTH / 2
const WALL_TOP_ADJUST = WALL_HEIGHT - FLOOR_HEIGHT + FLOOR_LIFT + WALL_LIFT
const WALL_LEFT_ADJUST = (FLOOR_WIDTH - WALL_WIDTH) / 2

const PLAYER_X_ADJUST = FLOOR_WIDTH / 2
const PLAYER_Y_ADJUST = (FLOOR_HEIGHT - FLOOR_LIFT) / 2
const PLAYER_Z_ADJUST = 1

const WEST = {
  gridxAdjust: -1,
  gridyAdjust: 0,
  relx: -PLAYER_X_ADJUST,
  rely: -PLAYER_Y_ADJUST,
  relz: -PLAYER_Z_ADJUST
}

const NORTH = {
  gridxAdjust: 0,
  gridyAdjust: -1,
  relx: PLAYER_X_ADJUST,
  rely: -PLAYER_Y_ADJUST,
  relz: -PLAYER_Z_ADJUST
}

const EAST = {
  gridxAdjust: 1,
  gridyAdjust: 0,
  relx: PLAYER_X_ADJUST,
  rely: PLAYER_Y_ADJUST,
  relz: PLAYER_Z_ADJUST
}

const SOUTH = {
  gridxAdjust: 0,
  gridyAdjust: 1,
  relx: -PLAYER_X_ADJUST,
  rely: PLAYER_Y_ADJUST,
  relz: PLAYER_Z_ADJUST
}

function onKeyDown (event) {
  switch (event.code) {
    case 'KeyO':
      // Toggle translucent/solid walls
      event.preventDefault()
      toggleOpacity()
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

function canMoveTo (x, y) {
  return !document.getElementById(`w${y}-${x}.0`)
}

function moveTo ({ top, left, zIndex, gridx, gridy }) {
  if (canMoveTo(gridx, gridy)) {
    player.style.top = top + 'px'
    player.style.left = left + 'px'
    player.style.zIndex = zIndex
    player.gridx = gridx
    player.gridy = gridy
  }
}

function moveCardinal (dir) {
  moveTo({
    top: parseInt(player.style.top) + dir.rely,
    left: parseInt(player.style.left) + dir.relx,
    zIndex: parseInt(player.style.zIndex) + dir.relz,
    gridx: player.gridx + dir.gridxAdjust,
    gridy: player.gridy + dir.gridyAdjust
  })
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
  floor.style.top = floorTop(row, col) + 'px'
  floor.style.left = floorLeft(row, col) + 'px'
  floor.style.zIndex = floorZIndex(row, col)
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
  segment.style.top = wallTop(row, col) + 'px'
  segment.style.left = wallLeft(row, col) + 'px'
  segment.style.zIndex = wallZIndex(row, col)
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
}

createRoom()

moveTo({
  top: 112,
  left: 205,
  zIndex: 9,
  gridx: 5,
  gridy: 4
})

window.addEventListener('keydown', onKeyDown)
