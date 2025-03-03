import Head from 'next/head'
import { ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogOut, UserRoundPen } from 'lucide-react'
import { fetcher, getUrlfromPrefix } from '@/lib/utils'

const MainLayout = ({
  children,
  isUserLogin = false,
}: {
  children: ReactNode
  isUserLogin: boolean
}) => {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await fetcher(getUrlfromPrefix('logout'), {
      method: 'POST',
    })
    if (response?.success) {
      Cookies.remove('token')
      router.reload()
    }
  }

  return (
    <>
      <Head>
        <title>Sanber Daily</title>
        <meta name="description" content="Sanber Dialy Social Media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isUserLogin ? (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <header className="w-full bg-white dark:bg-gray-800 shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Sanber Daily</h1>
              <div className="flex justify-center items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="cursor-pointer">
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
        </div>
      ) : (
        <div className="flex min-h-svh w-full items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      )}
    </>
  )
}

export default MainLayout
