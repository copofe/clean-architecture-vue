<script setup lang="ts">
import { useDark } from '@vueuse/core'

useDark()
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Entry']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
