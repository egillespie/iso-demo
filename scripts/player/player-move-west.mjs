import moveCardinal from './player-move-cardinal'
import { playerCardinalWest } from './player-const'

// Move the player one space west in the provided board.
export default function () {
  moveCardinal(playerCardinalWest)
}
