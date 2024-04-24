<script setup lang="ts">
import { type Ref, ref, toRaw } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell
} from '@/components/ui/range-calendar'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import DateRangePicker from '@/components/ui/date-range-picker.vue'

const formData = ref({
  name: '',
  email: '',
  dates: null
})

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    startDate: z
      .string()
      .refine((v) => v, { message: 'You must pick your dates to continue booking' }),
    endDate: z
      .string()
      .refine((v) => v, { message: 'You must pick your dates to continue booking' })
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
  <main class="flex flex-col items-center w-full">
    <h1 class="text-[80px] text-cyan-800">Step 1</h1>
    <h4></h4>
    {{ formData }}
    <form class="space-y-6 w-full" @submit="onSubmit">
      <div class="grid grid-cols-2 gap-8 w-full">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="First and Last Name"
                v-bind="componentField"
                v-model="formData.name"
              />
            </FormControl>
            <FormDescription> This is your public display name. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="email address"
                v-bind="componentField"
                v-model="formData.email"
              />
            </FormControl>
            <FormDescription> This is your email address. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="dob">
          <FormItem class="flex flex-col">
            <FormLabel>Date of birth</FormLabel>
            <DateRangePicker
              v-model="formData.dates"
              @update:model-value="
                (v) => {
                  const rawVal = toRaw(v)
                  console.log(rawVal)
                  if (rawVal.start) {
                    setValues({
                      startDate: rawVal.start.toString(),
                      endDate: rawVal.end.toString()
                    })
                  } else {
                    setValues({
                      startDate: '',
                      endDate: ''
                    })
                  }
                }
              "
            />
            <FormDescription> Your date of birth is used to calculate your age. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button type="submit"> Next </Button>
    </form>
  </main>
</template>
