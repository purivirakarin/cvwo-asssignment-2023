import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import { TAGS } from '../constants/tags'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(TAGS[0])

  const postBlog = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/post`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title,
          desc: description,
          tag: category,
        }),
      }
    )

    if (response.status === 400 || response.status === 404) {
      const { message } = await response.json()
      setErrorMsg(message)
    } else {
      navigate('/uniquepost', { replace: true })
    }
  }

  return (
    <PageLayout>
      <div className="max-w-7xl p-2 sm:mx-auto sm:w-full sm:p-6 lg:p-8">
        <form
          className="space-y-8 divide-y divide-gray-200"
          onSubmit={postBlog}
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div className="space-y-6 sm:space-y-5">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Post a new blog
                </h3>
              </div>
              <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Title
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Description
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <textarea
                      id="desc"
                      name="desc"
                      rows={3}
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Write a few sentences about your post.
                    </p>
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Category
                  </label>
                  <div className="mt-1 sm:col-span-2 sm:mt-0">
                    <select
                      id="category"
                      name="category"
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                    >
                      {TAGS.map((tag) => (
                        <option key={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
