import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { formItemVariants, formMessageVariants } from './variants'

type FormItemContextValue = {
  id: string
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormMessageProps = Readonly<
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof formMessageVariants>
>

type FormItemProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof formItemVariants>

export type {
  FormItemProps,
  FormMessageProps,
  FormItemContextValue,
  FormFieldContextValue,
}
