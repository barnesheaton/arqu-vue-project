<script setup lang="ts">
import { type Ref, ref, watch, defineEmits, defineProps } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import type { DateRange } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'update:startDate'])

const value = ref({
  start: new CalendarDate(2024, 4, 20),
  end: new CalendarDate(2024, 4, 20).add({ days: 4 })
}) as Ref<DateRange>

watch(value, (newValue) => {
  emit('update:modelValue', newValue)
})

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    value.value = newValue
  }
)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <div class="flex flex-col space-y-2">
        <div>
          <h4>Check In</h4>
          <Button
            variant="outline"
            :class="
              cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            <template v-if="value.start">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
            <template v-else> Check-in </template>
          </Button>
        </div>
        <div>
          <h4>Check Out</h4>
          <Button
            variant="outline"
            :class="
              cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')
            "
          >
            <CalendarIcon class="mr-2 h-4 w-4" />
            <template v-if="value.end">
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>
            <template v-else> Check-out </template>
          </Button>
        </div>
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        v-model="value"
        initial-focus
        :number-of-months="2"
        @update:start-value="
          (startDate) => {
            value.start = startDate
            $emit('update:startDate', startDate)
          }
        "
      />
    </PopoverContent>
  </Popover>
</template>
