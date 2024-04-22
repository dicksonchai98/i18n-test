import { ref } from 'vue'
import { defineStore } from 'pinia'
// 管理語言的value
export const useCounterStore = defineStore('counter', () => {
  const locale = ref('CH')

  return { locale }
})
