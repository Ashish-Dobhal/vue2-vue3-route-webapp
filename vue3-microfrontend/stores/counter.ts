import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Define a store
export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(22)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }

  return {
    // expose state, getters and actions
    count,
    doubleCount,
    increment,
    decrement
  }
})
