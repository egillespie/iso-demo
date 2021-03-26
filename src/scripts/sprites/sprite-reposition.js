// Sets new top, left, and z-index values on an element (sprite).
module.exports = function (sprite, top, left, zIndex) {
  sprite.style.top = `${top}px`
  sprite.style.left = `${left}px`
  sprite.style.zIndex = zIndex
}
