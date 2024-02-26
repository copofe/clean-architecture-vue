<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <Page class="flex flex-col justify-center items-center">
    <h2 class="text-xl mb-4 capitalize">
      {{ t('page-not-found') }}
    </h2>
    <Button class="capitalize" @click="router.go(-1)">
      {{ t('back') }}
    </Button>
  </Page>
</template>
