export default function (element) {
  element.classList.remove('hidden')
  element.setAttribute('aria-hidden', false)
}
