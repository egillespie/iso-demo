import moveCardinal from './player-move-cardinal.mjs'
import { playerCardinalSouth } from './player-const.mjs'

// Move the player one space south in the provided board.
export default function () {
  moveCardinal(playerCardinalSouth)
}
