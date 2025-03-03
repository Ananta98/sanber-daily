import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { getUrlfromPrefix, showToast } from '@/lib/utils'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

const LoginPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true)
    const response = await fetch(getUrlfromPrefix('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
    if (response?.success) {
      Cookies.set('token', response?.data?.token, {
        expires: response?.data?.expires,
        path: '/',
      })
      showToast({
        title: 'Success',
        description: response?.message,
        isError: false,
      })
      router.push('/')
    } else {
      showToast({
        title: 'Failed',
        description: response?.message,
        isError: true,
      })
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full hover:cursor-pointer">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Loading...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <Button variant="outline" className="w-full hover:cursor-pointer">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginPage
