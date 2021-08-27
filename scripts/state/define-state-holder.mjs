export default function (baseState, stateHolderName) {
  Object.defineProperty(baseState, stateHolderName, {
    value: {},
    enumerable: true,
    writable: false
  })
}
