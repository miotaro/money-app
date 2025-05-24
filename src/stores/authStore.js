import { defineStore } from 'pinia'
import { ref } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)
  const router = useRouter()

  const fetchUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser
      isLoggedIn.value = !!currentUser
    })
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch {
      alert('ログアウト失敗:' + error)
    }
  }

  return {
    user,
    isLoggedIn,
    fetchUser,
    logout
  }
})
