<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
    name: z.string().min(1, 'Your name is required'),
    email: z.string().min(1, 'An email number is required'),
    phone: z.string().min(1, 'A Phone number is required'),
    requests: z.string().optional()
  })
)

const { handleSubmit, setValues, values } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values, formData.value)
  formStore.stepTwo = {
    ...values
  }
  toast({
    title: `We got it ${values.name}!`,
    description: 'You can go back and edit your personal information at any point.'
  })
  router.push({ name: 'step-three' })
})

onMounted(() => {
  if (formStore.stepTwo && formStore.stepTwo) {
    setValues(formStore.stepTwo)
  }
})
</script>

<template>
  <main class="flex flex-col w-full">
    <h1 class="text-[60px] text-cyan-800">Step 2</h1>
    <h4>Fill out your contact details</h4>
    <form class="space-y-6 w-full" @submit="onSubmit">
      <div class="w-1/2">
        <FormInput
          :default-value="values.name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="First and Last Name"
        />
        <FormInput
          :default-value="values.email"
          name="email"
          type="text"
          label="E-mail Address"
          placeholder="E-mail Address"
        />
        <FormInput
          :default-value="values.phone"
          name="phone"
          type="text"
          label="Phone Number"
          placeholder="(123)-456-7890"
        />
        <FormInput name="requests" label="Additional Info">
          <Textarea
            :default-value="values.requests"
            placeholder="Any special accomodations we need to be made aware of?"
            class="resize-none"
            @update:model-value="
              (v) => {
                setValues({ requests: v })
              }
            "
          />
        </FormInput>
      </div>
      <Button @click="$router.push('/')" class="mr-4"> Go Back </Button>
      <Button type="submit"> Next </Button>
    </form>
  </main>
</template>
