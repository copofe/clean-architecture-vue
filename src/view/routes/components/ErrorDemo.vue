<script setup lang="ts">
import { StandardError } from '::/impl'

function triggerError() {
  throw new StandardError('you can catch me!')
}
</script>

<template>
  <Button @click="triggerError">
    triggerError
  </Button>
</template>
