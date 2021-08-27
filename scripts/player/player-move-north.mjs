import moveCardinal from './player-move-cardinal'
import { playerCardinalNorth } from './player-const'

// Move the player one space north in the provided board.
export default function () {
  moveCardinal(playerCardinalNorth)
}
