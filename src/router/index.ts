import { createRouter, createWebHistory } from 'vue-router'
import FormStepOne from '../views/FormStepOne.vue'
import FormStepTwo from '../views/FormStepTwo.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FormStepTwo
    }
  ]
})

export default router
