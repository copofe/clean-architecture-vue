<script setup lang="ts">
import { ComponentIcon, HomeIcon, LayersIcon } from 'lucide-vue-next'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const tabs = [
  {
    value: 'Home',
    icon: HomeIcon,
  },
  {
    value: 'Components',
    icon: ComponentIcon,
  },
  {
    value: 'Pages',
    icon: LayersIcon,
  },
]
</script>

<template>
  <Tabs
    :model-value="(route.name as string)"
    activation-mode="manual"
    class="w-screen pb-14"
  >
    <TabsList class="flex h-14 p-0 bg-background fixed left-0 right-0 bottom-0 border-t rounded-none z-50">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="flex-1 flex flex-col gap-1 justify-center items-center py-1 data-[state=active]:shadow-none"
        @click="router.push({ name: tab.value })"
      >
        <component :is="tab.icon" class="h-6 w-6" />
        <span class="text-[11px] leading-none">{{ t(tab.value.toLowerCase()).toUpperCase() }}</span>
      </TabsTrigger>
    </TabsList>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Tabs>
</template>
