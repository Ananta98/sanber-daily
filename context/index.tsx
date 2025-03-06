import useSWR from 'swr'
import { createContext, ReactNode, useContext } from 'react'
import { fetcher, getUrlfromPrefix } from '@/lib/utils'
import { User } from '@/lib/types'

export const ProfileContext = createContext<User>({
  name: '',
  email: '',
  dob: new Date(),
  phone: '',
  hobby: '',
})

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
