<script lang="ts" setup>
import SentencePreview from '@/components/SentencePreview.vue'
</script>

<template>
  <div class="my-template">
    <h1 class="my-template__header">Translate this sentence</h1>
    <div class="my-template__sentence-preview">
      <sentence-preview />
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
.my-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;

  @media screen and (max-width: 650px) {
    height: 85vh;
    width: 90vw;
  }
  @media screen and (min-width: 650px) {
    width: 70vw;
  }
  @media screen and (min-width: 800px) {
    width: 60vw;
  }
  @media screen and (min-width: 1000px) {
    width: 40vw;
  }
  @media screen and (min-width: 1500px) {
    margin: auto;
    width: 32vw;
  }
  &__header {
    font-weight: 500;
    margin: 0 0 24px 12px;
  }
  &__sentence-preview {
    margin-bottom: 12px;
  }
}
</style>
