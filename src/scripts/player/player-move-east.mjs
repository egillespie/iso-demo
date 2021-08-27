import moveCardinal from './player-move-cardinal'
import { playerCardinalEast } from './player-const'

// Move the player one space east in the provided board.
export default function () {
  moveCardinal(playerCardinalEast)
}
