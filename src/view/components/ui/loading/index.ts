import { type VariantProps, cva } from 'class-variance-authority'

export { default as Loading } from './Loading.vue'

export const loadingVariants = cva(
  'animate-spin',
  {
    variants: {
      size: {
        default: 'h-4 w-4 mr-2',
        sm: 'h-3 w-3 mr-1.5',
        lg: 'h-5 w-5 mr-4',
        icon: 'h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

export type LoadingVariants = VariantProps<typeof loadingVariants>
