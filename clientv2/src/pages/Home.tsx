import { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'
import Post from '../types/post'
import classNames from '../utils/classNames'
import TagChoice from '../components/TagChoice'
import convertDateTime from '../utils/convertDateTime'

export default function Home() {
  const [tag, setTag] = useState('All')
  const [posts, setPosts] = useState<Post[]>([])

  /**
   * It fetches all the posts from the backend, and if the response is not 401, it sets the posts to the
   * posts that were fetched
   */
  const fetchPosts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/allpost${
        tag !== 'All' ? `?tag=${tag}` : ''
      }`,
      {
        credentials: 'include',
      }
    )

    if (response.status == 401) {
      setPosts([])
    } else {
      const posts = await response.json()
      setPosts(posts || [])
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [tag])

  return (
    <PageLayout>
      <div className="max-w-7xl p-2 sm:mx-auto sm:w-full sm:p-6 lg:p-8">
        <div className="rounded-lg border border-gray-200 bg-white px-6 pt-16 pb-20 shadow lg:px-8 lg:pb-28">
          <div className="relative mx-auto w-full divide-y-2 divide-gray-200 lg:max-w-7xl">
            <div className="block items-center justify-between sm:flex">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                All posts in CVForum
              </h2>
              <div className="mt-4">
                <TagChoice query={tag} setQuery={setTag} />
              </div>
            </div>

            <div className="mt-6 grid gap-8 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
              {posts.reverse().map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 lg:p-6"
                >
                  <div>
                    <a href={`/singlepost/${post.id}`} className="inline-block">
                      <span
                        className={classNames(
                          'bg-indigo-100 text-indigo-800',
                          'inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium'
                        )}
                      >
                        {post.Tag}
                      </span>
                    </a>
                    <a href={`/singlepost/${post.id}`} className="mt-4 block">
                      <p className="text-xl font-semibold text-gray-900">
                        {post.Title}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {post.Desc.substring(0, 200)}
                      </p>
                    </a>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">{post.user.Username}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {post.user.Username}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        {convertDateTime(post.Date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
