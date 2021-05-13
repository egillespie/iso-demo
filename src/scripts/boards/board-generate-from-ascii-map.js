// Produces an isometric board from an array of strings containing
// ASCII map characters that show where walls, floors, doors, etc. go.
//
// const asciiMap = [
//   '........',
//   '########',
//   '#.#....#',
//   '#......#',
//   '#.#....#',
//   '#.######',
//   '#.D.....',
//   '#####...'
// ]
//
// const board = [
//   [null, null, null, null, null, null, null, null],
//   ['nww', 'nsw', 'net', 'nsw', 'nsw', 'nsw', 'nsw', 'new'],
//   ['eww', null, 'eww', null, null, null, null, 'eww'],
//   ['eww', null, null, null, null, null, null, 'eww'],
//   ['eww', null, 'eww', null, null, null, null, 'eww'],
//   ['eww', null, 'nwt', 'nsw', 'nsw', 'nsw', 'nsw', 'sew'],
//   ['eww', null, null, null, null, null, null, null],
//   ['sww', 'nsw', 'swt', 'nsw', 'nsw', null, null, null]
// ]

function asciiCharAt (asciiMap, row, col) {
  return (asciiMap[row] && asciiMap[row][col]) || ' '
}

function wallAt (asciiMap, row, col) {
  return asciiCharAt(asciiMap, row, col) === '#'
}

function doorAt (asciiMap, row, col) {
  return asciiCharAt(asciiMap, row, col) === 'D'
}

module.exports = function (asciiMap) {
  const board = []
  for (let row = 0; row < asciiMap.length; row++) {
    board[row] = []
    for (let col = 0; col < asciiMap[row].length; col++) {
      const asciiChar = asciiCharAt(asciiMap, row, col)
      switch (asciiChar) {
        case ' ':
          board[row][col] = undefined
          break
        case '.':
          board[row][col] = null
          break
        case '#': {
          const nWall = wallAt(asciiMap, row - 1, col)
          const eWall = wallAt(asciiMap, row, col + 1)
          const sWall = wallAt(asciiMap, row + 1, col)
          const wWall = wallAt(asciiMap, row, col - 1)
          const nDoor = doorAt(asciiMap, row - 1, col)
          const eDoor = doorAt(asciiMap, row, col + 1)
          const sDoor = doorAt(asciiMap, row + 1, col)
          const wDoor = doorAt(asciiMap, row, col - 1)
          const nConnect = nWall || nDoor
          const eConnect = eWall || eDoor
          const sConnect = sWall || sDoor
          const wConnect = wWall || wDoor

          if (nConnect && eConnect && sConnect && wConnect) {
            board[row][col] = 'crt'
          } else if (nConnect && eConnect && sConnect) {
            board[row][col] = 'nwt'
          } else if (eConnect && sConnect && wConnect) {
            board[row][col] = 'net'
          } else if (sConnect && wConnect && nConnect) {
            board[row][col] = 'set'
          } else if (wConnect && nConnect && eConnect) {
            board[row][col] = 'swt'
          } else if (nConnect && eConnect) {
            board[row][col] = 'sww'
          } else if (eConnect && sConnect) {
            board[row][col] = 'nww'
          } else if (sConnect && wConnect) {
            board[row][col] = 'new'
          } else if (wConnect && nConnect) {
            board[row][col] = 'sew'
          } else if (nConnect || sConnect) {
            board[row][col] = 'eww'
          } else if (wConnect || eConnect) {
            board[row][col] = 'nsw'
          } else {
            board[row][col] = 'csp'
          }
          break
        }
        default:
          board[row][col] = null
          break
      }
    }
  }
  return board
}
