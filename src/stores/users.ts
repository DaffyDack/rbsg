import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('user', () => {
  const user = ref([{email: 'a@a.ru', password: '1', role: 'admin'},{email: 'b@b.ru', password: '2', role: 'manager'}])
  const reg = ref(true)

//   function decriment() {
//     count.value--
//   }

  function registrationCompleted() {
    reg.value = !reg.value
  }

  return { reg, user, registrationCompleted }
})