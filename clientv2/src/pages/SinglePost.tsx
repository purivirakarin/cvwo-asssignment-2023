import { useEffect, useState } from 'react'
import Post from '../types/post'
import { useParams } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import CommentBox from '../components/CommentBox'
import convertDateTime from '../utils/convertDateTime'
import CommentCard from '../components/CommentCard'
import Comment from '../types/comment'
import useUser from '../hooks/useUser'

export default function SinglePost() {
  const { id } = useParams()
  const { user } = useUser()
  const [shouldFetch, setShouldFetch] = useState(true)
  const [post, setPost] = useState<Post>()
  const [comments, setComments] = useState<Comment[]>([])

  const fetchPost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/allpost/${id}`,
      {
        credentials: 'include',
      }
    )

    if (response.status != 401) {
      const post = await response.json()
      setPost(post)
    }
  }

  const fetchComments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/comment/${id}`,
      {
        credentials: 'include',
      }
    )

    const comments = await response.json()
    setComments(comments)
  }

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([fetchPost(), fetchComments()])
      setShouldFetch(false)
    }

    if (shouldFetch) {
      fetchAll()
    }
  }, [shouldFetch])

  return (
    <PageLayout>
      <div className="max-w-7xl p-2 sm:mx-auto sm:w-full sm:p-6 lg:p-8">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white py-16 px-6 shadow lg:px-8 xl:py-24">
          <div>
            {post && (
              <>
                {' '}
                <div className="relative z-10 mb-8 md:mb-2 md:px-6">
                  <div className="flex items-center justify-between">
                    <div className="max-w-prose text-base lg:max-w-none">
                      <h2 className="font-semibold leading-6 text-indigo-600">
                        {post.Tag}
                      </h2>
                      <p className="font-normal text-gray-500">
                        Posted by{' '}
                        <span className="text-gray-900">
                          {post.user.Username}
                        </span>{' '}
                        on {convertDateTime(post.Date)}
                      </p>
                      <p className="mt-2 py-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                        {post.Title}
                      </p>
                    </div>
                    {id === user?.id.toString() && (
                      <a
                        type="button"
                        href={`/editpost/${post.id}`}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Edit Post
                      </a>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div className="relative md:bg-white md:p-6">
                    <div className="tˇext-gray-500 prose prose-lg prose-indigo lg:max-w-none">
                      <p>{post.Desc}</p>
                    </div>
                  </div>
                </div>{' '}
                {user && (
                  <div className="py-10 md:mx-6">
                    <CommentBox
                      forumId={Number(id || '0')}
                      refetch={() => setShouldFetch(true)}
                    />
                  </div>
                )}
                <div className="md:mx-6">
                  <div className="space-y-4">
                    {comments.reverse().map((comment: Comment) => (
                      <CommentCard
                        key={comment.id}
                        comment={comment}
                        refetch={() => setShouldFetch(true)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
