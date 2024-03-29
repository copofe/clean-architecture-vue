import { toTypedSchema } from '@vee-validate/zod'
import { useForm as veeUseForm } from 'vee-validate'

type Options = Parameters<typeof veeUseForm>[0]
type ValidationSchema = Parameters<typeof toTypedSchema>[0]
type validationSchemaOptions = Parameters<typeof toTypedSchema>[1]

export type UseFormOptions = Exclude<Options, 'validationSchema'> & {
  validationSchema?: validationSchemaOptions
}

export function useForm(schema?: ValidationSchema, opts?: UseFormOptions) {
  return veeUseForm({
    ...opts,
    validationSchema: schema ? toTypedSchema(schema, opts?.validationSchema) : undefined,
  })
}
