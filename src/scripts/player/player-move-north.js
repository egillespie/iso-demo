const moveCardinal = require('./player-move-cardinal')
const north = require('./const/player-cardinal-north')

// Move the player one space north in the provided room.
module.exports = function (room) {
  moveCardinal(room, north)
}
