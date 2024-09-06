import { describe, expect, it } from 'vitest'
import { logo } from '@/logo'

describe.concurrent('logo.ts', () => {
  it('Valid', () => {
    expect(logo).toBeTruthy()
  })
  it('dark: true', () => {
    const result = expect(logo({ dark: true }))
    result.toContain(`fill="white"`)
    result.toContain('<svg')
    result.toContain('<path')
    result.toContain('/>')
    result.toContain('</svg>')
    result.toContain('viewBox')
    result.toContain('d')
  })
  it('dark: false', () => {
    const result = expect(logo({ dark: false }))
    result.toContain(`fill="black"`)
    result.toContain('<svg')
    result.toContain('<path')
    result.toContain('/>')
    result.toContain('</svg>')
    result.toContain('viewBox')
    result.toContain('d')
  })
})
