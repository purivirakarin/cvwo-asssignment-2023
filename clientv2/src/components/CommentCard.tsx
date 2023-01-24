import { useEffect, useState } from 'react'
import useUser from '../hooks/useUser'
import Comment from '../types/comment'
import convertDateTime from '../utils/convertDateTime'
import { useNavigate } from 'react-router-dom'

interface IProps {
  comment: Comment
  refetch: () => void
}

export default function CommentCard({ comment, refetch }: IProps) {
  const { user } = useUser()
  const [isEdit, setIsEdit] = useState(false)
  const [comment_n, setComment_n] = useState(comment.Desc)
  const [errorMsg, setErrorMsg] = useState('')

/**
 * We're using the fetch API to send a PUT request to the backend, which will update the comment in the
 * database
 */
  const postComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/updatecomment/${comment.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          desc: comment_n,
        }),
      }
    )

    refetch()
  }

/**
 * It makes a request to the backend to delete the comment, and then it refetches the comments
 */
  const deleteComment = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/deletecomment/${comment.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    refetch()
  }

  return (
    <div className="rounded-lg border border-gray-200 px-4 py-2 text-gray-500">
      {isEdit ? (
        <>
          <div className="flex flex-col items-center">
            <div className="mt-2 w-full max-w-md">
              <textarea
                rows={4}
                name="comment"
                id="comment"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setComment_n(e.target.value)}
                value={comment_n}
              />
            </div>
          </div>
          <div className="mt-2 flex justify-end space-x-3">
            <p className="text-normal py-3 font-normal text-gray-400">
              Commented by{' '}
              <span className="text-gray-900">{comment.user.Username}</span> at{' '}
              {convertDateTime(comment.Date)}
            </p>
            {comment.UserId === user?.id.toString() && (
              <div className="flex items-center space-x-3 ">
                <button
                  onClick={() => {
                    setComment_n(comment.Desc)
                    setIsEdit(false)
                  }}
                  type="button"
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={deleteComment}
                  className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    postComment()
                    setIsEdit(false)
                  }}
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <p className="prose py-4">{comment.Desc}</p>
          </div>
          <div className="flex justify-end space-x-3">
            <p className="text-normal py-3 font-normal text-gray-400">
              Commented by{' '}
              <span className="text-gray-900">{comment.user.Username}</span> at{' '}
              {convertDateTime(comment.Date)}
            </p>
            {comment.UserId === user?.id.toString() && (
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
