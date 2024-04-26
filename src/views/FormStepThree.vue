<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { states } from '@/lib/utils'

import { ChevronLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import FormInput from '@/components/ui/form-input.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const formStore = useFormStore()
const router = useRouter()

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
  formStore.stepThree = {
    ...values
  }
  toast({
    title: `Hold tight!`,
    description: 'We are processing your request'
  })
  router.push({ name: 'form-success' })
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
        >
          <Select
            @update:model-value="
              (v) => {
                setValues({
                  state: v
                })
              }
            "
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem :key="state" v-for="state in states" :value="state">
                  {{ state }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormInput>
        <FormInput
          :default-value="values.zip"
          name="zip"
          type="text"
          label="Zip Code"
          placeholder="90210"
        />
      </div>
      <Button @click="onSubmit" type="submit"> Book Your Trip!</Button>
    </form>
  </main>
</template>
