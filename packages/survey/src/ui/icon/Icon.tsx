import { cn } from '@/utils'
import type { FC } from 'react'
import * as icons from '#/svgs'
import { IconWrapper } from './IconWrapper'
import type { IconProps } from './types'
import { iconVariants } from './variants'

export const Icon = Object.fromEntries(
  Object.entries(icons).map(([name, Component]) => [
    name,
    ({ className, wrapperClassName, ...props }: IconProps) => (
      <IconWrapper className={wrapperClassName}>
        <Component className={cn(iconVariants({ className }))} {...props} />
      </IconWrapper>
    ),
  ])
) as Record<keyof typeof icons, FC<IconProps>>
