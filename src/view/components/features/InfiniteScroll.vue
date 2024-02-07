<script setup lang="ts" generic="T extends Record<string, any>">
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  /**
   * The key of the item
   * @default index
   */
  itemKey?: string
  /**
   * The callback function when the end of the list is reached
   */
  onEndReached: (...args: any) => (T[] | Promise<T[]>)
  /**
   * The params
   * @default {}
   */
  params?: Record<string, any>
  /**
   * The limit of items to fetch at once
   * @default 10
   */
  limit?: number
  /**
   * The number of columns to display
   * @default 1
   */
  numColumns?: number
  /**
   * The gap between items in pixels
   * @default 0
   */
  itemGap?: number
  /**
   * The class of the container
   */
  containerClass?: string
}>()

const targetRef = ref<HTMLDivElement>()
const intersectionObserver = ref<IntersectionObserver>()
function init() {
  intersectionObserver.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting)
      fetchData()
  }, {
    root: null,
  })
}
function observer() {
  intersectionObserver.value!.observe(targetRef.value!)
}
function unObserver() {
  intersectionObserver.value!.unobserve(targetRef.value!)
}

const data: Ref<T[]> = ref([])
const loading = ref(false)
const page = ref(0)
const finished = ref(false)
const error = ref(false)

function onSuccess(res: T[], currentPage: number, limit: number) {
  data.value = data.value.concat(res)
  loading.value = false
  page.value = currentPage
  finished.value = res.length !== limit
  observer()
}
function onError() {
  loading.value = false
  error.value = true
}
function fetchData() {
  if (loading.value || finished.value || error.value)
    return

  const _page = page.value + 1

  loading.value = true
  unObserver()

  const { onEndReached, params = {}, limit = 10 } = props

  const res = onEndReached({ ...params, page: _page, limit })
  if (res instanceof Promise) {
    res.then((result) => {
      onSuccess(result, _page, limit)
    }).catch(onError)
  }
  else {
    try {
      onSuccess(res, _page, limit)
    }
    catch (error) {
      onError()
    }
  }
}

onMounted(() => {
  init()
  observer()
})
onActivated(() => {
  observer()
})
onDeactivated(() => {
  unObserver()
})
onUnmounted(() => {
  unObserver()
})
</script>

<template>
  <div>
    <slot name="header" />
    <div :class="`${props.containerClass || ''} grid overflow-x-hidden`" :style="{ gridTemplateColumns: `repeat(${props.numColumns || 1}, minmax(0, 1fr))`, gap: `${props.itemGap || 0}px` }">
      <div v-for="(item, index) in data" :key="props.itemKey ? item[props.itemKey] : index">
        <slot
          name="renderItem"
          :item="item"
          :index="index"
        />
      </div>
    </div>
    <slot name="footer" />
    <div class="py-2 flex justify-center">
      <Loader2 v-if="loading" class="h-full animate-spin w-4 text-muted-foreground" />
    </div>
    <div ref="targetRef" class="w-full h-px pointer-events-none" />
  </div>
</template>
