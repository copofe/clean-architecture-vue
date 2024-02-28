<script setup lang="ts">
import { useColorMode, useDark } from '@vueuse/core'

useDark()
const mode = useColorMode()
const theme = computed(() => mode.value === 'auto' ? 'system' : mode.value)
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Entry']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Sonner
    :theme="theme"
    position="top-right"
    :duration="2000"
  />
</template>
