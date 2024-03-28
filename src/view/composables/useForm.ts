import { toTypedSchema } from '@vee-validate/zod'
import { useForm as veeUseForm } from 'vee-validate'

type Options = Parameters<typeof veeUseForm>[0]

type UseFormOptions = Options & {
  validationSchema: Parameters<typeof toTypedSchema>[0]
}

export function useForm(opts: UseFormOptions) {
  return veeUseForm({
    ...opts,
    validationSchema: toTypedSchema(opts?.validationSchema),
  })
}
