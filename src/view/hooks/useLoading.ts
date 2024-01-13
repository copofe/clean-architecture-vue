export function useLoading<T extends (...args: any[]) => Promise<any>>(asyncFn: T) {
  const loading = ref(false)

  async function execute(...args: Parameters<T>) {
    loading.value = true
    return asyncFn(...args).finally(() => {
      loading.value = false
    })
  }

  return {
    loading,
    execute,
  }
}
