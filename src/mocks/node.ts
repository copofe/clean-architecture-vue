import { setupServer } from 'msw/node'
import app from './handlers/app'
import user from './handlers/user'

export const server = setupServer(...[
  ...app,
  ...user,
])
