module.exports = function (str) {
  return str.replace(/^\w/, c => c.toUpperCase())
}
