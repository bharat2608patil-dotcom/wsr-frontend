export const unwrap = (response) => response?.data?.data

export const messageOf = (response, fallback = 'Request completed') =>
  response?.data?.message || fallback

export const pageOf = (response) => {
  const page = unwrap(response)
  return {
    content: page?.content ?? [],
    totalElements: page?.totalElements ?? 0,
    totalPages: page?.totalPages ?? 0,
    number: page?.number ?? 0,
    size: page?.size ?? 10,
    first: page?.first ?? true,
    last: page?.last ?? true,
  }
}

export const isSuccessful = (response) => response?.data?.success === true