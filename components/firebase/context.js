import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({})
  const [userData, setUserData] = useState({})

  const setUserAuthInfo = (userAuth, token, user) => {
    localStorage.setItem(
      'token',
      JSON.stringify({
        token,
        userAuth,
      })
    )
    setAuthState({ userAuth, token })
    setUserData(user)
  }

  const getUserInfo = () =>
    typeof window !== 'undefined' && localStorage.getItem('token')

  const isUserAuthenticated = () => {
    const userInfo = JSON.parse(getUserInfo())
    console.log('userInfo', userInfo, authState)

    return !!authState.token
  }

  const validateAuthToken = (token) => {}

  return (
    <Provider
      value={{
        authState,
        userData,
        isUserAuthenticated,
        setUserAuthInfo,
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

  if (typeof window !== 'undefined') {
    console.log(isLoggedIn, window.location.pathname)
    if (isLoggedIn && window.location.pathname !== '/movies') {
      router.push('/movies')
    } else if (!isLoggedIn && window.location.pathname === '/movies')
      router.push('/')
  }

  return children
}

export { AuthContext, AuthProvider, ProtectRoute }
