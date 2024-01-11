import type { IApiResponse, IRespository } from '::/entities/app'
import { eventer, request, session, storage } from '::/lib'

export class Repository implements IRespository {
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
export function extractData<T>(data: IApiResponse<T>): IApiResponse<T>['data'] {
  return data.data
}
