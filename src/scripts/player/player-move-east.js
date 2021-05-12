const moveCardinal = require('./player-move-cardinal')
const east = require('./const/player-cardinal-east')

// Move the player one space east in the provided board.
module.exports = function () {
  moveCardinal(east)
}
