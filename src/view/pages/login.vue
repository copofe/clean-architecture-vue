<script setup lang="ts">
import { useAsyncFunc } from '../hooks/useAsyncFunc'
import { useStore } from '../store'
import { UserAuthUsecase } from '::/usecases/user'

const store = useStore()
const userAuthUsecase = new UserAuthUsecase(store)
const formData = reactive<Parameters<UserAuthUsecase['login']>[0]>({
  username: '',
  password: '',
})

const { statusIs, execute: login } = useAsyncFunc(() => userAuthUsecase.login(formData))
</script>

<template>
  <div class="flex flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
      <div>
        <Label for="username" class="mb-1">Username</Label>
        <Input id="username" v-model="formData.username" />
      </div>

      <div>
        <Label for="password" class="mb-1">Password</Label>
        <Input id="password" v-model="formData.password" />
      </div>

      <Button :loading="statusIs.pending" @click.stop="login">
        Sign in
      </Button>
    </div>
  </div>
</template>
