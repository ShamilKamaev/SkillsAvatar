<template>
  <div class="SkillCard">
    <div class="title">Skill card title</div>

    <ProgressBar
      :progress="timeLeftInPercents"
      :is-runing="isRuning"
    />

    <div class="handle-buttons">
      <button
        class="handle-button"
        @click="playPauseHandle"
      >
        <PuaseIcon v-if="isRuning" class="handle-icon" />
        <PlayIcon v-else class="handle-icon" />
      </button>

      <button
        class="handle-button"
        @click="stopCounter"
      >
        <StopIcon class="handle-icon" /> 
      </button>
    </div>

    <input
      v-model.number="timeRange"
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
        elapsedSeconds = ref<number>(0),
        isRuning = ref<boolean>(false)

  let counterInterval: ReturnType<typeof setInterval>
  
  
  const timeLeftInPercents = computed(():number => {
    const timeRangeInSeconds: number = timeRange.value * 3600
    const timeLeftInSeconds: number = timeRangeInSeconds - elapsedSeconds.value
    return Number((100 - (timeLeftInSeconds / timeRangeInSeconds * 100)).toFixed(2))
  })

  const runCounter = ():void => {
    isRuning.value = true
    counterInterval = setInterval(():void => {
      if (timeLeftInPercents.value >= 100) return clearInterval(counterInterval)
      elapsedSeconds.value ++
    }, 1000)
  }

  const pauseCounter = ():void => {
    isRuning.value = false
    clearInterval(counterInterval)
  }

  const stopCounter = ():void => {
    elapsedSeconds.value = 0
    isRuning.value = false
    clearInterval(counterInterval)
  }

  const playPauseHandle = ():void => {
    isRuning.value ? pauseCounter() : runCounter()
  }

</script>

<style lang="scss" src="./SkillCard.scss" scoped />
