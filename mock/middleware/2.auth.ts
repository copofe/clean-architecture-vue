const publicRoutes = [
  '/auth',
  '/app',
]

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname.replace('/api', '')
  if (!publicRoutes.some(r => path.startsWith(r))) {
    const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
    if (!token) {
      setResponseStatus(event, 401)
      return {
        code: 10401,
      }
    }
  }
})
