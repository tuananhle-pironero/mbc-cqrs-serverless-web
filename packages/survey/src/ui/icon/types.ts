import type { VariantProps } from 'class-variance-authority'
import type { SVGProps } from 'react'
import type { ContainerProps } from '../container'
import type { iconVariants, iconWrapperVariants } from './variants'

type IconProps = Readonly<
  SVGProps<SVGSVGElement> &
    VariantProps<typeof iconVariants> & {
      wrapperClassName?: string
    }
>

type IconWrapperProps = Readonly<
  ContainerProps & VariantProps<typeof iconWrapperVariants>
>

export type { IconProps, IconWrapperProps }
