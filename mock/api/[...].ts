// catch all undefined route
export default defineEventHandler(async (event) => {
  const res = await fetchWithEvent(event, import.meta.env.VITE_API_BASE_URL)
  return await res.json()
})
