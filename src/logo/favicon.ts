import { logo } from './logo'

export function favicon() {
  let favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
  if (favicon === null) {
    // Create favicon if not exist
    favicon = document.createElement('link')
    favicon.rel = 'icon'
    document.head.appendChild(favicon)
  }
  // Initialize favicon
  setIcon({ dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches })
  // Listen for the browser's theme change and update the favicon automatically
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    setIcon({ dark: event.matches })
  })

  function setIcon({ dark }: { dark: boolean }) {
    favicon.href = `data:image/svg+xml,${logo({ dark: dark })}`
  }
}
