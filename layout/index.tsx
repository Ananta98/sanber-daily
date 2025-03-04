import Head from 'next/head'
import { ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogOut, UserRoundPen } from 'lucide-react'
import { getUrlfromPrefix } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { useProfileContext } from '@/context'
import Link from 'next/link'

const MainLayout = ({
  children,
  isUserLogin = false,
}: {
  children: ReactNode
  isUserLogin: boolean
}) => {
  const router = useRouter()
  const profileUser = useProfileContext()

  const handleLogout = async () => {
    const response = await fetch(getUrlfromPrefix('logout'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    }).then((res) => res.json())
    if (response?.success) {
      Cookies.remove('token')
      router.reload()
    }
  }

  if (!isUserLogin) {
    return (
      <>
        <Head>
          <title>Sanber Daily</title>
          <meta name="description" content="Sanber Dialy Social Media" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex min-h-svh w-full items-center justify-center">
          <main className="w-full max-w-sm">{children}</main>
          <Toaster />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Sanber Daily</title>
        <meta name="description" content="Sanber Dialy Social Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold">Sanber Daily</h1>
            </Link>
            <div className="flex justify-center items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${profileUser?.name}`}
                    />
                    <AvatarFallback>
                      {profileUser &&
                        profileUser?.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => router.push('/profile')}
                    className="cursor-pointer"
                  >
                    <UserRoundPen />
                    <span className="font-bold">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut />
                    <span className="font-bold">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="container mx-auto max-w-2xl p-4">{children}</main>
        <Toaster />
      </div>
    </>
  )
}

export default MainLayout
