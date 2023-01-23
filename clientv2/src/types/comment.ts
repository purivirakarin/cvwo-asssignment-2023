import User from './user'

export default interface Comment {
  id: string
  Desc: string
  Date: number
  UserId: string
  ForumId: String
  user: User
}
