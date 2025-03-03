import useSWR from 'swr'
import { createContext, ReactNode, useContext } from 'react'
import { fetcher, getUrlfromPrefix } from '@/lib/utils'

export const ProfileContext = createContext<any>({})

const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSWR(getUrlfromPrefix('user/me'), fetcher)

  return (
    <ProfileContext.Provider value={data?.data}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfileContext = () => {
  return useContext(ProfileContext)
}

export default ProfileContextProvider
