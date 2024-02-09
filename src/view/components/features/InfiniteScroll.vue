<script setup lang="ts" generic="T extends Record<string, any>">
interface InfiniteScrollProps {
  /**
   * The Element or Document whose bounds are used as the bounding box when testing for intersection.
   * If no root value was passed or its value is null, the top-level document's viewport is used
   */
  root?: HTMLElement | null
  /**
   * Function to fetch data for the infinite scroll
   */
  dataSource: (...args: any) => (T[] | Promise<T[]>)
  /**
   * Additional parameters for the data source function
   */
  params?: Record<string, any>
  /**
   * Maximum number of items to fetch at a time
   */
  limit?: number
  /**
   * Number of columns to display in the grid layout
   */
  numColumns?: number
  /**
   * Gap between items in the grid layout
   */
  itemGap?: number
  /**
   * Key to identify each item in the list
   */
  itemKey?: string
  /**
   * Additional CSS class for the list container
   */
  containerClass?: string
  /**
   * Call dataSource function when the distance between the scrollbar and the bottom is less than offset
   * @default 0
   */
  offset?: number
}

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
  root: null,
  params: () => ({}),
  limit: 10,
  numColumns: 1,
  itemGap: 0,
  containerClass: '',
  offset: 0,
})

const targetRef = ref<HTMLDivElement>()
const intersectionObserver = ref<IntersectionObserver>()
function init() {
  intersectionObserver.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting)
      fetchData()
  }, {
    root: props.root,
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

  const { dataSource, params, limit } = props

  const res = dataSource({ ...params, page: _page, limit })
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
    <div
      :class="`${props.containerClass} grid overflow-x-hidden`"
      :style="{
        gridTemplateColumns: `repeat(${props.numColumns}, minmax(0, 1fr))`,
        gap: `${props.itemGap}px`,
      }"
    >
      <div v-for="(item, index) in data" :key="props.itemKey ? item[props.itemKey] : index">
        <slot
          name="renderItem"
          :item="item"
          :index="index"
        />
      </div>
    </div>
    <div v-if="data.length === 0 && finished" class="py-2 flex justify-center text-muted-foreground">
      No Data
    </div>
    <slot name="footer" />
    <div class="py-2 flex justify-center">
      <Loading v-if="loading" class="h-full w-4 text-muted-foreground" />
    </div>
    <div
      ref="targetRef"
      class="w-full pointer-events-none"
      :style="{ height: `${props.offset}px` }"
    />
  </div>
</template>
