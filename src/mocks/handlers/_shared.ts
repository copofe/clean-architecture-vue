import { type DefaultBodyType, HttpResponse, type StrictResponse } from 'msw'
import type { ApiResponse } from '::/entities/app'
import { ApiResponseCode } from '::/entities/app'

export function stdResponse<T extends DefaultBodyType>(data: T): StrictResponse<ApiResponse<T>['data']> {
  return HttpResponse.json({
    code: ApiResponseCode.Succeeded,
    data,
    msg: '',
  })
}
