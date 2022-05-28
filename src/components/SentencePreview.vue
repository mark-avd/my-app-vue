<script lang="ts" setup>
import { useStore } from 'vuex'
import AnyIcon from '@/components/UI/AnyIcon.vue'
import TextBubble from '@/components/UI/TextBubble.vue'
import LoadingDummy from '@/components/UI/LoadingDummy.vue'
const store = useStore()
</script>

<template>
  <div class="sentence-preview">
    <div class="sentence-preview__icon-container">
      <any-icon type="person" />
    </div>
    <div class="sentence-preview__text-bubble-container">
      <text-bubble>
        <loading-dummy v-if="store.state.loading" />
        <p v-else>{{ store.state.currentSentence?.ru }}</p>
      </text-bubble>
    </div>
  </div>
</template>

<style lang="scss">
.sentence-preview {
  display: flex;
  margin-top: 16px;
  padding: 0 12px;

  &__icon-container {
    width: 40%;

    img {
      padding-top: 12px;
      width: 90%;
    }
  }

  &__text-bubble-container {
    margin: 0 0 12px 12px;
    width: 60%;
  }
}
</style>
