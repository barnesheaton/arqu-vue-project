<script setup lang="ts">
import { ref, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '@/stores/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import moment from 'moment'

const formStore = useFormStore()
const router = useRouter()

import { Button } from '@/components/ui/button'
import { FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { toast } from '@/components/ui/toast'
import DateRangePicker from '@/components/ui/date-range-picker.vue'
import OccupancyPicker from '@/components/ui/occupancy-picker.vue'

const formData = ref({
  dates: null as any,
  occupants: null as any
})

const formSchema = toTypedSchema(
  z.object({
    startDate: z.string(),
    endDate: z.string({
      required_error: 'You must pick your travel dates to continue'
    }),
    adults: z.number(),
    children: z.number(),
    rooms: z.number()
  })
)

const { handleSubmit, setValues } = useForm({
  initialValues: {
    startDate: '2024-04-20',
    endDate: '2024-04-24',
    adults: 2,
    children: 0,
    rooms: 1
  },
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  formStore.stepOne = { dates: formData.value.dates, occupants: formData.value.occupants }
  // Get difference in days between selected check-in and check-out dates
  const start = moment(values.startDate)
  const end = moment(values.endDate)
  const duration = moment.duration(end.diff(start))
  const days = duration.asDays()
  // dsiplay toast with duration to give user trust in data being stored
  toast({
    title: `We got your ${days} day trip`,
    description: `You can go back and edit your trip details at any point.`
  })
  // navigate to step two
  router.push({ name: 'step-two' })
})

onMounted(() => {
  if (formStore.stepOne && formStore.stepOne) {
    formData.value = formStore.stepOne
  }
})
</script>

<template>
  <main class="flex flex-col w-full items-center">
    <div class="h-[40px]"></div>
    <form class="space-y-4 w-full flex flex-col items-center" @submit.prevent>
      <h1 class="text-[60px] text-cyan-800">Step 1</h1>
      <h4>Choose your trip dates and details</h4>
      <div class="w-1/2">
        <FormField name="endDate">
          <FormItem class="flex flex-col w-ful">
            <DateRangePicker
              v-model="formData.dates"
              @update:start-date="
                (v) => {
                  const rawVal = toRaw(v)
                  if (rawVal) {
                    setValues({
                      startDate: rawVal.toString(),
                      endDate: undefined
                    })
                  }
                }
              "
              @update:model-value="
                (v) => {
                  const rawVal = toRaw(v)
                  if (rawVal.start && rawVal.end) {
                    setValues({
                      startDate: rawVal.start.toString(),
                      endDate: rawVal.end.toString()
                    })
                  }
                }
              "
            />
            <FormDescription> </FormDescription>
            <FormMessage></FormMessage>
          </FormItem>
        </FormField>

        <FormField name="occupants">
          <FormItem class="flex flex-col">
            <OccupancyPicker
              v-model="formData.occupants"
              @update:model-value="
                (v) => {
                  const rawVal = toRaw(v)
                  setValues({
                    adults: rawVal?.adults?.[0],
                    children: rawVal?.children?.[0],
                    rooms: rawVal?.rooms?.[0]
                  })
                }
              "
            />

            <FormDescription> </FormDescription>

            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button @click="() => onSubmit()">Next</Button>
    </form>
  </main>
</template>
