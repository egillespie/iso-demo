const moveCardinal = require('./player-move-cardinal')
const south = require('./const/player-cardinal-south')

// Move the player one space south in the provided room.
module.exports = function () {
  moveCardinal(south)
}
