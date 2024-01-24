<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Languages, Moon, Sun } from 'lucide-vue-next'
import NProgress from 'nprogress'
import { useStore } from '../store'
import { loadLanguageAsync } from '../plugins/i18n'

const { t } = useI18n()
const store = useStore()
const route = useRoute()

const isDark = useDark()
const toggleDark = useToggle(isDark)

function toggleLanguage() {
  const language = store.language === 'en-US' ? 'zh-CN' : 'en-US'
  NProgress.start()
  loadLanguageAsync(language).then(() => {
    store.language = language
    if (route.meta.title)
      document.title = t(route.meta.title)
    NProgress.done()
  })
}
</script>

<template>
  <Page class="flex flex-col items-center px-6 py-12 lg:px-8 gap-8">
    <img src="/logo.svg" class="w-1/4 sm:w-32 self-center">
    <p class="italic text-muted-foreground">
      A front-end template that considers itself excellent.
    </p>
    <div class="flex gap-2">
      <RouterLink :to="{ name: 'SignIn' }">
        <Button variant="secondary">
          {{ t('user.sign-in') }}
        </Button>
      </RouterLink>
      <Button variant="secondary" disabled>
        {{ t('user.sign-up') }}
      </Button>
    </div>
    <div class="flex gap-2">
      <Button
        size="icon"
        variant="link"
        @click="toggleDark()"
      >
        <Sun
          v-if="isDark"
          class="text-muted-foreground"
        />
        <Moon
          v-else
          class="text-muted-foreground"
        />
      </Button>
      <Button
        size="icon"
        variant="link"
        @click="toggleLanguage"
      >
        <Languages class="text-muted-foreground" />
      </Button>
    </div>
  </Page>
</template>
