<script setup lang="ts">
import { userAuthUsecase } from '::/usecases/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: userAuthUsecase.schema,
})

const onSubmit = handleSubmit(async (values) => {
  await userAuthUsecase.login(values)
  const { redirect } = route.query
  router.replace(redirect ? decodeURIComponent(redirect as string) : { name: 'Home' })
  toast.success(t('Success.signed-in'))
})
</script>

<template>
  <div class="flex flex-col px-6 py-12 lg:px-8">
    <img src="/logo.svg" class="w-1/4 sm:w-32 self-center">
    <form class="my-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel class="capitalize">
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
          <FormLabel class="capitalize">
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
        size="lg"
        class="capitalize mt-4"
        :loading="isSubmitting"
      >
        {{ t('User.sign-in') }}
      </Button>
    </form>
  </div>
</template>
