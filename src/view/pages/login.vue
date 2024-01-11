<script setup lang="ts">
import { useStore } from '../store'
import { storage } from '::/lib'
import { UserLoginUsecase } from '::/usecases/user'

const store = useStore()
const userUsecase = new UserLoginUsecase(storage, store)
const formData = reactive<Parameters<UserLoginUsecase['execute']>[0]>({
  username: '',
  password: '',
})
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
        <Label for="username" class="mb-1">username</Label>
        <Input id="username" v-model="formData.username" />
      </div>

      <div>
        <Label for="password" class="mb-1">password</Label>
        <Input id="password" v-model="formData.password" />
      </div>

      <Button @click.stop="userUsecase.execute(formData)">
        Sign in
      </Button>
    </div>
  </div>
</template>
