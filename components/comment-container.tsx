import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Replies } from '@/lib/types'
import { timeAgo } from '@/lib/utils'

const CommentContainer = ({
  id,
  description,
  is_own_reply,
  created_at,
  user,
}: Replies) => {
  const createdTime = created_at ? new Date(created_at).getTime() : 0
  return (
    <div key={id} className="flex gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
        />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{user.name}</span>
          <span className="text-sm text-gray-500">{user.email}</span>
          <span className="text-sm text-gray-500">
            · {timeAgo(createdTime)}
          </span>
        </div>
        <p className="mt-1">{description}</p>
      </div>
    </div>
  )
}

export default CommentContainer
