import { useEffect, useState } from 'react'
import type User from '../types/user'

export default function useUser() {
  const [state, setState] = useState<User | undefined>()

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setState(JSON.parse(data))
    }
  }, [])

  return state
}
