<script setup></script>

<template>
  <main class="flex flex-col w-full">
    <div class="w-full">
      <Button
        @click="$router.push({ name: 'step-three' })"
        variant="outline"
        class="justify-self-start"
      >
        <ChevronLeft class="w-4 h-4 mr-2" /> Go Back
      </Button>
    </div>
    <div class="space-y-4 w-full flex flex-col items-center">
      <h1 class="text-[60px] text-cyan-800">Booked!</h1>
      <h4>Well see you then</h4>
    </div>
  </main>
</template>
