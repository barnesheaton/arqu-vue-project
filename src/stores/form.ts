import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
  state: () => {
    return {
      stepOne: null as StepOne | null,
      stepTwo: null as StepTwo | null,
      stepThree: null as StepThree | null
    }
  }
})

interface StepOne {
  dates: any
  occupants: any
}

interface StepTwo {
  name: any
  email: any
  phone: any
  requests?: any
}

interface StepThree {
  address: any
  city: any
  state: any
  zip: any
}
