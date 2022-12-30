import { updateCurrentUser } from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()
const { Provider } = AuthContext

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const setUserAuthInfo = (userAuth, token, user) => {
    localStorage.setItem(
      'token',
      JSON.stringify({
        token,
        userAuth,
        user,
      })
    )

    setUserData({ userAuth, token, user })
  }

  const removeUserAuthInfo = () => {
    localStorage.removeItem('token')
    setUserData({})
  }

  const getUserInfo = () =>
    typeof window !== 'undefined' && localStorage.getItem('token')

  const isUserAuthenticated = () => {
    const userInfo = JSON.parse(getUserInfo())
    if (userInfo) {
      if (!userData) setUserData(userInfo)
    }

    return !!userInfo && !!userInfo.token
  }

  return (
    <Provider
      value={{
        userData,
        isUserAuthenticated,
        setUserAuthInfo,
        removeUserAuthInfo,
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
    if (isLoggedIn && window.location.pathname !== '/movies') {
      router.push('/movies')
    } else if (!isLoggedIn && window.location.pathname === '/movies')
      router.push('/')
  }

  return children
}

export { AuthContext, AuthProvider, ProtectRoute }
