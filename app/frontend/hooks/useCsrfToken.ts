const useCsrfToken = (): string => {
  const meta = document.querySelector('meta[name="csrf-token"]')
  return meta ? meta.getAttribute('content') || '' : ''
}

export default useCsrfToken
