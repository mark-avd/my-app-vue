<script lang="ts" setup="">
const props = defineProps<{
  type: 'loading' | 'person'
}>()
import personIcon from '@/assets/person-icon.svg'
import loadingIcon from '@/assets/loading-icon.svg'
</script>

<template>
  <img v-if="type === 'person'" :src="personIcon" alt="person icon" width="159" height="150" />
  <img v-if="type === 'loading'" :src="loadingIcon" alt="loading icon" width="50" height="50" />
</template>
