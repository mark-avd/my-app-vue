<script lang="ts" setup>
import SentencePreview from '@/components/SentencePreview/SentencePreview.vue'
import './styles.scss'
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
