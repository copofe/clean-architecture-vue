export default defineEventHandler(async (event) => {
  const mock = event.headers.get('x-mock')
  if (mock === 'false') {
    const res = await fetchWithEvent(event, import.meta.env.VITE_API_BASE_URL)
    if (res.status === 200) {
      return await res.text()
    }
    else {
      throw createError({
        statusCode: res.status,
        statusMessage: res.statusText,
      })
    }
  }
})
