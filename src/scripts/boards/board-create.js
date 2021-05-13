const state = require('../state')
const createFloors = require('../floors/floors-create')
const createWalls = require('../walls/walls-create')
const generateBoardFromAsciiMap = require('./board-generate-from-ascii-map')

// Create and render a whole board, make it the active board,
// and place the player in it.
module.exports = function () {
  const asciiMap = [
    ' ####### #######        ',
    ' #.....# #.....#  ##### ',
    ' #.....###.....#  #...# ',
    ' #.....#.D.....#  #.#D##',
    ' #.....#.#.....#  #.#..#',
    ' #D#####.#.....#  #.#..#',
    ' #.....#.#######..#.#..#',
    ' ##.##.........#..#.#..#',
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
  state.currentBoard = board
  createFloors(board)
  createWalls(board)
}
