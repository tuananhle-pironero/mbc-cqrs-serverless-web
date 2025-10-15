import { type ReactNode, useEffect, useState } from 'react'
import { Spinner } from './Spinner'

type LoadingOverlayProps = {
  loading: boolean
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  delay?: number
}

export function LoadingOverlay({
  loading,
  children,
  size = 'md',
  delay = 500,
}: LoadingOverlayProps) {
  const [show, setShow] = useState(loading)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (loading) {
      setShow(true)
    } else {
      timeout = setTimeout(() => setShow(false), delay)
    }
    return () => clearTimeout(timeout)
  }, [loading, delay])

  return (
    <div className="relative">
      {show && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center bg-white/70 transition-opacity duration-300 dark:bg-black/50 ${
            loading ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <Spinner size={size} />
        </div>
      )}
      <div className={loading ? 'pointer-events-none opacity-50' : ''}>
        {children}
      </div>
    </div>
  )
}
