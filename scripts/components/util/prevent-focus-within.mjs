import focusableElements from './const/focusable-elements-selector'

export default function (parentElement) {
  parentElement
    .querySelectorAll(focusableElements)
    .forEach(e => e.setAttribute('tabindex', '-1'))
}
