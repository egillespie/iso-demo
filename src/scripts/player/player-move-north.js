const moveCardinal = require('./player-move-cardinal')
const north = require('./const/player-cardinal-north')

// Move the player one space north in the provided board.
module.exports = function () {
  moveCardinal(north)
}
