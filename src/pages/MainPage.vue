<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStore } from '@/store'
import MyTemplate from '@/components/UI/MyTemplate/MyTemplate.vue'
import CheckControls from '@/components/CheckControls/CheckControls.vue'
import DDWordsGroup from '@/components/DDWordsGroup/DDWordsGroup.vue'
const store = useStore()
onMounted(() =>
  store
    .dispatch('fetchSentences')
    .then(() => {
      store.dispatch('changeCurrentSentence')
      store.dispatch('makeStartWords')
    })
    .then()
)
</script>

<template>
  <my-template>
    <d-d-words-group :initial="false" />
    <d-d-words-group :initial="true" />
    <check-controls />
  </my-template>
</template>
