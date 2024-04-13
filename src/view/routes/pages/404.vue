<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <h2 class="text-xl mb-4 capitalize">
      {{ t('Error.page-not-found') }}
    </h2>
    <Button class="capitalize" @click="router.go(-1)">
      {{ t('Base.back') }}
    </Button>
  </div>
</template>
