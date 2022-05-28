<script lang="ts" setup>
const props = defineProps<{
  id: number
  text: string
  index?: number
  group?: 'start' | 'target'
}>()
</script>

<template>
  <div class="word">
    <p>{{ text }}</p>
  </div>
</template>

<style>
.word {
  background: #fff;
  border: 1px solid #949494;
  border-radius: 12px;
  cursor: grab;
  margin: 5px;
  user-select: none;

  &_dragging {
    opacity: 0.5;
  }
}
</style>
