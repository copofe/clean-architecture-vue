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

  it('should retry on failure', async () => {
    const mockFn = vi.fn().mockRejectedValueOnce(new Error('failure')).mockResolvedValue('bar')
    const { run } = useAsyncFunc(mockFn, { retry: true })
    await run()
    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn()
    const { run } = useAsyncFunc(() => Promise.resolve('baz'), { onSuccess })
    await run()
    expect(onSuccess).toHaveBeenCalledWith('baz')
  })

  it('should call onError callback', async () => {
    const onError = vi.fn()
    const mockFn = vi.fn().mockRejectedValue(new Error('some error'))
    const { run } = useAsyncFunc(mockFn, { onError })
    try {
      await run()
    }
    catch (error) {
      expect(onError).toHaveBeenCalled()
    }
  })
})
