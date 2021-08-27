import clearRenderWindow from '../render-window/render-window-clear'
import state from '../state/index'
import generateBoardFromAsciiMap from './board-generate-from-ascii-map'
import createFloors from '../floors/floors-create'
import createWalls from '../walls/walls-create'

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
