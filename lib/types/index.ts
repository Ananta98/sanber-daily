type User = {
  name: string
  email: string
  dob: Date | null
  phone: string | null
  hobby: string | null
}

type Posts = {
  id: number
  description: string
  user_id: number
  deleted_at: Date | null
  created_at: Date
  updated_at: Date
  likes_count: number
  replies_count: number
  is_like_post: boolean
  is_own_post: boolean
  user: User
  handleLike: (id: number) => Promise<void>
  handleDislike: (id: number) => Promise<void>
}

type Replies = {
  id: number
  description: string
  posts_id: number
  users_id: number
  deleted_at: Date | null
  created_at: Date
  updated_at: Date
  is_own_reply: boolean
  user: User
}

export type { Posts, User, Replies }
