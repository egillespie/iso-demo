const boy = document.getElementById('boy1')

function onKeyDown (event) {
  switch (event.code) {
    case 'KeyO':
      // Toggle translucent/solid walls
      event.preventDefault()
      toggleOpacity()
      break
    case 'KeyA':
    case 'ArrowLeft':
      // Move up and left
      event.preventDefault()
      moveRel(boy.gridx - 1, boy.gridy, -20, -10, -1)
      break
    case 'KeyW':
    case 'ArrowUp':
      // Move up and right
      event.preventDefault()
      moveRel(boy.gridx, boy.gridy - 1, 20, -10, -1)
      break
    case 'KeyD':
    case 'ArrowRight':
      // Move down and right
      event.preventDefault()
      moveRel(boy.gridx + 1, boy.gridy, 20, 10, 1)
      break
    case 'KeyS':
    case 'ArrowDown':
      // Move down and left
      event.preventDefault()
      moveRel(boy.gridx, boy.gridy + 1, -20, 10, 1)
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

function moveRel (x, y, relx, rely, relz) {
  if (canMoveTo(x, y)) {
    boy.style.top = (parseInt(boy.style.top) + rely) + 'px'
    boy.style.left = (parseInt(boy.style.left) + relx) + 'px'
    boy.style.zIndex = parseInt(boy.style.zIndex) + relz
    boy.gridx = x
    boy.gridy = y
  }
}

function init () {
  boy.style.top = '112px'
  boy.style.left = '205px'
  boy.style.zIndex = 9
  boy.gridx = 5
  boy.gridy = 4

  window.addEventListener('keydown', onKeyDown)
}

init()
