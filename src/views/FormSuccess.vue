<script setup lang="ts">
import { ChevronLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { computed } from 'vue'

import { useFormStore } from '@/stores/form'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight } from 'lucide-vue-next'

const formStore = useFormStore()

const dates = computed(() => {
  const start = formStore?.stepOne?.dates?.start
  const end = formStore?.stepOne?.dates?.end
  const startDate = moment(start).subtract(1, 'month').format('MMM Do, YY')
  const endDate = moment(end).subtract(1, 'month').format('MMM Do, YY')
  return { startDate, endDate }
})

const occupants = computed(() => {
  return formStore?.stepOne?.occupants
})

const contactInfo = computed(() => {
  return formStore?.stepTwo
})
</script>

<template>
  <main class="flex flex-col w-full">
    <div class="w-full mb-8">
      <Button
        @click="$router.push({ name: 'step-three' })"
        variant="outline"
        class="justify-self-start"
      >
        <ChevronLeft class="w-4 h-4 mr-2" /> Go Back
      </Button>
    </div>
    <div class="space-y-4 w-full flex flex-col items-center">
      <Card :class="cn('w-[380px]', $attrs.class ?? '')">
        <CardHeader>
          <CardTitle>See you soon {{ contactInfo.name }}! </CardTitle>
          <CardDescription>Here are the details of your upcoming trip.</CardDescription>
        </CardHeader>
        <CardContent class="grid gap-4">
          <div class="flex items-center justify-center space-x-6 rounded-md border p-4">
            <div v-if="dates?.startDate">
              <p class="text-sm font-medium leading-none">Check-in</p>
              <p class="text-sm text-muted-foreground">
                {{ dates.startDate }}
              </p>
            </div>
            <ChevronRight />
            <div v-if="dates?.endDate">
              <p class="text-sm font-medium leading-none">Check-out</p>
              <p class="text-sm text-muted-foreground">
                {{ dates.endDate }}
              </p>
            </div>
          </div>
          <div v-if="contactInfo">
            <div
              class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">Travellers and Rooms</p>
                <p class="text-sm text-muted-foreground">{{ occupants.adults?.[0] }} Adults</p>
                <p class="text-sm text-muted-foreground">{{ occupants.children?.[0] }} Children</p>
                <p class="text-sm text-muted-foreground">{{ occupants.rooms?.[0] }} Rooms</p>
              </div>
            </div>
          </div>
          <div v-if="contactInfo">
            <div
              class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">Contact Info</p>
                <p class="text-sm text-muted-foreground">{{ contactInfo.name }}</p>
                <p class="text-sm text-muted-foreground">{{ contactInfo.email }}</p>
                <p class="text-sm text-muted-foreground">{{ contactInfo.phone }}</p>
              </div>
            </div>
          </div>
          <div v-if="contactInfo?.requests">
            <div
              class="mb-4 grid grid-cols-[25px_minmax(0,1fr)] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">Additional Notes</p>
                <p class="text-sm text-muted-foreground">{{ contactInfo.requests }}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
