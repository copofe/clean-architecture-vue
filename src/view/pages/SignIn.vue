<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { loginSchema, userAuthUsecase } from '::/usecases/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useStore()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = handleSubmit(async (values) => {
  const data = await userAuthUsecase.login(values)
  store.user = data.user
  const { redirect } = route.query
  router.replace(redirect ? decodeURIComponent(redirect as string) : { name: 'Home' })
  toast.success('login successfully')
})

const { isLoading, run: login } = useAsyncFunc(onSubmit)
</script>

<template>
  <div class="flex flex-col px-6 py-12 lg:px-8">
    <img src="/logo.svg" class="w-1/4 sm:w-32 self-center">
    <form class="my-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4" @submit="login">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="mb-1 capitalize">
            {{ t('User.username') }}
          </FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel class="mb-1 capitalize">
            {{ t('User.password') }}
          </FormLabel>
          <FormControl>
            <Input type="password" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button
        type="submit"
        class="capitalize"
        :loading="isLoading"
      >
        {{ t('User.sign-in') }}
      </Button>
    </form>
  </div>
</template>
