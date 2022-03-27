<template>
  <div
    class="ProrgessBar"
    :style="`--progress: ${progress}%`"
  >
    <div
      class="progress-scale"
      :class="{'progress-scale--isRuning': isRuning}"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    progress: number,
    isRuning: boolean,
  }>()
</script>

<style lang="scss" src="./ProgressBar.scss" scoped />
