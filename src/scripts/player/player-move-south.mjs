import moveCardinal from './player-move-cardinal.mjs'
import south from './const/player-cardinal-south.mjs'

// Move the player one space south in the provided board.
export default function () {
  moveCardinal(south)
}
