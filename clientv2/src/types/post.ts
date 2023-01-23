import User from './user'

export default interface Post {
  id: string
  Title: string
  Desc: string
  Tag: string
  user: User
  Date: number
}
