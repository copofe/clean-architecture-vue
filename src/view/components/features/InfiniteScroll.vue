<script setup lang="ts" generic="T extends Record<string, any>">
interface InfiniteScrollProps {
  /**
   * The Element or Document whose bounds are used as the bounding box when testing for intersection.
   * If no root value was passed or its value is null, the top-level document's viewport is used
   */
  root?: HTMLElement
  /**
   * Function to fetch data for the infinite scroll
   */
  dataSource: (params: {
    page: number
    limit: number
    [key: string]: any
  }) => (T[] | Promise<T[]>)
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
   * Call dataSource function when the distance between the scrollbar and the bottom is less than distance in pixels
   * @default 0
   */
  distance?: number
}

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
  root: undefined,
  params: () => ({}),
  limit: 10,
  numColumns: 1,
  itemGap: 0,
  containerClass: '',
  distance: 0,
})

const targetRef = ref<HTMLDivElement>()
const intersectionObserver = ref<IntersectionObserver>()
function init() {
  intersectionObserver.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting)
      fetchData()
  }, {
    root: props.root,
    threshold: 0,
    rootMargin: `0px 0px ${props.distance}px 0px`,
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
  data.value = currentPage === 1 ? res : data.value.concat(res)
  loading.value = false
  page.value = currentPage
  finished.value = res.length !== limit
  nextTick(observer)
}
function onError() {
  loading.value = false
  error.value = true
}
async function fetchData() {
  if (loading.value || finished.value)
    return

  const _page = page.value + 1

  loading.value = true
  unObserver()

  const { dataSource, params, limit } = props

  try {
    const res = await dataSource({ ...params, page: _page, limit })
    onSuccess(res, _page, limit)
  }
  catch (error) {
    onError()
  }
}

async function refresh() {
  page.value = 0
  finished.value = false
  error.value = false
  await fetchData()
}

onMounted(() => {
  init()
  observer()
})
onActivated(observer)
onDeactivated(unObserver)
onBeforeUnmount(unObserver)
</script>

<template>
  <RefreshControl :refresh="refresh">
    <slot name="header" />
    <div
      :class="`${props.containerClass} grid overflow-x-hidden scroll-smooth scrollbar-none relative`"
      :style="{
        gridTemplateColumns: `repeat(${props.numColumns}, minmax(0, 1fr))`,
        gap: `${props.itemGap}px`,
      }"
    >
      <div
        v-for="(item, index) in data"
        :key="props.itemKey ? item[props.itemKey] : index"
        :style="{ transitionDelay: `${index % limit * 0.03}s` }"
      >
        <slot
          name="renderItem"
          :item="item"
          :index="index"
        />
      </div>
      <div
        ref="targetRef"
        class="w-full pointer-events-none"
      />
    </div>
    <div v-if="data.length === 0 && finished" class="py-2 flex justify-center text-muted-foreground">
      No Data
    </div>
    <slot name="footer" />
    <div v-if="loading" class="py-2 flex justify-center">
      <Loading class="h-full w-4 text-muted-foreground" />
    </div>
  </RefreshControl>
</template>
