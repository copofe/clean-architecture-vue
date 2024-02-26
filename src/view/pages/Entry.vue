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
    class="w-screen pb-12"
  >
    <TabsList class="flex h-12 p-0 bg-background fixed left-0 right-0 bottom-0 border-t">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="flex-1 flex flex-col items-center py-1 justify-center data-[state=active]:shadow-none"
        @click="router.push({ name: tab.value })"
      >
        <component :is="tab.icon" class="h-5 w-5" />
        <span class="text-xs">{{ t(tab.value.toLowerCase()).toUpperCase() }}</span>
      </TabsTrigger>
    </TabsList>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Tabs>
</template>
