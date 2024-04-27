interface Options<T> {
  /**
   * Retry on failure.
   * @default false
   */
  retry?: boolean
  /**
   * Maximum number of retry attempts.
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
  /**
   * caching based on this key
   */
  key?: string
  /**
   * Call the function immediately
   */
  immediate?: boolean
  /**
   * Initial data
   */
  initialData?: T
}

const cache = new Map()

export function useAsync<T, P>(fn: (...args: P[]) => Promise<T>, options: Options<T> = {}) {
  const { retry = false, attempt = 10, onError, onSuccess, immediate, key, initialData } = options

  let attemptCount = 0

  const interval = () => 1000 * (attemptCount + 1)

  const isPending = ref(false)

  const data: Ref<T | null> = ref(null)

  async function run(...args: P[]) {
    isPending.value = true

    try {
      if (key) {
        const res: T = cache.get(key)
        data.value = res
        isPending.value = false
      }
      const res = await fn(...args)
      data.value = res
      isPending.value = false
      cache.set(key, res)
      onSuccess?.(res)
      attemptCount = 0
    }
    catch (err) {
      attemptCount++
      if (retry && attemptCount < attempt) {
        await new Promise(resolve => setTimeout(resolve, interval()))
        await run(...args)
        /* v8 ignore next */
      }
      else {
        isPending.value = false
        attemptCount = 0
        onError?.(err)
        throw err
      }
    }
  }

  if (immediate)
    run()

  if (initialData)
    data.value = initialData

  return {
    isPending,
    data,
    run,
  }
}
