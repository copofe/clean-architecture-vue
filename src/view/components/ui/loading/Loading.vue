<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { cn } from '::/view/components/ui/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <Loader2
    v-bind="props"
    :class="
      cn(
        'animate-spin',
        props.class,
      )
    "
  />
</template>
