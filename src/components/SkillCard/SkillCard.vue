<template>
  <div class="SkillCard">
    <div class="title">Skill card title</div>

    <ProgressBar :progress="timeLeftInPercents" />

    <div class="handle-buttons">
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

    <input
      v-model="timeRange"
      type="range"
      min="0"
      max="100"
      step="1"
    />

    <div class="time-range-container">
      {{ timeRange }}
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import ProgressBar from '~/components/ProgressBar'

  import PuaseIcon from '~/assets/images/svg/pause.svg'
  import PlayIcon from '~/assets/images/svg/play.svg'
  import StopIcon from '~/assets/images/svg/stop.svg'

  const timeRange = ref<number>(1),
        elapsedSeconds = ref<number>(0)
  
  const timeLeftInPercents = computed(() => {
    const timeRangeInSeconds = timeRange.value * 3600
    const timeLeftInSeconds = timeRangeInSeconds - elapsedSeconds.value
    return Number((100 - (timeLeftInSeconds / timeRangeInSeconds * 100)).toFixed(2))
  })



  onMounted(() => {
    setInterval(():void => {
      if (timeLeftInPercents.value < 100)
      elapsedSeconds.value ++
    }, 1000)
  })

</script>

<style lang="scss" src="./SkillCard.scss" scoped />
