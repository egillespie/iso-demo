import moveCardinal from './player-move-cardinal.mjs'
import { playerCardinalNorth } from './player-const.mjs'

// Move the player one space north in the provided board.
export default function () {
  moveCardinal(playerCardinalNorth)
}
