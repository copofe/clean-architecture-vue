<script setup lang="ts">
import type { Component } from 'vue'

export interface ErrorBoundaryProps {
  fallBack?: Component
  onError?: Function
}

const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  onError: () => {},
})

const hasError = ref(false)
const err = ref<Error | null>(null)
const message = ref('')

const slots = useSlots()

if (!slots.default)
  console.warn('ErrorBoundary component must have child components.')

onErrorCaptured((error: Error, vm, info: string) => {
  hasError.value = true
  err.value = error
  message.value = info

  props?.onError(error, vm, info)

  return false
})

function retry() {
  hasError.value = false
  err.value = null
  message.value = ''
}
</script>

<template>
  <slot v-if="!hasError" />
  <template v-else>
    <div v-if="!props.fallBack" class="h-full flex-1 flex flex-col items-center justify-center">
      <h3 class="mb-2">
        {{ message }}
      </h3>
      <Button @click="retry">
        Retry
      </Button>
    </div>
    <component
      :is="props.fallBack"
      v-else
      :err="err"
      :message="message"
      :retry="retry"
    />
  </template>
</template>
