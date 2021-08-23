import clearRenderWindow from '../render-window/render-window-clear.mjs'
import state from '../state/index.mjs'
import generateBoardFromAsciiMap from './board-generate-from-ascii-map.mjs'
import createFloors from '../floors/floors-create.mjs'
const createWalls = require('../walls/walls-create')

// Create and render a whole board, make it the active board,
// and place the player in it.
export default function () {
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
