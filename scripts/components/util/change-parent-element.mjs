// Moves all child elements of `srcParent` to `destParent`.
export default function (srcParent, destParent) {
  const nodes = srcParent.children
  for (let i = 0; nodes.length - i; destParent.firstChild === nodes[0] && i++) {
    destParent.appendChild(nodes[i])
  }
}
