const kebabToPascalCase = require('./kebab-to-pascal-case')

// Converts a kebab-case string to camelCase
module.exports = str =>
  kebabToPascalCase(str).replace(/^\w/, c => c.toLowerCase())
