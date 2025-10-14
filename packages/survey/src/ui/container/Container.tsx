import type { ContainerProps } from './types'

const Container = ({ ...rest }: ContainerProps) => {
  return <div {...rest} />
}

export { Container }
