<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import MyIcon from '@/components/UI/MyIcon/MyIcon.vue'
import TextBubble from '@/components/UI/TextBubble/TextBubble.vue'
import LoadingDummy from '@/components/UI/LoadingDummy/LoadingDummy.vue'
import './styles.scss'

const store = useStore()
const currentSentenceRu = computed(() => store.state.sentenceStore.currentSentence.ru)
</script>

<template>
  <div class="sentence-preview">
    <div class="sentence-preview__icon-container">
      <my-icon type="person" />
    </div>
    <div class="sentence-preview__text-bubble-container">
      <text-bubble>
        <loading-dummy v-if="store.state.fetchStore.loading" />
        <p v-else>{{ currentSentenceRu }}</p>
      </text-bubble>
    </div>
  </div>
</template>
