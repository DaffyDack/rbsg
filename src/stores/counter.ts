import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1)
  const reg = ref(true)
  const info = ref()

  function registrationCompleted() {
    reg.value = !reg.value
  }

  function userInfo(e: object) {
    info.value = e
  }

  return {
    reg,
    count,
    info,
    registrationCompleted,
    userInfo,
  }
})
