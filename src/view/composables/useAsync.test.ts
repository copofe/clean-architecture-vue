import { describe, expect, it, vi } from 'vitest'
import { useAsync } from './useAsync'

describe('useAsync', () => {
  it('should set isPending to true when running', async () => {
    const { isPending, run } = useAsync(() => Promise.resolve())
    run()
    expect(isPending.value).toBe(true)
  })

  it('should set data and isPending when resolved', async () => {
    const { isPending, data, run } = useAsync(() => Promise.resolve('foo'))
    await run()
    expect(isPending.value).toBe(false)
    expect(data.value).toBe('foo')
  })

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn()
    const { run } = useAsync(() => Promise.resolve('baz'), { onSuccess })
    await run()
    expect(onSuccess).toHaveBeenCalledWith('baz')
  })

  it('should not retry on success', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const retryAttempts = 2
    const { run } = useAsync(mockFn, { retry: true, attempt: retryAttempts })
    await expect(run()).resolves.toBe(undefined)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should call onError callback', async () => {
    const onError = vi.fn()
    const mockFn = vi.fn().mockRejectedValue(new Error('some error'))
    const { run } = useAsync(mockFn, { onError })
    await expect(run()).rejects.toThrowError()
    expect(onError).toHaveBeenCalled()
  })

  it('should retry and call onError callback when reaching the maximum number of attempts', async () => {
    const onError = vi.fn()
    const mockFn = vi.fn().mockRejectedValue(new Error('failure'))
    const retryAttempts = 2
    const { run } = useAsync(mockFn, { onError, retry: true, attempt: retryAttempts })
    await expect(run()).rejects.toThrowError('failure')
    expect(mockFn).toHaveBeenCalledTimes(retryAttempts)
    expect(onError).toHaveBeenCalled()
  })
})
