import { ref } from 'vue'
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

export const useUsersStore = defineStore('user', () => {
  const user = ref<User[]>()
  const reg = ref(true)

  function registrationCompleted(event: User[] | undefined) {
    console.log('запрос на юзеров')
    user.value = event
  }
  // function getUsers()

  return { reg, user, registrationCompleted }
})
