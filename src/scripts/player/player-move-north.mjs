import moveCardinal from './player-move-cardinal.mjs'
import north from './const/player-cardinal-north.mjs'

// Move the player one space north in the provided board.
export default function () {
  moveCardinal(north)
}
