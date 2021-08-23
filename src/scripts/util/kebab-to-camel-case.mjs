import kebabToPascalCase from './kebab-to-pascal-case.mjs'

// Converts a kebab-case string to camelCase
export default s => kebabToPascalCase(s).replace(/^\w/, c => c.toLowerCase())
