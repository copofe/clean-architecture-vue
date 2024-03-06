<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { useGesture } from '@vueuse/gesture'
import { RotateCwIcon } from 'lucide-vue-next'

const props = defineProps<{
  refresh: () => Promise<any>
}>()

function addOverscrollBehavior() {
  document.body.style.overscrollBehavior = 'contain'
}
function removeOverscrollBehavior() {
  document.body.style.overscrollBehavior = 'auto'
}

onMounted(addOverscrollBehavior)
onActivated(addOverscrollBehavior)
onDeactivated(removeOverscrollBehavior)
onBeforeUnmount(removeOverscrollBehavior)

const container = ref<HTMLElement>()
const target = ref<HTMLElement>()
const control = ref<HTMLElement>()
const icon = ref<HTMLElement>()

const isIntersected = ref(false)

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isIntersected.value = isIntersecting
})

const X = window.screen.availWidth / 2 - 16
const Y = 0
const defaultTransform = `translate3d(${X}px, ${Y}px, 0px) scale(0)`
const MaxDistance = 100
const duration = 500

let shouldPull = false
let direction = ''
let distance = 0
let refreshing = false

function reset() {
  control.value!.style.transform = defaultTransform
  setTimeout(() => {
    control.value!.style.transitionDuration = ''
    icon.value!.classList.remove('animate-spin-reverse')
    icon.value!.style.transform = ''
    refreshing = false
  }, duration)
  icon.value!.classList.remove('animate-spin')
  icon.value!.classList.add('animate-spin-reverse')
  shouldPull = false
  direction = ''
  distance = 0
}

useGesture(
  {
    onDrag: ({ movement: [_x, y], values, initial, previous, first, event }) => {
      if (refreshing)
        return
      if (isIntersected.value && first) {
        shouldPull = true
        return
      }

      if (shouldPull) {
        if (direction === '') {
          if (values[1] < initial[1])
            direction = 'up'
          else
            direction = 'down'

          if (event.cancelable)
            event.preventDefault()
          return
        }

        if (direction === 'down' && values[1] < previous[1]) {
          if (event.cancelable)
            event.preventDefault()
        }

        distance = y >= 0 ? Math.min(MaxDistance, y * 0.5) : 0
        const precent = distance / MaxDistance
        control.value!.style.transform = `translate3d(${X}px, ${distance}px, 0px) scale(${Math.min(1, precent * 3)})`
        icon.value!.style.opacity = `${precent}`
        icon.value!.style.transform = `rotate(${precent * 360}deg)`
      }
    },
    onDragEnd: () => {
      if (distance >= MaxDistance / 2) {
        refreshing = true
        icon.value!.style.transform = ''
        icon.value!.style.opacity = '1'
        icon.value!.classList.add('animate-spin')
        control.value!.style.transitionDuration = `${duration / 1000}s`
        control.value!.style.transform = `translate3d(${X}px, 20px, 0px) scale(1)`
        props.refresh().then(() => {
          nextTick(reset)
        })
      }
      else {
        control.value!.style.transitionDuration = `${duration / 1000}s`
        reset()
      }
    },
  },
  {
    domTarget: document.body,
    drag: {
      filterTaps: true,
    },
    eventOptions: {
      passive: false,
    },
  },
)
</script>

<template>
  <div ref="container">
    <div ref="target" />
    <div
      ref="control"
      class="absolute p-1 bg-background rounded-full shadow z-10 scale-0 pointer-events-none"
    >
      <RotateCwIcon ref="icon" />
    </div>
    <slot />
  </div>
</template>
