<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MyIcon from '@/components/UI/MyIcon/MyIcon.vue'
import TextBubble from '@/components/UI/TextBubble/TextBubble.vue'
import LoadingDummy from '@/components/UI/LoadingDummy/LoadingDummy.vue'
import './styles.scss'

const store = useStore()
const currentSentence = computed(() => store.state.currentSentence.ru)
</script>

<template>
  <div class="sentence-preview">
    <div class="sentence-preview__icon-container">
      <my-icon type="person" />
    </div>
    <div class="sentence-preview__text-bubble-container">
      <text-bubble>
        <loading-dummy v-if="store.state.loading" />
        <p v-else>{{ currentSentence }}</p>
      </text-bubble>
    </div>
  </div>
</template>
