import React, { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

export default function Register() {
  const navigate = useNavigate()

  const { user } = useUser()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const register = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      }
    )

    if (response.status === 400 || response.status === 404) {
      const { message } = await response.json()
      setErrorMsg(message)
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user])

  return (
    <PageLayout>
      <div className="max-w-7xl px-2 sm:mx-auto sm:w-full sm:px-6 lg:px-8">
        <div className="py-24">
          <div className="mx-auto border border-gray-200 bg-white shadow sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
            <div className="px-6 py-8 sm:px-10">
              <div className="text-base font-bold text-gray-900">Register</div>

              <div className="mt-6">
                <form className="space-y-6" onSubmit={register}>
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      placeholder="Username"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>

                  {errorMsg !== '' && (
                    <div>
                      <p className="text-base font-normal text-red-900">
                        {errorMsg}
                      </p>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="border-t-2 border-gray-200 bg-gray-50 px-6 py-6 sm:px-10">
              <p className="text-xs leading-5 text-gray-500">
                Already have an account? Log in{' '}
                <a
                  href="/login"
                  className="font-medium text-gray-900 hover:underline"
                >
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
