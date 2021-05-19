// Creates a new sprite element
module.exports = function (id, attrs) {
  const sprite = document.createElement('div')
  sprite.id = id
  sprite.classList.add('sprite')
  if (attrs?.classList) {
    sprite.classList.add(...attrs.classList)
  }
  return sprite
}
