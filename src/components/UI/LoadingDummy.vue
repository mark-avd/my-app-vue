<script setup lang="ts">
import MyIcon from '@/components/UI/MyIcon.vue'
</script>
<template>
  <div class="loading-dummy">
    <my-icon type="loading" />
  </div>
</template>

<style lang="scss">
.loading-dummy {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  height: 100%;
}
</style>
