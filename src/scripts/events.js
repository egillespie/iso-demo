const player = document.getElementById('player')

const PLAYER_X_ADJUST = 20
const PLAYER_Y_ADJUST = 10
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
    if (
      wall.id.substring(0, 2) !== 'w1' &&
      wall.id.substring(3, 4) !== '0'
    ) {
      wall.classList.toggle('translucent')
    }
  }
}

function canMoveTo (x, y) {
  return !document.getElementById('w' + y + '-' + x)
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

moveTo({
  top: 112,
  left: 205,
  zIndex: 9,
  gridx: 5,
  gridy: 4
})

window.addEventListener('keydown', onKeyDown)
