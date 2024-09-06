// import { describe, expect, it } from 'vitest'
import { favicon } from '@/favicon'

describe('favicon.ts', () => {
  beforeEach(() => {
    favicon()
  })
  it('browser theme', () => {
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    expect(favicon.tagName).to.eq('LINK')
    expect(favicon.rel).to.eq('icon')
    const href = favicon.href
    expect(href).to.exist
    expect(href).to.contain('data:image/svg+xml,')
    expect(href).to.contain('<svg')
    expect(href).to.contain('<path')
    expect(href).to.contain('/>')
    expect(href).to.contain('</svg>')
    expect(href).to.contain('viewBox')
    expect(href).to.contain('d')
    if (dark) {
      expect(href).to.contain(`fill="white"`)
    } else {
      expect(href).to.contain(`fill="black"`)
    }
  })
})
