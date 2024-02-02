import { createServer } from 'node:http'
import { afterAll, beforeAll } from 'vitest'
import handler from './.output/server/index.mjs'

const server = createServer(handler)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})
