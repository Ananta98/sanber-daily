import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Link from 'next/link'

const PostComments = () => {
  return (
    <div>
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to home
      </Link>
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback>{'A'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{'Ananta'}</h1>
          <p className="text-gray-500">@{'Ananta'}</p>
          <p className="mt-2">{'A'}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Tweets</h2>
      <div className="space-y-4"></div>
    </div>
  )
}

export default PostComments
