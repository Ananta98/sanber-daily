import CommentContainer from '@/components/comment-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Replies } from '@/lib/types'
import { fetcher, getUrlfromPrefix } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWR from 'swr'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const commentSchema = z.object({
  description: z.string().min(1),
})

const PostComments = () => {
  const router = useRouter()
  const post_id = Number(router.query.post_id)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const { data: postData } = useSWR(
    getUrlfromPrefix(`post/${post_id}`),
    fetcher,
  )

  const {
    data: commentsData,
    isLoading: isLoadingComment,
    mutate,
  } = useSWR(getUrlfromPrefix(`replies/post/${post_id}`), fetcher)

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    setLoadingSubmit(true)
    const response = await fetch(getUrlfromPrefix(`replies/post/${post_id}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
    toast.success('Add Comment Success', {
      description: response?.message,
    })
    form.reset()
    setLoadingSubmit(false)
    mutate()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${postData?.data?.user.name}`}
          />
          <AvatarFallback>
            {postData?.data?.user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{postData?.data?.user.name}</h1>
          <p className="text-gray-500">{postData?.data?.user.email}</p>
          <p className="mt-2">{postData?.data?.description}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loadingSubmit} type="submit" className="w-full">
            {loadingSubmit ? (
              <>
                <Loader2 className="animate-spin" />
                Loading...
              </>
            ) : (
              'Comment'
            )}
          </Button>
        </form>
      </Form>
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <div className="space-y-4">
        {commentsData?.data.length > 0 ? (
          commentsData?.data.map((comment: Replies) => (
            <CommentContainer {...comment} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostComments
