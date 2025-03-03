import { z } from 'zod'
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
import useSWR from 'swr'
import { fetcher, getUrlfromPrefix } from '@/lib/utils'
import PostContainer from '@/components/post-container'

const postSchema = z.object({
  description: z.string().min(1),
})

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR(
    getUrlfromPrefix('posts?type=all'),
    fetcher,
  )

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      description: '',
    },
  })

  const onSubmit = (data: z.infer<typeof postSchema>) => {
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
              <Button type="submit" className="w-full">
                Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <p>Loading...</p>}
      <div className="flex flex-col gap-4">
        {data?.data.map((post: any) => (
          <PostContainer key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}
