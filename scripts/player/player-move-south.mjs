import moveCardinal from './player-move-cardinal'
import { playerCardinalSouth } from './player-const'

// Move the player one space south in the provided board.
export default function () {
  moveCardinal(playerCardinalSouth)
}
