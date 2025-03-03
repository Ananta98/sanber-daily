import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { Posts } from '@/lib/types'
import { Avatar, AvatarFallback } from './ui/avatar'
import Link from 'next/link'
import { Button } from './ui/button'
import { format } from 'date-fns'
import { MessageCircle, ThumbsUp } from 'lucide-react'

const PostContainer = ({
  id,
  description,
  user_id,
  deleted_at,
  created_at,
  likes_count,
  replies_count,
  is_like_post,
  is_own_post,
  user,
}: Posts) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${user.id}`}
              className="font-semibold hover:underline"
            >
              {user.name}
            </Link>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">
              {created_at && format(created_at, 'PPpp')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-500 flex items-center gap-1 hover:cursor-pointer"
          >
            <ThumbsUp />
            <span>{likes_count}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-green-500 flex items-center gap-1 hover:cursor-pointer"
          >
            <MessageCircle />
            <span>{replies_count}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostContainer
