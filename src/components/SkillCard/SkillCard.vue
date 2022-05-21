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
        @click="fastBackward"
      >
        <FastBackwardIcon class="handle-icon" />
      </button>

      <button
        class="handle-button"
        :disabled="timeIsUp"
        @click="playPauseHandle"
      >
        <component
          :is="isRuning ? PuaseIcon : PlayIcon"
          class="handle-icon"
        />
      </button>

      <button
        class="handle-button"
        @click="stopCounter"
      >
        <StopIcon class="handle-icon" /> 
      </button>

      <button
        class="handle-button"
        :disabled="timeIsUp"
        @click="fastForward"
      >
        <FastForwardIcon class="handle-icon" /> 
      </button>
    </div>

    <input
      v-model.number="timeRange"
      type="range"
      min="1"
      max="100"
      step="1"
    />

    <div class="time-range-container">
      {{ timeRange }}
    </div>

    <div>
      {{ timeLefInHHMMSS }}
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import ProgressBar from '~/components/ProgressBar'

  import PuaseIcon from '~/assets/images/svg/pause.svg'
  import PlayIcon from '~/assets/images/svg/play.svg'
  import StopIcon from '~/assets/images/svg/stop.svg'
  import FastForwardIcon from '~/assets/images/svg/fast-forward.svg'
  import FastBackwardIcon from '~/assets/images/svg/fast-backward.svg'

  const [timeRange, elapsedSeconds, isRuning] = [ref<number>(1), ref<number>(0), ref<boolean>(false)]

  let counterInterval: ReturnType<typeof setInterval>
  
  
  const timeLeftInPercents = computed(():number => {
    const timeRangeInSeconds: number = timeRange.value * 3600
    const timeLeftInSeconds: number = timeRangeInSeconds - elapsedSeconds.value
    return Number((100 - (timeLeftInSeconds / timeRangeInSeconds * 100)).toFixed(2))
  })

  const timeRangeInSeconds = computed(():number => {
    return timeRange.value * 3600
  })

  const timeLefInHHMMSS = computed(():string =>
    new Date(elapsedSeconds.value * 1000).toISOString().substring(11, 19)
  )

  const timeIsUp = computed(():boolean =>
    elapsedSeconds === timeRangeInSeconds
  )

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

  const fastBackward = ():void | number => {
    if (elapsedSeconds.value < 10) return elapsedSeconds.value = 0
    elapsedSeconds.value = elapsedSeconds.value - 10
  }

  const fastForward = ():void | boolean => {
    if ((elapsedSeconds.value + 10) >= timeRangeInSeconds.value) {
      elapsedSeconds.value = timeRangeInSeconds.value
      clearInterval(counterInterval)
      return isRuning.value = false
    }
    elapsedSeconds.value = elapsedSeconds.value + 10
  }

</script>

<style lang="scss" src="./SkillCard.scss" scoped />
