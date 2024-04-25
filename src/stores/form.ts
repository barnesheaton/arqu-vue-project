import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => {
    return { stepOne: null as StepOne | null }
  }
})

interface StepOne {
  startDate: string
  endDate: string
  adults: number
  children: number
  rooms: number
}
