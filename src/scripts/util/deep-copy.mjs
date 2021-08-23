export default function (value) {
  return typeof value === 'object'
    ? JSON.parse(JSON.stringify(value))
    : value
}
