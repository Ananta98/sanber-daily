import ProfileContextProvider from '@/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('@/layout'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  const isLogin = !!Cookies.get('token')

  return (
    <ProfileContextProvider>
      <MainLayout isUserLogin={isLogin}>
        <Component {...pageProps} />
      </MainLayout>
    </ProfileContextProvider>
  )
}
