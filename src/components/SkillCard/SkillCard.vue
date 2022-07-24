<template>
  <div class="SkillCard">
    <div class="head">
      <div class="title">{{ title }}</div>

      <button
        class="remove-card-button"
        @click="$emit('removeCard', id)"
      >
        x
      </button>
    </div>

    <ProgressBar
      :progress="timeLeftInPercents"
      :is-runing="isRuning"
      class="progress-bar"
    />

    <div class="handlers-and-time">
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
          <FastBackwardIcon class="handle-icon handle-icon--fast-forward" />
        </button>
      </div>

      <div class="time-left">
        {{ timeLefInHHMMSS }} [{{ timeLeftInPercents }}%]
      </div>
    </div>



    <!-- <input
      v-model.number="timeRange"
      type="range"
      min="1"
      max="100"
      step="1"
    />

    <div class="time-range-container">
      {{ timeRange }}
    </div> -->
    
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import ProgressBar from '~/components/ProgressBar'

  import PuaseIcon from '~/assets/images/svg/pause.svg'
  import PlayIcon from '~/assets/images/svg/play.svg'
  import StopIcon from '~/assets/images/svg/stop.svg'
  import FastBackwardIcon from '~/assets/images/svg/fast-backward.svg'

  const [timeRange, elapsedSeconds, isRuning] = [
    ref<number>(1),
    ref<number>(0),
    ref<boolean>(false)
  ]

  const props = defineProps<{
    title: string,
    id: string | number,
  }>()

  const emit = defineEmits({
    removeCard(id: string | number):string | number{
      return id || ''
    },
  })

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
    elapsedSeconds.value === timeRangeInSeconds.value
  )

  function runCounter():void {
    isRuning.value = true
    counterInterval = setInterval(():void => {
      if (timeLeftInPercents.value >= 100) return clearInterval(counterInterval)
      elapsedSeconds.value ++
      
    }, 1000)
  }

  function pauseCounter():void {
    isRuning.value = false
    clearInterval(counterInterval)
  }

  function stopCounter():void {
    elapsedSeconds.value = 0
    isRuning.value = false
    clearInterval(counterInterval)
  }

  function playPauseHandle():void {
    isRuning.value ? pauseCounter() : runCounter()
  }

  function fastBackward():void | number {
    if (elapsedSeconds.value < 60) return elapsedSeconds.value = 0
    elapsedSeconds.value = elapsedSeconds.value - 60
  }

  function fastForward():void | boolean {
    if ((elapsedSeconds.value + 60) >= timeRangeInSeconds.value) {
      elapsedSeconds.value = timeRangeInSeconds.value
      clearInterval(counterInterval)
      return isRuning.value = false
    }
    elapsedSeconds.value = elapsedSeconds.value + 60
  }

</script>

<style lang="scss" src="./SkillCard.scss" scoped />
