import { useEffect, useState } from 'react'
import type User from '../types/user'

export default function useUser() {
  const [shouldFetch, setShouldFetch] = useState(true)
  const [state, setState] = useState<User | null | undefined>()

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/user`,
      {
        credentials: 'include',
      }
    )

    if (response.status == 401) {
      setState(null)
    } else {
      const { user } = await response.json()
      setState(user)
    }

    setShouldFetch(false)
  }

  useEffect(() => {
    if (shouldFetch) {
      fetchUser()
    }
  }, [shouldFetch])

  return { user: state, refetch: () => setShouldFetch(true) }
}
