<script setup lang="ts">
import { StandardError } from '::/entities/app.model'

function triggerError() {
  throw new StandardError('you can catch me!')
}
</script>

<template>
  <ErrorBoundary @restore="() => console.log('restore')">
    <Button @click="triggerError">
      triggerError
    </Button>
  </ErrorBoundary>
</template>
