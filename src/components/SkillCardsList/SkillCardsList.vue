<template>
  <div class="SkillCardsList">
    <SkillCard
      v-for="(skillCard, key) in skillCardsList"
      :title="skillCard.title"
      :id="key"
      :key="key"
      @remove-card="removeCard"
    />
  </div>
  <button
    class="add-card-button" 
    @click="addCard"
  >
      Add card
  </button>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import SkillCard from '~/components/SkillCard'
  import { SkillCards } from './types'

  class SkillCardItem {
    title: string
    timeRange: number
    elapsedSeconds: number

    constructor(title: string, timeRange: number = 1) {
      this.title = title
      this.timeRange = timeRange
      this.elapsedSeconds = 0
    }
  }

  const skillCardsList = ref<SkillCards>()
  const localStorage = window.localStorage

  onMounted(() => {
    initDataFromLocalStorage()
  })

  const initDataFromLocalStorage = ():void => {
    skillCardsList.value = JSON.parse(localStorage.getItem('cardsList') || '{}')
  }

  const addCard = ():void => {
    skillCardsList.value = {
      ...skillCardsList.value,
      [uuidv4()]: new SkillCardItem('New'),
    }
    saveToLocalStorage()
  }

  const removeCard = (id: string | number): void => {
    if (skillCardsList.value) {
      delete skillCardsList.value[id]
    }
    saveToLocalStorage()
  }

  const saveToLocalStorage = ():void => {
    localStorage.setItem('cardsList', JSON.stringify(skillCardsList.value))
  }

</script>

<style lang="scss" src="./SkillCardsList.scss" scoped />
