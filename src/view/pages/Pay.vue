<script setup lang="ts">
function inputValidate(val: string): string {
  if (val === '.' || val === '0.')
    return '0.'

  if (!Number.isNaN(Number(val))) {
    const dotIndex = val.indexOf('.')

    if (dotIndex !== -1) {
      const decimalLength = val.substring(dotIndex + 1).length
      return decimalLength > 2 ? val.substring(0, dotIndex + 3) : val
    }

    return val
  }

  return val
}

const moneyKeyboard = {
  input(value: string, amount: string): string {
    if (amount.includes('.') && value === '.')
      return amount

    if (/^0+$/.test(amount) && value === '.')
      return '0.'

    const val = amount + value

    return inputValidate(val)
  },

  backspace(amount: string): string {
    return amount.slice(0, -1)
  },
}

const amount = ref<string>('')
function handleInput(e: MouseEvent) {
  const target = e.target as HTMLSpanElement
  if (target.tagName !== 'SPAN')
    return

  if (target.textContent?.toLowerCase() === 'del')
    amount.value = moneyKeyboard.backspace(amount.value)

  else if (target.textContent?.toLowerCase() === 'pay')
    toast.info(`paying...${amount.value}`)

  else amount.value = moneyKeyboard.input(target.textContent ?? '', amount.value)
}
</script>

<template>
  <div class="select-none">
    <div class="p-2">
      <Input
        class="text-5xl h-20 leading-none text-right bg-background pointer-events-none rounded-none"
        placeholder="0.00"
        readonly
        :value="amount"
      />
    </div>
    <div
      class="fixed bottom-0 right-0 left-0 text-xl grid grid-rows-3 grid-cols-4 gap-px cursor-pointer [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>span]:bg-secondary active:[&>span]:bg-background [&>span]:p-6"
      @click="handleInput"
    >
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>DEL</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span style="grid-row: span 3 / span 3">PAY</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span style="grid-column: span 2 / span 2">0</span>
      <span>.</span>
    </div>
  </div>
</template>
