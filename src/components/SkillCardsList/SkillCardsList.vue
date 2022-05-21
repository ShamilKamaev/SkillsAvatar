<template>
  <SkillCard
    v-for="(skillCard, key) in SkillCardsList"
    :title="skillCard.title"
    :id="key"
    :key="key"
    @remove-card="removeCard"
  />
  <button @click="addNewSkillCard">+</button>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import SkillCard from '~/components/SkillCard'
  import { SkillCards } from './types'

  const SkillCardsList = ref<SkillCards>()

  onMounted(() => {
    initDataFromLocalStorage()
  })


  const initDataFromLocalStorage = ():void => {
    const localStorage = window.localStorage

    SkillCardsList.value = JSON.parse(localStorage.getItem('cardsList') || '{}')
  }

  const addNewSkillCard = ():void => {
    const newSkillCard = {
      title: 'New skill card',
      elapsedSeconds: 0,
      timeRange: 1,
    }

    SkillCardsList.value = {...SkillCardsList.value, [uuidv4()]: newSkillCard}
  }

  const removeCard = (id: string | number):void => {
    if (SkillCardsList.value) {
      delete SkillCardsList.value[id]
    }
  }

</script>

<style lang="scss" src="./SkillCardsList.scss" scoped />
