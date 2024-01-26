interface Options<T> {
  /**
   * Retry when status is failed
   * @default false
   */
  retry?: boolean
  /**
   * Maximum number of attempts
   * @default 10
   */
  attempt?: number
  /**
   * Callback when error is caught.
   */
  onError?: (e: unknown) => void
  /**
   * Callback when success is caught.
   * @param {T} data
   */
  onSuccess?: (data: T) => void
}

export function useAsyncFunc<T, P extends any[]>(fn: (...args: P) => Promise<T>, options: Options<T> = {}) {
  const { retry = false, attempt = 10, onError, onSuccess } = options

  let attemptCount = 0

  const interval = () => 1000 * (attemptCount + 1)

  const isLoading = ref(false)

  const data: Ref<T | null> = ref(null)

  async function run(...args: P) {
    isLoading.value = true

    try {
      const res = await fn(...args)
      data.value = res
      isLoading.value = false
      if (onSuccess)
        onSuccess(res)
      attemptCount = 0
    }
    catch (err) {
      if (retry && attemptCount < attempt) {
        attemptCount++
        await new Promise(resolve => setTimeout(resolve, interval()))
        run(...args)
      }
      else {
        isLoading.value = false
        attemptCount = 0
        if (onError)
          onError(err)
        throw err
      }
    }
  }

  return {
    isLoading,
    run,
    data,
  }
}
