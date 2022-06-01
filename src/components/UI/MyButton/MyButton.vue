<script lang="ts" setup>
import './styles.scss'
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <button class="button">{{ text }}</button>
</template>
