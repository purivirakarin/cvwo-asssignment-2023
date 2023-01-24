import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import useUser from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

const MENU = [
  { name: 'My post', url: '/uniquepost' },
  { name: 'Create new post', url: '/createpost' },
]

export default function Navbar() {
  const navigate = useNavigate()

  const { user, refetch } = useUser()

  /**
   * It sends a POST request (Log Out request) to the backend, and if the response is successful, it refreshes the page
   * and navigates to the homepage
   */
  const logOut = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    )

    if (response.status == 200) {
      refetch()
      navigate('/')
    }
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/" className="text-2xl font-bold text-indigo-500">
                    CVForum
                  </a>
                </div>
                {user && (
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {MENU.map(({ name, url }) => (
                      <a
                        key={name}
                        href={url}
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 hidden items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:flex sm:pr-0">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <p className="text-lg font-semibold text-indigo-700">
                      {user.Username}
                    </p>
                    <a
                      href="#"
                      type="button"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={logOut}
                    >
                      Log Out
                    </a>
                  </div>
                ) : (
                  <a
                    href="/login"
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Log In
                  </a>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {user && (
              <div className="space-y-1 py-2 pb-4">
                {MENU.map(({ name, url }) => (
                  <Disclosure.Button
                    key={name}
                    as="a"
                    href={url}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  >
                    {name}
                  </Disclosure.Button>
                ))}
              </div>
            )}
            <div className="border-t border-gray-200 pb-4">
              {user ? (
                <div className="space-y-3">
                  <p className="py-2 px-4 text-lg font-medium text-indigo-700">
                    {user.Username}
                  </p>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    onClick={logOut}
                  >
                    Log Out
                  </Disclosure.Button>
                </div>
              ) : (
                <Disclosure.Button
                  as="a"
                  href="/login"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Log In
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
