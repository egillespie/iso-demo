// Makes all walls opaque by removing the 'translucent' style class from
// all elements and removing all clipped wall caps.
module.exports = function () {
  // Remove translucency style
  const sprites = document.getElementsByClassName('translucent')
  while (sprites.length > 0) {
    sprites[0].classList.remove('translucent')
  }
  // Remove clipped wall caps
  const clipCaps = document.getElementsByClassName('clip-cap')
  while (clipCaps.length > 0) {
    clipCaps[0].remove()
  }
}
