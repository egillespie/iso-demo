// Converts a kebab-case string to PascalCase
export default str =>
  str.split('-').map(s => s.replace(/^\w/, c => c.toUpperCase())).join('')
