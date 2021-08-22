import moveCardinal from './player-move-cardinal.mjs'
import east from './const/player-cardinal-east.mjs'

// Move the player one space east in the provided board.
export default function () {
  moveCardinal(east)
}
