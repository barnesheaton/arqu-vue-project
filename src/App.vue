<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'
import { computed } from 'vue'

import { Progress } from '@/components/ui/progress'
import Toaster from '@/components/ui/toast/Toaster.vue'

const route = useRoute()

const currentProgress = computed(() => {
  let progress
  switch (route.name) {
    case 'step-one':
      progress = 25
      break
    case 'step-two':
      progress = 50
      break
    case 'step-three':
      progress = 75
      break
    case 'form-success':
      progress = 100
      break
    default:
      progress = 25
      break
  }
  return progress
})
</script>

<template>
  <header class="w-full fixed bg-white shadow-sm h-10">
    <div class="max-w-[1280px] px-8 h-10 flex flex-1 mx-auto">
      <div class="flex items-center justify-center h-10 w-full">
        <Progress :model-value="currentProgress" />
      </div>
    </div>
  </header>
  <div class="mx-auto max-w-[1280px] px-8 py-16">
    <RouterView />
  </div>
  <Toaster />
</template>
