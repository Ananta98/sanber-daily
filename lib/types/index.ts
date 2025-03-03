type User = {
  id: number
  name: string
  email: string
}

type Posts = {
  id: number
  description: string
  user_id: number
  deleted_at: Date | null
  created_at: Date | null
  updated_at: Date | null
  likes_count: number
  replies_count: number
  is_like_post: boolean
  is_own_post: boolean
  user: User
}

export type { Posts, User }
