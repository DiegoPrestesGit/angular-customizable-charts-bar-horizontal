import { createContext, useContext } from 'react'
import useFirebaseAuth from './auth'

const authUserContext = createContext({
  authUser: null,
  loading: true,
})

export default function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  )
}

export const useAuth = () => useContext(authUserContext)
