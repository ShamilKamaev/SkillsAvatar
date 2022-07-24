<template>
  <div class="container">
    <SkillCardsList />
  </div>
</template>

<script setup lang="ts">
import SkillCardsList from '~/components/SkillCardsList'

</script>

<style>
  body {
    margin: 0;
    min-height: 100vh;
    background-color: #1A1A1A;
    color: #ece8e8;
    font-size: 12px;
    line-height: 1.2;
    font-family: Roboto, sans-serif, helvetica;
  }

  .container {
    padding: 8px;
  }
</style>
