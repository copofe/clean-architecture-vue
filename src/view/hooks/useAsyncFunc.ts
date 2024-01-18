interface TaskOptions {
  immediate?: boolean
}

type TaskStatus = 'waiting' | 'executing' | 'succeeded' | 'failed'

export function useAsyncFunc<T extends () => Promise<any>>(fn: T, options: TaskOptions = {}) {
  const status = ref<TaskStatus>('waiting')

  const statusIs = computed(() => ({
    waiting: status.value === 'waiting',
    executing: status.value === 'executing',
    succeeded: status.value === 'succeeded',
    failed: status.value === 'failed',
  }))

  async function execute() {
    status.value = 'executing'

    try {
      await fn()
      status.value = 'succeeded'
    }
    catch {
      status.value = 'failed'
    }
  }

  if (options.immediate)
    execute()

  return {
    status,
    statusIs,
    execute,
  }
}
