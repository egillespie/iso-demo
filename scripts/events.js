const boy = document.getElementById('boy1')

function onKeyPress (e) {
  const keynum = window.event ? e.keyCode : e.which

  switch (keynum) {
    case 111: // o = see through walls
      toggleOpacity()
      break
    case 106: // j = west
      moveRel(boy.gridx - 1, boy.gridy, -20, -10, -1)
      break
    case 105: // i = north
      moveRel(boy.gridx, boy.gridy - 1, 20, -10, -1)
      break
    case 108: // l = east
      moveRel(boy.gridx + 1, boy.gridy, 20, 10, 1)
      break
    case 107: // k = south
      moveRel(boy.gridx, boy.gridy + 1, -20, 10, 1)
      break
  }
  return 0
}

function toggleOpacity () {
  const elems = document.getElementsByTagName('div')

  for (let i = 0; i < elems.length; i++) {
    if (
      elems[i].className.substring(0, 4) === 'wall' &&
      elems[i].id.substring(0, 2) !== 'w1' &&
      elems[i].id.substring(3, 4) !== '0'
    ) {
      if (!elems[i].style.opacity || elems[i].style.opacity === 'none') {
        elems[i].style.opacity = 0.4
      } else {
        elems[i].style.opacity = 1.0
      }
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

  document.body.addEventListener('keypress', onKeyPress)
}

init()
