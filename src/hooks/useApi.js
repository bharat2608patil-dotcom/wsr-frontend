import { useCallback, useState } from 'react'
import { errorMessage } from '../utils/errorUtils'
import { messageOf, unwrap } from '../api/apiResponse'

export const useApi = () => {
  const [state, setState] = useState({ loading: false, error: '', success: '' })

  const run = useCallback(async (request, fallback = 'Request completed') => {
    setState({ loading: true, error: '', success: '' })
    try {
      const response = await request()
      setState({ loading: false, error: '', success: messageOf(response, fallback) })
      return { data: unwrap(response), response }
    } catch (error) {
      setState({ loading: false, error: errorMessage(error), success: '' })
      throw error
    }
  }, [])

  return { ...state, run, clear: () => setState({ loading: false, error: '', success: '' }) }
}