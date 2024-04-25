import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useFormStore = defineStore('form', {
  state: () => {
    return { stepOne: null as StepOne | null }
  }
})

interface StepOne {
  dates: any
  occupants: any
}
