const state = require('../state')
const createFloors = require('../floors/floors-create')
const createWalls = require('../walls/walls-create')
const generateBoardFromAsciiMap = require('./board-generate-from-ascii-map')
const clearRenderWindow = require('../render-window/render-window-clear')

// Create and render a whole board, make it the active board,
// and place the player in it.
module.exports = function () {
  const asciiMap = [
    '   ##### #######        ',
    '   #...# #.....#  ##### ',
    ' ###...###.....#  #...# ',
    ' #.....#.D..#..#  #.#D##',
    ' #.....#.#.....#  #.#..#',
    ' #D#####.#.....#  #.#..#',
    ' #.....#.#######  #.#..#',
    ' ##.##.........#  #.#..#',
    '  #.####.#D###.####.##D#',
    '  #.#  #.#...#.........#',
    ' ##D#  #.#...#.#########',
    ' #..#  #.#...#.#.....#  ',
    ' #..#  #.#...#.#.....#  ',
    ' #..#  #.#...#.D.....#  ',
    ' #..#  #.#...###.....#  ',
    ' ####  #.#############  ',
    '       #.# #..#         ',
    '       #.# #..###       ',
    '       #.# #..D.#       ',
    '     ###.######.#       ',
    '     #..........#       ',
    '     #.##########       ',
    '     #.D....#           ',
    '     ########           '
  ]
  const board = generateBoardFromAsciiMap(asciiMap)
  state.asciiMap = asciiMap
  state.currentBoard = board
  clearRenderWindow()
  createFloors(board)
  createWalls(board)
}
