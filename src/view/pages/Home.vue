<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Languages, Moon, Sun } from 'lucide-vue-next'
import { useStore } from '../store'

const { t } = useI18n()
const store = useStore()
const router = useRouter()

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <Page class="flex flex-col items-center px-6 py-12 lg:px-8 gap-8">
    <img src="/logo.svg" class="w-1/4 sm:w-32 self-center">
    <p class="italic text-muted-foreground">
      A front-end template that considers itself excellent.
    </p>
    <div class="flex gap-2">
      <Button variant="secondary" @click="router.push({ name: 'SignIn' })">
        {{ t('user.sign-in') }}
      </Button>
      <Button variant="secondary" disabled>
        {{ t('user.sign-up') }}
      </Button>
    </div>
    <div class="flex gap-2">
      <Button size="icon" variant="link">
        <Sun
          v-if="!isDark"
          class="text-muted-foreground"
          @click="toggleDark()"
        />
        <Moon
          v-else
          class="text-muted-foreground"
          @click="toggleDark()"
        />
      </Button>
      <Button
        size="icon"
        variant="link"
        @click="store.language = store.language === 'en-US' ? 'zh-CN' : 'en-US'"
      >
        <Languages class="text-muted-foreground" />
      </Button>
    </div>
  </Page>
</template>
