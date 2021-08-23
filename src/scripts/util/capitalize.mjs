export default function (str) {
  return str.replace(/^\w/, c => c.toUpperCase())
}
