<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/store'
import MyButton from '@/components/UI/MyButton/MyButton.vue'
import './styles.scss'

const store = useStore()
const status = ref(false)
const showStatus = ref(false)

const setStatus = (value: boolean) => {
  status.value = value
}
const setShowStatus = (show: boolean) => {
  showStatus.value = show
}
const checkSentence = () => {
  store.dispatch('checkSentence', { setStatus, setShowStatus })
}
</script>

<template>
  <div class="check-controls">
    <div class="check-controls__status" :class="{ 'check-controls__status_correct': status }">
      <p v-if="status">Correct!</p>
      <p v-else>Something is wrong!</p>
    </div>
    <div
      class="check-controls__button-container"
      :class="{ 'check-controls__button-container_show-status': showStatus }"
    >
      <my-button text="Check" @click="checkSentence" />
    </div>
  </div>
</template>
