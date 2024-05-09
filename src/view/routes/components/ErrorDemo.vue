<script setup lang="ts">
import { StandardError } from '::/implement'

function triggerError() {
  throw new StandardError('you can catch me!')
}
</script>

<template>
  <Button @click="triggerError">
    triggerError
  </Button>
</template>
