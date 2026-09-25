import { useCallback, useState } from 'react'
import { errorMessage } from '../utils/errorUtils'
import { messageOf, unwrap } from '../api/apiResponse'
import { useToast } from '../components/common/toastContext'

export const useApi = () => {
  const toast = useToast()
  const [state, setState] = useState({ loading: false, error: '', success: '' })

  const run = useCallback(async (request, fallback = 'Request completed') => {
    setState({ loading: true, error: '', success: '' })
    try {
      const response = await request()
      if (response?.data?.success === false) {
        const businessError = new Error(response.data.message || 'Request failed')
        businessError.response = { data: response.data, status: response.status }
        throw businessError
      }
      const message = messageOf(response, fallback)
      setState({ loading: false, error: '', success: message })
      if (response.config?.method !== 'get') toast?.show(message, 'success')
      return { data: unwrap(response), response }
    } catch (error) {
      const message = errorMessage(error)
      setState({ loading: false, error: message, success: '' })
      toast?.show(message, 'error')
      throw error
    }
  }, [toast])

  return { ...state, run, clear: () => setState({ loading: false, error: '', success: '' }) }
}