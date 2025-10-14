import { cva } from 'class-variance-authority'

const iconVariants = cva('h-auto', {
  variants: {},
  defaultVariants: {},
})

const iconWrapperVariants = cva('w-fit', {
  variants: {},
  defaultVariants: {},
})

export { iconVariants, iconWrapperVariants }
