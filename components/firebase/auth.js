import { useState, useEffect } from 'react'
import firebaseApp from '../../providers/firebase-app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const formatAuthUSer = (user) => ({
  uuid: user.uid,
  email: user.email,
})

export default function useFirebaseAuth() {
  firebaseApp()
  const googleProvider = new GoogleAuthProvider()
  const authProvider = getAuth()

  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const signIn = async () => {
    const res = await signInWithPopup(authProvider, googleProvider)
  }

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const formattedUser = formatAuthUSer(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  // useEffect(() => {
  // const unsub = firebaseApp.auth().onAuthStateChanged(authStateChanged)
  // return () => unsub()
  // }, [])

  return { authUser, loading, signIn }
}
