<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <button class="button">{{ text }}</button>
</template>

<style lang="scss">
.button {
  background: #fff;
  border: 1px solid #fff;
  border-radius: 30px;
  box-shadow: 5px 7px 10px rgba(0, 0, 0, 0.1);
  font-size: medium;
  font-weight: 600;
  padding: 16px 0;
  width: 100%;

  &:active {
    box-shadow: -5px -8px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
