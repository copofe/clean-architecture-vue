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
      A front-end template designed for building web applications with Vue.js.
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
      <a href="https://github.com/copofe/frontend-clean-architecture" target="_blank">
        <Button size="icon" variant="link">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="24"
            fill="hsl(var(--muted-foreground))"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
        </Button>
      </a>
    </div>
  </Page>
</template>
