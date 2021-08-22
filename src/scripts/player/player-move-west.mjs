import moveCardinal from './player-move-cardinal.mjs'
import west from './const/player-cardinal-west.mjs'

// Move the player one space west in the provided board.
export default function () {
  moveCardinal(west)
}
