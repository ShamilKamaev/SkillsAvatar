<template>
  <div class="SkillCard">
    <div class="title">Skill card title</div>

    <ProgressBar :progress="progress" />

    <button class="handle-button">
      <PuaseIcon class="handle-icon" />
    </button>

    <button class="handle-button">
      <PlayIcon class="handle-icon" />
    </button>

    <button class="handle-button">
      <StopIcon class="handle-icon" /> 
    </button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import ProgressBar from '~/components/ProgressBar'

  import PuaseIcon from '~/assets/images/svg/pause.svg'
  import PlayIcon from '~/assets/images/svg/play.svg'
  import StopIcon from '~/assets/images/svg/stop.svg'

  const progress = ref<number>(0)

  onMounted(() => {
    setInterval(():void => {
      if (progress.value < 100)
      progress.value ++
    }, 2000)
  })

</script>

<style lang="scss" src="./SkillCard.scss" scoped />
