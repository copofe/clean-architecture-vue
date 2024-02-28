<script setup lang="ts">
import { ArrowRightIcon, CreditCardIcon, LogInIcon, SignpostIcon } from 'lucide-vue-next'

const router = useRouter()
const components = [
  {
    label: '404',
    route: 'NotFound',
    icon: SignpostIcon,
  },
  {
    label: 'sign in',
    route: 'SignIn',
    icon: LogInIcon,
  },
  {
    label: 'pay',
    route: 'Pay',
    icon: CreditCardIcon,
  },
]
</script>

<template>
  <div>
    <div
      v-for="component in components"
      :key="component.route"
      class="flex justify-between p-4 border-b"
      @click="router.push({ name: component.route })"
    >
      <div class="flex items-center gap-2">
        <component :is="component.icon" class="w-5 h-5" />
        <span>{{ component.label }}</span>
      </div>
      <ArrowRightIcon class="w-5 h-5" />
    </div>
  </div>
</template>
