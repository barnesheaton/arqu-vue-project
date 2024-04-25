<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { ChevronLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import FormInput from '@/components/ui/form-input.vue'

const formStore = useFormStore()
const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  dates: null
})

const formSchema = toTypedSchema(
  z.object({
    address: z.string().min(1, 'Your address is required'),
    city: z.string().min(1, 'Your city is required'),
    state: z.string().min(1, 'Your state is required'),
    zip: z.string().min(1, 'Your zip code is required')
  })
)

const { handleSubmit, setValues, values } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values, formData.value)
  formStore.stepThree = {
    ...values
  }
  toast({
    title: `Hold tight!`,
    description: 'You can go back and edit your personal information at any point.'
  })
  router.push({ name: 'step-three' })
})

onMounted(() => {
  if (formStore.stepThree && formStore.stepThree) {
    setValues(formStore.stepThree)
  }
})
</script>

<template>
  <main class="flex flex-col w-full">
    <div class="w-full">
      <Button
        @click="$router.push({ name: 'step-two' })"
        variant="outline"
        class="justify-self-start"
      >
        <ChevronLeft class="w-4 h-4 mr-2" /> Go Back
      </Button>
    </div>
    <form class="space-y-4 w-full flex flex-col items-center" @submit.prevent>
      <h1 class="text-[60px] text-cyan-800">Step 3</h1>
      <h4>What's your billing address?</h4>
      <div class="w-1/2">
        <FormInput
          :default-value="values.address"
          name="address"
          type="text"
          label="Billing Address"
          placeholder="Billing Address"
        />
        <FormInput
          :default-value="values.city"
          name="city"
          type="text"
          label="City"
          placeholder="New York City"
        />
        <FormInput
          :default-value="values.state"
          name="state"
          type="text"
          label="State"
          placeholder="State"
        />
        <FormInput
          :default-value="values.zip"
          name="zip"
          type="text"
          label="Zip Code"
          placeholder="90210"
        />
      </div>
      <Button @click="onSubmit" type="submit"> Next Step</Button>
    </form>
  </main>
</template>
