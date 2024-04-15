import type { ZodObject } from 'zod'

export function logger(target: any, key: string, descriptor: PropertyDescriptor) {
  const className = target.constructor.name
  const oldValue = descriptor?.value
  return {
    ...descriptor,
    value(...args: any[]) {
      // eslint-disable-next-line no-console
      console.log(`${className}.${key} called`)
      return oldValue.apply(this, args)
    },
  }
}

export function validate(schema: ZodObject<any>) {
  return function (target: object, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor?.value
    return {
      ...descriptor,
      value(...args: any[]) {
        schema.parse(args[0])
        return oldValue.apply(this, args)
      },
    }
  }
}
