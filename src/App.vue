<template>
  <SkillCard />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import SkillCard from '~/components/SkillCard'

  let SkillCardsList = ref<Object>({})

  onMounted(() => {
    initDataFromLocalStorage()
  })


  const initDataFromLocalStorage = ():void => {
    const localStorage = window.localStorage

    localStorage.setItem('cardsList', JSON.stringify(
      {
        'kdslkm1221laskl': {
          title: 'Skill card title',
          elapsedSeconds: 31,
          timeRange: 1,
        }
      }
    ))

    SkillCardsList = JSON.parse(localStorage.getItem('cardsList') || '{}')

    console.log(SkillCardsList)
  }
</script>

<style>
  body {
    margin: 0;
    min-height: 100vh;
    background-color: #242424;
    color: #ece8e8;
    font-size: 12px;
    line-height: 1.2;
    font-family: Roboto, sans-serif, helvetica;
  }
</style>
