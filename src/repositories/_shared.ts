import type { ApiResponse, Eventer, Request, Session, Storage } from '::/entities/app'
import { eventer, request, session, storage } from '::/lib'

export abstract class ImplRespository {
  abstract request: Request
  abstract storage: Storage
  abstract session: Session
  abstract eventer: Eventer
}

export class Repository implements ImplRespository {
  request = request
  storage = storage
  session = session
  eventer = eventer
  constructor() {}
}

/**
 * Extract the 'data' property from the given API response object.
 * @param data - The API response object.
 * @returns The 'data' property from the API response.
 */
export function extractData<T>(data: ApiResponse<T>): ApiResponse<T>['data']['data'] {
  return data.data.data
}
