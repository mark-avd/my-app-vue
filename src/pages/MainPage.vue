<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import MyTemplate from '@/components/UI/MyTemplate.vue'
import CheckControls from '@/components/CheckControls.vue'
import WordsGroup from '@/components/WordsGroup.vue'
import DragDropWord from '@/components/DragDropWord.vue'
import LoadingDummy from '@/components/UI/LoadingDummy.vue'
const store = useStore()
onBeforeMount(() =>
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
    <words-group type="start">
      <loading-dummy v-if="store.state.loading" />
      <drag-drop-word
        v-for="word in store.state.startWords"
        :key="word.id"
        :id="word.id"
        :index="word.index"
        :text="word.text"
      />
    </words-group>
    <words-group type="target">
      <drag-drop-word
        v-for="word in store.state.targetWords"
        :key="word.id"
        :id="word.id"
        :index="word.index"
        :text="word.text"
      />
    </words-group>
    <check-controls />
  </my-template>
</template>

<style lang="scss"></style>
