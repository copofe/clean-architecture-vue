<script setup lang="ts">
const { t, locale } = useI18n()

const route = useRoute()
watch([() => route.meta.title, locale], ([title]) => {
  if (title)
    document.title = t(title as string)
})
</script>

<template>
  <router-view />
</template>
