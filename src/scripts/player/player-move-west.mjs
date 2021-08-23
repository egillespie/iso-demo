import moveCardinal from './player-move-cardinal.mjs'
import { playerCardinalWest } from './player-const.mjs'

// Move the player one space west in the provided board.
export default function () {
  moveCardinal(playerCardinalWest)
}
