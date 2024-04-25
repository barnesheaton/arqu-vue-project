<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { ref, watch, defineEmits, defineProps, computed } from 'vue'

const value = ref({
  adults: [2],
  children: [0],
  rooms: [1]
})

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

watch(
  value,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  // Since this value ref is an object of arrays,
  // we need the "deep" option to properly watch for changes
  { deep: true }
)

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    value.value = newValue
  }
)

const totalOccupants = computed(() => value.value?.adults?.[0] + value.value?.children?.[0])
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <div>
        <h4>Travellers and Rooms</h4>
        <Button
          variant="outline"
          :class="
            cn('w-full justify-start text-left font-normal', !value && 'text-muted-foreground')
          "
        >
          {{ totalOccupants || '' }} Travelers, {{ value?.rooms?.[0] || '' }} Room(s)
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="flex items-center justify-start w-full">
          <Label class="mr-2" for="width">Adults</Label>
          <div class="text-indigo-800 font-bold">
            {{ value?.adults?.[0] }}
          </div>
          <Slider
            v-model="value.adults"
            :default-value="[2]"
            :max="15"
            :min="1"
            :step="1"
            :class="cn('w-2/5 ml-auto', $attrs.class ?? '')"
          />
        </div>
        <div class="flex items-center justify-start w-full">
          <Label class="mr-2" for="width">Children</Label>
          <div class="text-indigo-800 font-bold">
            {{ value?.children?.[0] }}
          </div>
          <Slider
            v-model="value.children"
            :default-value="[0]"
            :max="15"
            :min="0"
            :step="1"
            :class="cn('w-2/5 ml-auto', $attrs.class ?? '')"
          />
        </div>
        <div class="flex items-center justify-start w-full">
          <Label class="mr-2" for="width">Rooms</Label>
          <div class="text-indigo-800 font-bold">
            {{ value?.rooms?.[0] }}
          </div>
          <Slider
            v-model="value.rooms"
            :default-value="[1]"
            :max="5"
            :min="1"
            :step="1"
            :class="cn('w-2/5 ml-auto', $attrs.class ?? '')"
          />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
