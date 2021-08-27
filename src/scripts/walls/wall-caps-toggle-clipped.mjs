import createWallCapIfExposed from './wall-cap-create-if-exposed'

// Removes wall caps that are no longer exposed by translucent walls
// and adds wall caps where newly exposed.
export default function (board, positions) {
  for (const position of positions) {
    const [row, col] = position
    const capId = `c${row}-${col}-clip`
    const cap = document.getElementById(capId)
    if (cap) {
      cap.remove()
    } else {
      createWallCapIfExposed(board, row, col, {
        id: capId,
        classList: ['clip-cap']
      })
    }
  }
}
