import React, { useState } from 'react'

interface IProps {
  forumId: number
  refetch: () => void
}

export default function CommentBox({ forumId, refetch }: IProps) {
  const [comment, setComment] = useState('')

  /**
   * It takes the form event, prevents the default action, then sends a POST request to the backend
   * with the comment and forumId (to post a comment)
   * @param e - React.FormEvent - this is the event that is triggered when the form is submitted.
   */
  const createComment = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/comment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          Desc: comment,
          ForumId: forumId.toString(),
        }),
      }
    )

    setComment('')
    refetch()
  }

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form onSubmit={createComment} className="relative">
          <div className="h-28 overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 py-3 focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
