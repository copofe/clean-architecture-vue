<script setup lang="ts">
import { userAuthUsecase } from '::/usecases/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useStore()

const formData = reactive<Parameters<typeof userAuthUsecase['login']>[0]>({
  username: '',
  password: '',
})

const { isLoading, run: login } = useAsyncFunc(
  () => userAuthUsecase.login(formData),
  {
    onSuccess: (data) => {
      store.user = data.user
      const { redirect } = route.query
      router.replace(redirect ? decodeURIComponent(redirect as string) : { name: 'Home' })
      toast.success('login successfully')
    },
  },
)
</script>

<template>
  <div class="flex flex-col px-6 py-12 lg:px-8">
    <img src="/logo.svg" class="w-1/4 sm:w-32 self-center">
    <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
      <div>
        <Label for="username" class="mb-1 capitalize">{{ t('User.username') }}</Label>
        <Input id="username" v-model="formData.username" />
      </div>

      <div>
        <Label for="password" class="mb-1 capitalize">{{ t('User.password') }}</Label>
        <Input
          id="password"
          v-model="formData.password"
          type="password"
        />
      </div>

      <Button
        class="capitalize"
        :loading="isLoading"
        @click.stop="login"
      >
        {{ t('User.sign-in') }}
      </Button>
    </div>
  </div>
</template>
