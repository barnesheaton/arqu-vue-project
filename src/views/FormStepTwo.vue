<script setup lang="ts">
import { type Ref, ref, toRaw, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const formData = ref({
  name: '',
  email: '',
  dates: null
})

import FormInput from '@/components/ui/form-input.vue'

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    requests: z.string().optional()
  })
)

const { handleSubmit, setValues, values } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values, formData.value)
})
</script>

<template>
  <main class="flex flex-col w-full">
    <h1 class="text-[60px] text-cyan-800">Step 2</h1>
    <h4>Fill out your contact details</h4>
    <form class="space-y-6 w-full" @submit="onSubmit">
      <div class="w-1/2">
        <FormInput name="name" type="text" label="Full Name" placeholder="First and Last Name" />
        <FormInput name="email" type="text" label="E-mail Address" placeholder="E-mail Address" />
        <FormInput name="phone" type="text" label="Phone Number" placeholder="(123)-456-7890" />
        <FormInput name="requests" label="Additional Info">
          <Textarea
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
