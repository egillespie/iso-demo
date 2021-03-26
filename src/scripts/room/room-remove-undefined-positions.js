// Returns a filtered array of positions that contain only positions that
// exist (are not `undefined`) in the specified room.
module.exports = function (room, positions) {
  return positions.filter(position => {
    const [row, col] = position
    return room[row] && room[row][col] !== undefined
  })
}
