<script setup lang="ts">
import { loadLanguageAsync } from './plugins/i18n'
import { useStore } from './store'

const { t } = useI18n()
const route = useRoute()
const store = useStore()

watchEffect(() => {
  if (route.meta.title)
    document.title = t(route.meta.title)

  if (store.language)
    loadLanguageAsync(store.language)
})
</script>

<template>
  <router-view />
</template>
