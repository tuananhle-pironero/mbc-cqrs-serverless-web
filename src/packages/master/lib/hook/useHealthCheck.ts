import { useEffect } from 'react'
import { useHttpClient } from '../../provider'
import { API_URLS } from '../constants/url'

const useHealthCheck = () => {
  const httpClient = useHttpClient()

  useEffect(() => {
    const shouldRunHealthCheck =
      process.env.NEXT_PUBLIC_ENABLE_HEALTH_CHECK === 'true'

    if (!shouldRunHealthCheck) {
      return
    }

    const triggerHealth = async () => {
      try {
        await httpClient.get(API_URLS.HEALTH)
      } catch (error) {
        console.error('Health check failed:', error)
      }
    }

    triggerHealth()
  }, [])
}

export default useHealthCheck
