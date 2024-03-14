export default defineEventHandler(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    data: '123abc',
  }
})
