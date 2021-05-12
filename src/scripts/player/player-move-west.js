const moveCardinal = require('./player-move-cardinal')
const west = require('./const/player-cardinal-west')

// Move the player one space west in the provided board.
module.exports = function () {
  moveCardinal(west)
}
