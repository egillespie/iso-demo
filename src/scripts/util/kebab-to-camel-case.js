module.exports = str =>
  str.split('-').map(s => s.replace(/^\w/, c => c.toUpperCase())).join('')
