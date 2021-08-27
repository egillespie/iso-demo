import StateChangeEvent from './state-change-event'

// Defines a new state property that is enumerable and writable. Changing the
// value of the property will automatically emit a StateChangeEvent containing
// for the field while providing the old and new values.
//
// The `fieldName` is the full dot-separated name to access the field in
// `./state/index.js`. For example, `seeThroughWalls` or `player.row`.
export default function (stateHolder, fieldName, initialValue) {
  const privateFieldName = `_${fieldName.replace(/[.]/g, '_')}`
  const lastField = fieldName.substring(fieldName.lastIndexOf('.') + 1)
  stateHolder[privateFieldName] = initialValue
  Object.defineProperty(stateHolder, lastField, {
    enumerable: true,
    get () {
      return this[privateFieldName]
    },
    set (newValue) {
      const oldValue = this[privateFieldName]
      if (newValue !== oldValue) {
        this[privateFieldName] = newValue
        const event = new StateChangeEvent(fieldName, { oldValue, newValue })
        window.dispatchEvent(event)
      }
    }
  })
}
