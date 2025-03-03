import ProfileContextProvider from '@/context'
import MainLayout from '@/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Cookies from 'js-cookie'

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
