// Returns true if a wall exists at the specified position in the room
// and the wall is not translucent. Returns false otherwise.
module.exports = function (room, row, col) {
  if (room[row][col]) {
    const wall = document.getElementById(`w${row}-${col}`)
    return wall && wall.classList.contains('translucent')
  }
  return true
}
