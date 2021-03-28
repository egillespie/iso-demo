// Toggles the "translucent" style class on all walls and wall caps
// in the specified positions.
module.exports = function (positions) {
  for (const position of positions) {
    const [row, col] = position
    const wall = document.getElementById(`w${row}-${col}`)
    if (wall) {
      wall.classList.toggle('translucent')
    }
    const cap = document.getElementById(`c${row}-${col}`)
    if (cap) {
      cap.classList.toggle('translucent')
    }
  }
}
