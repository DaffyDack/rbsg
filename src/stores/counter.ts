import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1)
  const reg = ref(true)



  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function decriment() {
    count.value--
  }

  function registrationCompleted () {
    reg.value = !reg.value
  }

  return { reg, count, doubleCount, increment, decriment, registrationCompleted }
})
