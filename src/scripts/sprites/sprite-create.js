// Creates a new sprite element
module.exports = function (id) {
  const sprite = document.createElement('div')
  sprite.id = id
  sprite.classList.add('sprite')
  return sprite
}
