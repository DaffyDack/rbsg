import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('user', () => {
  const user = ref([{email: 'a@a.ru', password: '1', role: 'admin'},{email: 'b@b.ru', password: '2', role: 'manager'}])
  const reg = ref(true)

  function registrationCompleted(email: string,password: string) {
    // reg.value = !reg.value
    
    user.value.push({email, password, role: 'manager'})
  }


  return { reg, user,  registrationCompleted }
})