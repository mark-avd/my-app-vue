<script lang="ts" setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import MyTemplate from '@/components/UI/MyTemplate.vue'
import CheckControls from '@/components/CheckControls.vue'
import DDWordsGroup from '@/components/DDWordsGroup.vue'
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
