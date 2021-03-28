const moveCardinal = require('./player-move-cardinal')
const west = require('./const/player-cardinal-west')

// Move the player one space west in the provided room.
module.exports = function (room) {
  moveCardinal(room, west)
}
