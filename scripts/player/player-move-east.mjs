import moveCardinal from './player-move-cardinal.mjs'
import { playerCardinalEast } from './player-const.mjs'

// Move the player one space east in the provided board.
export default function () {
  moveCardinal(playerCardinalEast)
}
