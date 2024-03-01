<script setup lang="ts">
const limit = ref(10)
const numColumns = ref(1)
const gap = ref(4)

async function getList({ limit }: { limit: number }) {
  await new Promise(resolve => setTimeout(resolve, 200))
  return [...Array(limit)].map(() => {
    return {
      v: Math.random().toPrecision(4),
    }
  })
}
</script>

<template>
  <div>
    <div class="flex gap-1 p-2 sticky top-0 z-10 bg-card shadow-md">
      <div>
        <Label>limit</Label>
        <Input
          v-model="limit"
          type="number"
          :min="10"
          :step="10"
        />
      </div>
      <div>
        <Label>numColumns</Label>
        <Input
          v-model="numColumns"
          type="number"
          :min="1"
        />
      </div>
      <div>
        <Label>gap</Label>
        <Input
          v-model="gap"
          type="number"
          :min="0"
        />
      </div>
    </div>
    <InfiniteScroll
      item-key="v"
      :data-source="getList"
      :num-columns="numColumns"
      :item-gap="gap"
      :limit="limit"
      :distance="160"
      container-class="px-2 pt-2"
    >
      <template #renderItem="{ item, index }">
        <div class="bg-card p-4 border">
          <p>index: {{ index }}</p>
          <p>value: {{ item.v }}</p>
        </div>
      </template>
    </InfiniteScroll>
  </div>
</template>
