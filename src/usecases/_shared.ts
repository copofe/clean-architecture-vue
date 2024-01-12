export abstract class ImplUsecase {
  abstract execute: (params?: any) => any | Promise<any>
}
