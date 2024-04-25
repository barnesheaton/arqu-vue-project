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

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
