import Timer from 'sync-timer'

export function removeLoading () {
  const loading = document.getElementById('loading')

  if (loading) {
    loading.style.opacity = '0'

    new Timer(() => {
      loading.remove()
    }, 300)
  }
}
