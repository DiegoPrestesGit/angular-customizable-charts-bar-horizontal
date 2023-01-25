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
    typeof window !== 'undefined' &&
    localStorage.getItem('token') &&
    JSON.parse(localStorage.getItem('token'))

  const isUserAuthenticated = () => {
    const userInfo = getUserInfo()
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

  const userInfo = authContext.getUserInfo()

  if (typeof window !== 'undefined') {
    if (isLoggedIn && !window.location.pathname.includes('/movies')) {
      router.push(`/movies/${userInfo.user.userId}`)
    } else if (!isLoggedIn && window.location.pathname.includes('/movies'))
      router.push('/')
  }

  return children
}

export { AuthContext, AuthProvider, ProtectRoute }
