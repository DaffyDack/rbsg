import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1)
  const reg = ref(true)
  const info = ref()

  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function decriment() {
    count.value--
  }

  function registrationCompleted() {
    reg.value = !reg.value
  }

  function userInfo(e: object) {
    info.value = e
  }

  return {
    reg,
    count,
    doubleCount,
    info,
    increment,
    decriment,
    registrationCompleted,
    userInfo,
  }
})
