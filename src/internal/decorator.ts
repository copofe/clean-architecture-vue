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
