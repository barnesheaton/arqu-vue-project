import { createRouter, createWebHistory } from 'vue-router'
import FormStepOne from '../views/FormStepOne.vue'
import FormStepTwo from '../views/FormStepTwo.vue'
import FormStepThree from '../views/FormStepThree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'step-one',
      component: FormStepOne
    },
    {
      path: '/step-two',
      name: 'step-two',
      component: FormStepTwo
    },
    {
      path: '/step-three',
      name: 'step-three',
      component: FormStepThree
    }
  ]
})

export default router
