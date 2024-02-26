<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import type { PrimitiveProps } from 'radix-vue'
import { type LoadingVariants, loadingVariants } from '.'
import { cn } from '::/view/components/ui/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  size?: LoadingVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
})
</script>

<template>
  <Loader2 :class="cn(loadingVariants({ size }), props.class ?? '')" />
</template>
