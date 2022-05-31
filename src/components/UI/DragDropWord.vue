<script lang="ts" setup>
const props = defineProps<{
  text: string
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
}
</style>
