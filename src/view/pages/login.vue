<script setup lang="ts">
import { useAsyncFunc } from '../hooks/useAsyncFunc'
import { useStore } from '../store'
import { UserAuthUsecase } from '::/usecases/user'

const { t, availableLocales } = useI18n()
const store = useStore()

function changeLanguage(lang: string) {
  store.language = lang
}

const userAuthUsecase = new UserAuthUsecase()
const formData = reactive<Parameters<UserAuthUsecase['login']>[0]>({
  username: '',
  password: '',
})

const { statusIs, execute: login } = useAsyncFunc(() => userAuthUsecase.login(formData).then(({ user }) => {
  store.user = user
}))
</script>

<template>
  <div class="flex flex-col justify-center px-6 py-12 lg:px-8">
    <img src="/logo.svg" class="w-1/4 sm:w-32 self-center">

    <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
      <div>
        <Label for="username" class="mb-1">{{ t('user.username') }}</Label>
        <Input id="username" v-model="formData.username" />
      </div>

      <div>
        <Label for="password" class="mb-1">{{ t('user.password') }}</Label>
        <Input id="password" v-model="formData.password" />
      </div>

      <Button :loading="statusIs.executing" @click.stop="login">
        {{ t('user.sign-in') }}
      </Button>
    </div>

    <ul class="mt-8 self-center">
      <li
        v-for="locale in availableLocales"
        :key="locale"
        class="cursor-pointer"
        @click="changeLanguage(locale)"
      >
        {{ locale }}
      </li>
    </ul>
  </div>
</template>
