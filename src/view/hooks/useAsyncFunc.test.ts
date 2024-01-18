import { describe, expect, it } from 'vitest'
import { useAsyncFunc } from './useAsyncFunc'

describe('useAsyncFunc', () => {
  it('should initialize with status waiting', () => {
    const { status, statusIs } = useAsyncFunc(() => Promise.resolve())
    expect(status.value).toBe('waiting')
    expect(statusIs.value.waiting).toBeTruthy()
  })

  it('should set status to executing when executed', async () => {
    const { execute, status, statusIs } = useAsyncFunc(() => new Promise(resolve => setTimeout(resolve, 1000)))
    execute()
    expect(status.value).toBe('executing')
    expect(statusIs.value.executing).toBeTruthy()
  })

  it('should set status to succeeded on resolve', async () => {
    const { execute, status, statusIs } = useAsyncFunc(() => Promise.resolve())
    await execute()
    expect(status.value).toBe('succeeded')
    expect(statusIs.value.succeeded).toBeTruthy()
  })

  it('should set status to failed on reject', async () => {
    const { execute, status, statusIs } = useAsyncFunc(() => Promise.reject(new Error('reject')))
    await execute()
    expect(status.value).toBe('failed')
    expect(statusIs.value.failed).toBeTruthy()
  })

  it('should immediately execute if immediate option', async () => {
    const { status, statusIs } = useAsyncFunc(() => new Promise(resolve => setTimeout(resolve, 1000)), { immediate: true })
    expect(status.value).toBe('executing')
    expect(statusIs.value.executing).toBeTruthy()
  })
})
