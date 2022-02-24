<template>
  <div
    class="ProrgessBar"
    :style="`--progress: ${progress}%`"
  >
    <div
      class="progress-scale"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ progress: number }>()
</script>

<style lang="scss" src="./ProgressBar.scss" scoped />
