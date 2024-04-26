<script setup lang="ts">
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

defineProps({
  type: String,
  placeholder: String,
  label: String,
  description: String
})
</script>

<template>
  <FormField v-slot="{ componentField }" name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <slot>
          <Input :type="type" :placeholder="placeholder" v-bind="componentField" />
        </slot>
      </FormControl>
      <FormDescription> {{ description }} </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
