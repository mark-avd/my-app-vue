<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import CheckButton from '@/components/UI/CheckButton.vue'

const store = useStore()
const isCorrect = ref(false)
const showStatus = ref(false)

const checkSentence = () => {
  store.dispatch('checkSentence', { isCorrect, showStatus })
}
</script>

<template>
  <div class="check-controls">
    <div class="check-controls__status" :class="{ 'check-controls__status_correct': isCorrect }">
      <p v-if="isCorrect">Correct!</p>
      <p v-else>Something is wrong!</p>
    </div>
    <div
      class="check-controls__button-container"
      :class="{ 'check-controls__button-container_show-status': showStatus }"
    >
      <check-button @click="checkSentence" />
    </div>
  </div>
</template>

<style lang="scss">
.check-controls {
  height: 120px;
  margin-top: 16px;

  &__status {
    color: #f31616;
    display: flex;
    font-weight: 600;
    justify-content: center;

    &_correct {
      color: #17d217;
    }
  }

  &__button-container {
    margin: -40px auto 0;
    transition: transform 500ms ease;
    width: 60%;

    &_show-status {
      transform: translate3d(0, 50px, 0);
    }
  }
}
</style>
