import { useState } from 'react'

export const usePagination = (size = 10) => {
  const [page, setPage] = useState(0)
  const [pageSize] = useState(size)
  return { page, pageSize, setPage, reset: () => setPage(0) }
}