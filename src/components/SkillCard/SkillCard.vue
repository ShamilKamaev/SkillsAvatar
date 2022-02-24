<template>
  <div class="SkillCard">
    <div class="title">Skill card title</div>
    <ProgressBar :progress="progress" />
    <AwesomeIcon name="plus" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import ProgressBar from '~/components/ProgressBar'

  const progress = ref(0)

  onMounted(() => {
    setInterval(() => {
      if (progress.value < 100)
      progress.value ++
    }, 2000)
  })

</script>

<style lang="scss" src="./SkillCard.scss" scoped />
