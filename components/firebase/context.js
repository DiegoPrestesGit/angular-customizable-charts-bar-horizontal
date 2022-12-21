import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({})
  const [userData, setUserData] = useState({})

  const setUserAuthInfo = ({ userAuth, token, user }) => {
    localStorage.setItem('token', {
      token,
    })
    setAuthState({ userAuth, token })
    setUserData(user)
  }

  const getUserInfo = () => localStorage.getItem('token')

  const isUserAuthenticated = () => {
    console.log('xama', authState)
    return !!authState.token
  }

  return (
    <Provider
      value={{
        authState,
        userData,
        isUserAuthenticated,
        setUserAuthInfo: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        getUserInfo,
      }}
    >
      {children}
    </Provider>
  )
}

const ProtectRoute = ({ children }) => {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isUserAuthenticated()
  console.log('it isssss', isLoggedIn)
  if (typeof window !== 'undefined') {
    if (isLoggedIn) {
      router.push('/movies')
    } else if (!isLoggedIn && window.location.pathname === '/movies')
      router.push('/')
  }

  return children
}

export { AuthContext, AuthProvider, ProtectRoute }
