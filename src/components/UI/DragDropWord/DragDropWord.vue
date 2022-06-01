<script lang="ts" setup>
import './styles.scss'
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="word">
    <p>{{ text }}</p>
  </div>
</template>
