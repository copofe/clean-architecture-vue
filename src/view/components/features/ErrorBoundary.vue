<script setup lang="ts">
import type { Component } from 'vue'
import { RequestError } from '::/implement'

export interface ErrorBoundaryProps {
  fallBack?: Component
  onError?: Function
}

const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  onError: () => {},
})
const captured = ref(false)
const err = ref<Error | null>(null)

const slots = useSlots()

if (!slots.default)
  console.warn('ErrorBoundary component must have child components.')

onErrorCaptured((error: Error, vm, info: string) => {
  if (!(error instanceof RequestError)) {
    captured.value = true
    err.value = error

    props?.onError(error, vm, info)
  }

  return false
})

function retry() {
  captured.value = false
  err.value = null
}

const route = useRoute()
watch(route, () => {
  if (captured.value)
    retry()
})
</script>

<template>
  <slot v-if="!captured" />
  <template v-else>
    <div v-if="!props.fallBack" class="h-full flex-1 flex flex-col items-center justify-center">
      <h3 class="mb-2">
        {{ err?.name }}: {{ err?.message }}
      </h3>
      <Button @click="retry">
        Retry
      </Button>
    </div>
    <component
      :is="props.fallBack"
      v-else
      :err="err"
      :retry="retry"
    />
  </template>
</template>
