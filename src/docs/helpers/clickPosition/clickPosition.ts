export function clickPosition () {
  document.addEventListener('click', (e) => {
    document.body.style.setProperty('--click-x', e.clientX + 'px')
    document.body.style.setProperty('--click-y', e.clientY + 'px')
  })
}
