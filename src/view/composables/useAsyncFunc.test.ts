import { describe, expect, it, vi } from 'vitest'
import { useAsyncFunc } from './useAsyncFunc'

describe('useAsyncFunc', () => {
  it('should set isLoading to true when running', async () => {
    const { isLoading, run } = useAsyncFunc(() => Promise.resolve())
    run()
    expect(isLoading.value).toBe(true)
  })

  it('should set data and isLoading when resolved', async () => {
    const { isLoading, data, run } = useAsyncFunc(() => Promise.resolve('foo'))
    await run()
    expect(isLoading.value).toBe(false)
    expect(data.value).toBe('foo')
  })

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn()
    const { run } = useAsyncFunc(() => Promise.resolve('baz'), { onSuccess })
    await run()
    expect(onSuccess).toHaveBeenCalledWith('baz')
  })

  it('should not retry on success', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const retryAttempts = 2
    const { run } = useAsyncFunc(mockFn, { retry: true, attempt: retryAttempts })
    await expect(run()).resolves.toBe(undefined)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should call onError callback', async () => {
    const onError = vi.fn()
    const mockFn = vi.fn().mockRejectedValue(new Error('some error'))
    const { run } = useAsyncFunc(mockFn, { onError })
    await expect(run()).rejects.toThrowError()
    expect(onError).toHaveBeenCalled()
  })

  it('should retry and call onError callback when reaching the maximum number of attempts', async () => {
    const onError = vi.fn()
    const mockFn = vi.fn().mockRejectedValue(new Error('failure'))
    const retryAttempts = 2
    const { run } = useAsyncFunc(mockFn, { onError, retry: true, attempt: retryAttempts })
    await expect(run()).rejects.toThrowError('failure')
    expect(mockFn).toHaveBeenCalledTimes(retryAttempts)
    expect(onError).toHaveBeenCalled()
  })
})
