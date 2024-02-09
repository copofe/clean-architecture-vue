<script setup lang="ts">
const limit = ref(10)
const numColumns = ref(1)
const gap = ref(0)

async function getList({ limit }: { limit: number }) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return [...Array(limit)].map(() => {
    return {
      v: Math.random().toPrecision(4),
    }
  })
}
</script>

<template>
  <Page class="px-4">
    <div>
      <Label>limit</Label><Input
        v-model="limit"
        type="number"
        :min="10"
        :step="10"
      />
    </div>
    <div>
      <Label>numColumns</Label><Input
        v-model="numColumns"
        type="number"
        :min="1"
      />
    </div>
    <div>
      <Label>gap</Label><Input
        v-model="gap"
        type="number"
        :min="0"
      />
    </div>
    <InfiniteScroll
      item-key="v"
      :data-source="getList"
      :num-columns="numColumns"
      :item-gap="gap"
      :limit="limit"
    >
      <template #renderItem="{ item }">
        <span>{{ item.v }}</span>
      </template>
    </InfiniteScroll>
  </Page>
</template>
