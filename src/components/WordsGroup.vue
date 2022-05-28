<script lang="ts" setup>
const props = defineProps<{
  type: 'start' | 'target'
}>()
</script>

<template>
  <div class="words-group">
    <slot />
  </div>
</template>

<style>
.words-group {
  align-content: flex-start;
  border-top: 1px solid #030303;
  display: flex;
  flex-wrap: wrap;
  min-height: 110px;
  padding: 6px;
}
</style>
