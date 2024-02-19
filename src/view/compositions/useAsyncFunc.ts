interface Options<T> {
  /**
   * Retry on failure.
   * @default false
   */
  retry?: boolean
  /**
   * Max number of retry attempts.
   * @default 10
   */
  attempt?: number
  /**
   * Callback for handling errors.
   * @param e The caught error object.
   */
  onError?: (e: unknown) => void
  /**
   * Callback for successful operation.
   * @param data The data returned from the operation.
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
    if (isLoading.value)
      return
    isLoading.value = true

    try {
      const res = await fn(...args)
      data.value = res
      isLoading.value = false
      onSuccess?.(res)
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
        onError?.(err)
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
