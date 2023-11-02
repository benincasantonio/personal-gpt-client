import UserRepository from '@/repositories/user-repository'
import { defineStore } from 'pinia'
import { getAuth, signInWithCustomToken, type User } from 'firebase/auth'
import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const auth = getAuth()
  const user: RemovableRef<User | null> = useLocalStorage('user', null, {
    serializer: {
      read: (v) => (v ? JSON.parse(v) as User : null),
      write: (v) => JSON.stringify(v)
    }
  });
  
  const token : RemovableRef<string | null> = useLocalStorage('token', null);

  const isLoggerIn = computed(() => user.value !== null);

  async function login(email: string, password: string) {
    console.log('login')
    const customToken = await new UserRepository().login(email, password)

    await signInWithCustomToken(auth, customToken)
      .then(async (userCredential) => {
        // Signed in
        user.value = userCredential.user;
        token.value = await userCredential.user.getIdToken();
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return {
    user,
    token,
    login,
    isLoggerIn
  }
})
