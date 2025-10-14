import type { CreateAxiosDefaults } from 'axios'

const defaultConfig: CreateAxiosDefaults<any> = {
  // Use the server-side variable if available, otherwise fall back.
  baseURL:
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:8000',
  timeout: 30 * 1000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-code': process.env.NEXT_PUBLIC_TENANT_CODE || 'common',
  },
}

const xTenantCode = process.env.NEXT_PUBLIC_TENANT_CODE || 'common'

export { defaultConfig, xTenantCode }
