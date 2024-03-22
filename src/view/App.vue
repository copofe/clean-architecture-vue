<script setup lang="ts">
import { useDark } from '@vueuse/core'

useDark()
useThemeColor()
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Entry']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <Sonner
    :toast-options="{
      style: {
        '--normal-bg': 'hsl(var(--card))',
        '--normal-border': 'hsl(var(--border))',
        '--normal-text': 'hsl(var(--card-foreground))',
        // '--success-bg': 'hsl(143, 85%, 96%)',
        // '--success-border': 'hsl(145, 92%, 91%)',
        // '--success-text': 'hsl(140, 100%, 27%)',
        // '--info-bg': 'hsl(208, 100%, 97%)',
        // '--info-border': 'hsl(221, 91%, 91%)',
        // '--info-text': 'hsl(210, 92%, 45%)',
        // '--warning-bg': 'hsl(49, 100%, 97%)',
        // '--warning-border': 'hsl(49, 91%, 91%)',
        // '--warning-text': 'hsl(31, 92%, 45%)',
        '--error-bg': 'hsl(var(--destructive))',
        '--error-border': 'hsl(var(--destructive))',
        '--error-text': 'hsl(var(--destructive-text))',
      },
    }"
    position="top-right"
    :duration="2000"
  />
</template>
