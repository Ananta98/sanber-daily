import { z } from 'zod'
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { fetcher, getUrlfromPrefix } from '@/lib/utils'
import PostContainer from '@/components/post-container'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Cookies from 'js-cookie'

const postSchema = z.object({
  description: z.string().min(1),
})

export default function Home() {
  const { data, isLoading, mutate } = useSWR(
    getUrlfromPrefix('posts?type=all'),
    fetcher,
  )
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    setLoadingSubmit(true)
    const response = await fetch(getUrlfromPrefix('post'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
    toast.success('Add Post Success', {
      description: response?.message,
    })
    form.reset()
    setLoadingSubmit(false)
    mutate()
  }

  const likePost = async (id: number) => {
    const response = await fetch(getUrlfromPrefix(`likes/post/${id}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then((res) => res.json())
    toast.success('Like Post Success', {
      description: response?.message,
    })
    mutate()
  }

  const dislikePost = async (id: number) => {
    const response = await fetch(getUrlfromPrefix(`unlikes/post/${id}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then((res) => res.json())
    toast.success('Dislike Post Success', {
      description: response?.message,
    })
    mutate()
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>What's Happening</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="What is happening?!" {...field} />
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
                  'Post'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <p>Loading...</p>}
      <div className="flex flex-col gap-4">
        {data?.data &&
          data?.data.map((post: any) => (
            <PostContainer
              key={post.id}
              {...post}
              handleLike={likePost}
              handleDislike={dislikePost}
            />
          ))}
      </div>
    </div>
  )
}
