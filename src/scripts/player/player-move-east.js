const moveCardinal = require('./player-move-cardinal')
const east = require('./const/player-cardinal-east')

// Move the player one space east in the provided room.
module.exports = function (room) {
  moveCardinal(room, east)
}
