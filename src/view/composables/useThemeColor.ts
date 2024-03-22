import { useMutationObserver } from '@vueuse/core'

function changeThemeColor() {
  const background = getComputedStyle(document.body).getPropertyValue('--background')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', `hsl(${background})`)
}

export function useThemeColor() {
  useMutationObserver(document.documentElement, (mutations) => {
    if (mutations[0]) {
      if (mutations[0].attributeName === 'class')
        changeThemeColor()
    }
  }, {
    attributes: true,
  })
}
