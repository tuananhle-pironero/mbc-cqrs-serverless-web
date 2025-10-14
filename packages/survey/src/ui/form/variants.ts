import { cva } from 'class-variance-authority'

const formMessageVariants = cva('text-error-400 text-sm', {
  variants: {},
  defaultVariants: {},
})

const formItemVariants = cva('', {
  variants: {},
  defaultVariants: {},
})

export { formMessageVariants, formItemVariants }
