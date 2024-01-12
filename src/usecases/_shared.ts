export abstract class ImplUseCase {
  abstract execute: (params?: any) => Promise<any>
}
