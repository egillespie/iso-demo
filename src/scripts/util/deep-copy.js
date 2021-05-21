module.exports = function (value) {
  return value ? JSON.parse(JSON.stringify(value)) : value
}
